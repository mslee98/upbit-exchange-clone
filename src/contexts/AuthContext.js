'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import supabase from "../Lib/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();


    const logout = async () => {
        await supabase.auth.signOut();  // Supabase 로그아웃 함수
        setUser(null);  // 상태 초기화
    };

    const login = async (id, password) => {

        const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("id, email, approved")
            .eq("username", id) // eq는 조건을 지정하는 올바른 방식입니다.
            .single();

        if (profileError) {
            // setError("사용자를 찾을 수 없습니다.");
            // setLoading(false);
            return "사용자를 찾을 수 없습니다.";
        }

        // 사용자의 승인 상태 확인
        if (profileData.approved === false) {
            // setError("승인이 완료되지 않은 계정입니다. 관리자에게 문의하세요.");
            // setLoading(false);
            return "승인이 완료되지 않은 계정입니다. 관리자에게 문의하세요.";
        }

        const { data, error } = await supabase.auth.signInWithPassword({ email: profileData.email, password });
        if (error) {
          console.error('로그인 실패:', error.message);
        } else {
          setUser(data.user);
          router.push("/exchange");
        }
      };

      useEffect(() => {
        const checkSession = async () => {
          const session = await supabase.auth.getSession(); // 비동기적으로 세션을 받아옵니다.
          if (session?.data.session) {
            setUser(session.data.session.user);  // 세션이 있으면 유저 설정
          } else {
            setUser(null);  // 세션이 없으면 유저를 null로 설정
          }
          setLoading(false); // 로딩 상태를 해제
        };
      
        checkSession(); // 컴포넌트가 처음 마운트될 때 세션 확인
      
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
      
            // 세션이 없고, 특정 경로가 아니라면 로그인 페이지로 이동
            if (!session && 
                pathname !== "/login" && 
                pathname !== "/signup" && 
                pathname !== "/") {

              
              router.push('/login');
            }
          }
        );
      
        return () => {
          authListener?.unsubscribe();
        };
      }, [router]);
    

    // useEffect(() => {

    //     const checkSession = async () => {
    //         const { data, error } = await supabase.auth.getSession();
    //         if (data?.session) {
    //             const userId = data.session.user.id;
                
    //             const { data: profile, error: profileError } = await supabase
    //                 .from("profiles")
    //                 .select("id, username, approve, phone")
    //                 .eq("id", userId)
    //                 .single();

    //             if (profileError || !profile) {
    //                 console.error("프로필 정보를 불러오지 못했습니다.");
    //                 setUser(null);
    //             } else if (!profile.approve) {
    //                 console.warn("승인되지 않은 사용자입니다.");
    //                 setUser(null);
    //                 router.push("/login");
    //             } else {
    //                 setUser(profile);
    //             }
    //         } else {
    //             setUser(null);  // 세션이 없으면 초기화
    //         }
    //         setLoading(false);
    //     };

    //     // 새로고침 시 쿠키에서 세션 확인
    //     const sessionFromCookie = document.cookie
    //         .split('; ')
    //         .find(row => row.startsWith('supabase-auth-token='));

    //     if (sessionFromCookie) {
    //         // 쿠키에서 세션 정보가 있으면 복원
    //         checkSession();
    //     } else {
    //         setLoading(false);  // 세션이 없으면 로딩 끝
    //     }
    // }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

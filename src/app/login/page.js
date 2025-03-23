'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../Lib/supabase";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({ id: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const { user, setUser, login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(""); // 입력값 변경 시 에러 초기화
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const { id, password } = formData;
        const errorMessage = await login(id, password)

        setLoading(true);
        if (errorMessage) {
            setError(errorMessage);  // 받은 에러 메시지를 상태로 설정
        }

        setLoading(false);

        // try {
        //     // 입력한 id를 통해 해당 email을 가져오기 위해 profiles 테이블에서 검색
        //     const { data: profileData, error: profileError } = await supabase
        //         .from("profiles")
        //         .select("id, email, approved")
        //         .eq("username", id) // eq는 조건을 지정하는 올바른 방식입니다.
        //         .single();

        //     if (profileError) {
        //         setError("사용자를 찾을 수 없습니다.");
        //         setLoading(false);
        //         return;
        //     }

        //     // 사용자의 승인 상태 확인
        //     if (profileData.approved === false) {
        //         setError("승인이 완료되지 않은 계정입니다. 관리자에게 문의하세요.");
        //         setLoading(false);
        //         return;
        //     }

        //     // 이메일을 이용해 로그인 시도
        //     const { data, error: loginError } = await supabase.auth.signInWithPassword({
        //         email: profileData.email,
        //         password,
        //     });

        //     if (loginError) {
        //         setError("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.");
        //         setLoading(false);
        //         return;
        //     }
            

        //     // 승인된 계정이면 /exchange로 이동
        //     setUser(profileData);
        //     router.push("/exchange");
        // } catch (err) {
        //     setError("로그인 중 오류가 발생했습니다.");
        //     setLoading(false);
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="p-8 rounded-lg w-128">
                <h2 className="text-2xl font-semibold text-center mb-6">로그인</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="id" className="block text-sm font-medium text-gray-700">아이디</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder="아이디를 입력하세요"
                            className="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="비밀번호를 입력하세요"
                            className="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember-me"
                                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">로그인 상태 유지</label>
                        </div>
                        <a href="#" className="text-sm text-blue-500 hover:underline">비밀번호를 잊으셨나요?</a>
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-[#2960d7] text-white py-2 px-4 rounded-sm ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
                        disabled={loading}
                    >
                        {loading ? "로그인 중..." : "로그인"}
                    </button>
                </form>
                <div className="pt-4 text-sm flex justify-between">
                    <span className="text-gray-500">업비트 계정이 없으신가요?</span>
                    <span className="text-gray-700 border-b"><Link href={"signup"}> 회원가입 </Link></span>
                </div>
                <div className="pt-1 text-sm">
                    <span className="text-gray-500">법인회원이신가요? </span>
                    <span className="text-gray-700 border-b"><Link href={"login"}> 법인회원 로그인 </Link></span> | 
                    <span className="text-gray-700 border-b"><Link href={"https://upbit.com/signup/company/pre_register"} target="blink"> 법인회원 가입문의</Link> </span>
                </div>
            </div>
        </div>
    );
};

export default Login;

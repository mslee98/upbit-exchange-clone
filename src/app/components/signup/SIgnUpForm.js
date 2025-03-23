'use client';

import { useState } from "react";
import supabase from "../../../Lib/supabase";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const router = useRouter();

    const [signUpYn, setSignUpYn] = useState(false);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = (name, value) => {
        let error = "";

        switch (name) {
            case "username":
                if (!value.trim()) error = "아이디를 입력하세요.";
                break;
            case "phone":
                if (!/^\d{10,11}$/.test(value)) error = "올바른 전화번호를 입력하세요.";
                break;
            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "올바른 이메일 형식이 아닙니다.";
                break;
            case "password":
                if (value.length < 6) error = "비밀번호는 최소 6자 이상이어야 합니다.";
                if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) error = "비밀번호는 숫자와 문자를 포함해야 합니다.";
                break;
            case "confirmPassword":
                if (value !== formData.password) error = "비밀번호가 일치하지 않습니다.";
                break;
            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validate(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 모든 필드 검증
        Object.keys(formData).forEach((key) => validate(key, formData[key]));

        if (Object.values(errors).some((err) => err)) return; // 에러가 있으면 중단

        setLoading(true);

        try {
            // Supabase 회원가입
            const { data, error: signupError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (signupError) {
                setErrors((prev) => ({ ...prev, form: signupError.message }));
                setLoading(false);
                return;
            }

            // profit 테이블에 승인 대기 상태로 저장
            await supabase.from("profiles").insert([
                {
                    id: data.user.id, // user의 id를 profit 테이블에 저장
                    username: formData.username,
                    phone: formData.phone,
                    approved: false, // 기본값: 승인 대기
                    email: formData.email
                },
            ]);

            setSignUpYn(true);

        } catch (err) {
            setErrors((prev) => ({ ...prev, form: "회원가입 중 문제가 발생했습니다." }));
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    const handleToLogin = () => {
        router.push('login')
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}

                <div>
                    <label className="block text-sm font-medium">아이디</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="bg-white w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                            placeholder="사용할 아이디 입력"
                        />
                    </div>
                    {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">전화번호</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-white w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                        placeholder="휴대폰 번호 입력"
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">이메일</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                        placeholder="이메일 입력"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">비밀번호</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-white w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                        placeholder="비밀번호 입력"
                    />
                    <p className="text-gray-500 text-xs mt-1">비밀번호는 최소 8자 이상이어야 합니다.</p>
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">비밀번호 확인</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="bg-white w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                        placeholder="비밀번호 다시 입력"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                </div>

                {/* 약관 동의 */}
                <div className="flex items-center">
                    <input type="checkbox" id="terms" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400" />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                        서비스 이용약관 및 개인정보 처리방침에 동의합니다.
                    </label>
                </div>

                {/* 회원가입 버튼 */}
                <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded bg-blue-500 text-white font-semibold ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
                    disabled={loading}
                >
                    {loading ? "처리 중..." : "회원가입"}
                </button>

                {/* 로그인 링크 */}
                <p className="text-center text-gray-600 text-sm mt-4">
                    이미 계정이 있으신가요? <a href="/login" className="text-blue-500 font-medium">로그인</a>
                </p>
            </form>
        </>
    );
};



export default SignUpForm;

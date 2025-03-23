'use client'

import React, {useState, useEffect} from "react";
import Link from 'next/link';

import { IoIosTimer } from "react-icons/io";
import { useAuth } from "@/contexts/AuthContext";

import { useRouter } from "next/navigation";

const Header = () => {

  const { user, logout } = useAuth();

  console.log(user)
  console.log(user)
  console.log(user)
  console.log(user)
  console.log(user)
  console.log(user)

  const [timeLeft, setTimeLeft] = useState(179); // 2시간 59분 (179분)

  const router = useRouter();

  // 로그인 상태에서 타이머 감소
  useEffect(() => {
    if (!user) {
      setTimeLeft(179); // 로그아웃 시 초기화
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          logout(); // 시간이 다 되면 로그아웃
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // 1분(60,000ms)마다 감소

    return () => clearInterval(interval); // 언마운트 시 정리
  }, [user]);

  const handleLogout = () => {
    logout();

    router.push('/')
  }

  return (
    <header className="bg-[#133491] text-white p-4 px-20">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <svg width="80" height="18" viewBox="0 0 80 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M53.7307 5.39365H47.6602L49.4158 0H44.0222L38.1843 17.9788H49.4158C52.0175 17.9788 54.323 16.3079 55.1267 13.8331L56.5862 9.3067C57.1996 7.3819 55.7613 5.39365 53.7307 5.39365ZM51.2349 9.17979L50.0292 12.9236C49.6273 14.1504 48.4851 14.9965 47.1737 14.9965H44.551L46.6873 8.39718H50.6638C51.0656 8.39718 51.3618 8.79906 51.2349 9.17979Z" fill="white"/>
                <path d="M63.2067 0L62.0433 3.59577H67.437L68.6003 0H63.2067Z" fill="white"/>
                <path d="M57.3688 17.9788H62.7625L66.8447 5.39363H61.4511L57.3688 17.9788Z" fill="white"/>
                <path d="M74.9458 8.39718H78.5839L79.5568 5.39366H75.9188L77.6743 0H72.2807L67.7119 14.0658C67.0774 16.0118 68.5368 18 70.5674 18H76.5533L77.5263 14.9965H73.6344C73.2325 14.9965 72.9364 14.5946 73.0633 14.2139L74.9458 8.39718Z" fill="white"/>
                <path d="M16.4193 6.28202L22.3205 0H15.9962L11.1314 14.9965H7.07025C6.66837 14.9965 6.37225 14.5946 6.49916 14.2139L11.1102 0H5.71655L1.14781 14.0658C0.513261 16.0117 1.97272 17.9788 4.00327 17.9788H15.552L19.6343 5.39365L16.4193 6.28202Z" fill="white"/>
                <path d="M36.3654 0H23.9705L25.7896 6.28202L23.1456 5.39365L19.0634 17.9788H24.457L26.403 11.9929H32.2408C34.8424 11.9929 37.148 10.322 37.9517 7.84724L39.2208 3.91304C39.8554 1.98825 38.4171 0 36.3654 0ZM33.8695 3.78613L32.8542 6.93772C32.4523 8.16451 31.3101 9.01057 29.9987 9.01057H27.3759L29.3219 3.02468H33.2984C33.7214 3.00353 33.9964 3.38425 33.8695 3.78613Z" fill="white"/>
            </svg>
          <nav className="flex space-x-8 text-medium font-bold ml-6">
            
          <Link href="/exchange" className="text-gray-400 hover:underline">거래소</Link>
            <a href="#" className="hover:underline">입출금</a>
            <a href="#" className="text-gray-400 hover:underline">투자내역</a>
            <a href="#" className="text-gray-400 hover:underline">코인동향</a>
            <a href="#" className="text-gray-400 hover:underline">서비스+</a>
            <a href="#" className="text-gray-400 hover:underline">고객센터</a>
            <a href="#" className="text-gray-400 hover:underline">NFT</a>
          </nav>
        </div>
        <div className="flex space-x-4 text-sm">
          {user ? 
            <>
              <span className="font-bold flex justify-center items-center"><IoIosTimer className="mr-2"/>{Math.floor(timeLeft / 60)}시 {timeLeft % 60}분</span>
              <div className="font-bold cursor-pointer hover:underline" onClick={handleLogout}>로그아웃</div>
            </>
            :
            <>
              <Link href="/login" className="font-bold hover:underline">로그인</Link>
              <Link href="/signup" className="font-bold hover:underline">회원가입</Link>
            </>
          }
          <a href="#" className="font-bold hover:underline">EN</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="font-bold hover:underline">KO</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
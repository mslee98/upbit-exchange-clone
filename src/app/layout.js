import { Roboto } from "next/font/google";
import "./globals.css";
import 'swiper/css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Security from "./components/Security";

import { AuthProvider } from "../contexts/AuthContext";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // 원하는 가중치 추가 가능
});

export const metadata = {
  title: "업비트 | 가장 신뢰받는 디지털 자산 거래소",
  description: "비트코인, 이더리움, 리플, NFT 등 다양한 디지털 자산, 국내 거래량 1위 거래소 업비트에서 지금 확인해보세요. No.1 Digital Asset Exchange in Korea, Upbit. Trade various digital assets conveniently and securely including Bitcoin, Ethereum, Ripple, NFT etc.",
  icons: {
		icon: "/favicon.jpg",
	},
};

export default function RootLayout({ children }) {


  return (
    <html lang="ko">
      <AuthProvider>
          <html lang="ko">
            <body className={`${roboto.variable} antialiased bg-[#eaecf0]`}>
              <Security />
              <div className="flex flex-col min-h-screen">
                <Header />
                <main>{children}</main>
                <Footer />
              </div>
            </body>
          </html>
      </AuthProvider>
    </html>
  );
}

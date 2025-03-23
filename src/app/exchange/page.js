'use client'

import { useState } from "react";

import AssetsStatusComponent from "../components/AssetsStatusComponent";
import CheckingAccountComponent from "../components/CheckingAccountComponent";
import CoinList from "../components/CoinList";

export default function Exchange() {

  const sampleData = [
    {
      name: "총 자산",
      symbol: "KRW",
      balance: 2000000, // 모든 자산을 원화로 환산한 총액
      balanceToBit: 0.00161,
      percentage: "100%",
      image: "/images/coins/KRW.png",
      transactions: [],
    },
    {
      name: "엑스알피(리플)",
      symbol: "XRP",
      balance: 562, // 2,000,000 KRW를 XRP로 변환 (1 XRP = 3551 KRW)
      percentage: "100%",
      image: "/images/coins/XRP.png",
      transactions: [
        { date: "2025.03.22", status: "입금 완료", amount: "562 XRP" },
      ],
    },
    {
      name: "비트코인",
      symbol: "BTC",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/BTC.png",
      transactions: [
        { date: "2021.05.31", status: "입금 완료", amount: "0.0005 BTC" },
        { date: "2021.05.24", status: "출금 완료", amount: "0.0003 BTC" },
      ],
    },
    {
      name: "이더리움",
      symbol: "ETH",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/ETH.png",
      transactions: [
        { date: "2021.06.01", status: "입금 완료", amount: "0.02 ETH" },
        { date: "2021.05.20", status: "출금 완료", amount: "0.005 ETH" },
      ],
    },
    {
      name: "도지",
      symbol: "DOGE",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/DOGE.png",
      transactions: [],
    },
    {
      name: "메디블럭",
      symbol: "MED",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/MED.png",
      transactions: [],
    },
    {
      name: "디센트럴랜드",
      symbol: "MANA",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/MANA.png",
      transactions: [],
    },
    {
      name: "하이브",
      symbol: "HIVE",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/HIVE.png",
      transactions: [],
    },
    {
      name: "플로우",
      symbol: "FLOW",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/FLOW.png",
      transactions: [],
    },
    {
      name: "1인치네트워크",
      symbol: "1INCH",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/1INCH.png",
      transactions: [],
    },
    {
      name: "AC밀란",
      symbol: "ACM",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/ACM.png",
      transactions: [],
    },
    {
      name: "FC바르셀로나",
      symbol: "BAR",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/BAR.png",
      transactions: [],
    },
    {
      name: "가스",
      symbol: "GAS",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/GAS.png",
      transactions: [],
    },
    {
      name: "밀크",
      symbol: "MLK",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/MLK.png",
      transactions: [],
    },
    {
      name: "바나",
      symbol: "VANA",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/VANA.png",
      transactions: [],
    },
    {
      name: "바운스토큰",
      symbol: "AUCTION",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/AUCTION.png",
      transactions: [],
    },
    {
      name: "비트코인캐시",
      symbol: "BCH",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/BCH.png",
      transactions: [],
    },
    {
      name: "비체인",
      symbol: "VET",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/VET.png",
      transactions: [],
    },
    {
      name: "비트토렌트",
      symbol: "BTT",
      balance: 0.00,
      percentage: "0.00%",
      image: "/images/coins/BTT.png",
      transactions: [],
    },
  ];

  const [selectedCoin, setSelectedCoin] = useState(null);

  const handleClick = (coin) => {
    setSelectedCoin(coin);
  };

  return (
    <>
      <AssetsStatusComponent coins={sampleData} coinClick={handleClick} />

      {/* Center Content */}
      <CheckingAccountComponent selectedCoin={selectedCoin}/>

      {/* Right Sidebar */}
      <CoinList/>
    </>
  );
}

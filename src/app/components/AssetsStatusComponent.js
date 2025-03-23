'use client'

import { useState } from "react";
import Image from "next/image";

const AssetsStatusComponent = ({ coins, coinClick }) => {
    const [activeTab, setActiveTab] = useState("전체");
  
    return (
      <section className="flex-[1.3] bg-white shadow-md p-4 md:flex-col order-2">
        <div className="mb-4">
          <h2 className="text-sm font-medium mb-2">총 보유 자산</h2>
          <div className="text-2xl font-bold">
            {coins[0].balance} <span className="font-light">KRW</span>
          </div>
          <p className="text-sm text-gray-500">≈ {coins[0].balanceToBit ? coins[0].balanceToBit : 0} BTC</p>
        </div>
  
        <div className="border-b border-gray-300 mb-4">
          <ul className="flex text-xs">
            {["전체", "보유", "관심"].map((tab) => (
              <li
                key={tab}
                className={`mr-4 pb-2 cursor-pointer ${
                  activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>
  
        <div>
          {activeTab === "전체" && <CryptoBalance assets={coins} coinClick={coinClick} />}
          {(activeTab === "보유" || activeTab === "관심") && (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
              <p className="mt-2">{activeTab === "보유" ? "보유 중인 자산이 없습니다." : "등록된 관심코인이 없습니다."}</p>
              <p className="text-sm text-gray-400">{activeTab === "보유" ? "자산을 입금하여 거래를 시작하세요." : "관심코인을 등록해 주세요."}</p>
            </div>
          )}
        </div>
      </section>
    );
  };
  
  const CryptoBalance = ({ assets, coinClick }) => {
    return (
      <>
        <div className="grid grid-cols-3 text-gray-500 text-sm font-semibold py-1 rounded-t-lg bg-gray-100">
          <div className="px-2">코인명</div>
          <div className="text-center px-2">보유비중</div>
          <div className="text-right px-2">보유수량</div>
        </div>
        <div className="max-h-200 overflow-y-auto">
          {assets.map((asset, index) => (
            <div key={index} onClick={() => coinClick(asset)} className="grid grid-cols-3 items-center px-2 py-3 cursor-pointer hover:bg-gray-100">
              <div className="flex items-center">
                <Image src={asset.image} alt={asset.name} width={24} height={24} className="mr-2" />
                <div>
                  <div className="font-medium text-xs">{asset.name}</div>
                  <div className="text-xs text-gray-500">{asset.symbol}</div>
                </div>
              </div>
              <div className="text-center text-xs">{asset.percentage}</div>
              <div className="text-right text-xs">
                <div>{asset.balance} {asset.symbol}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
  
  export default AssetsStatusComponent;
  
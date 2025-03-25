'use client'

import supabase from "../../Lib/supabase";

import { useEffect, useState } from "react";

const CheckingAccountComponent = ({ selectedCoin, setPaymentModalYn, userData, xrpPrice }) => {
  const [activeTab, setActiveTab] = useState("history");

  if(!userData && !xrpPrice) {
    return <div>...Loading</div>  
  }  

  // 초기 샘플 데이터
  const initData = {
    name: "엑스알피(리플)",
    symbol: "KRW",
    balance: 0, // 2,000,000 KRW를 XRP로 변환 (1 XRP = 3551 KRW)
    balanceToKrw: 0,
    percentage: "100%",
    image: "/images/coins/KRW.png",
    transactions: [
    ],
  };

  // selectedCoin이 없으면 initData 사용
  const coinData = selectedCoin || initData;

  // transactions에서 입금 & 출금 데이터 분류
  const deposits = coinData.transactions.filter((tx) => tx.status === "입금 완료");
  const withdraws = coinData.transactions.filter((tx) => tx.status === "출금 완료");

  return (
    <section className="flex-1 bg-white shadow-md rounded-lg p-4 md:order-1">
      {/* 상단 코인 정보 */}
      
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{coinData.name} ({coinData.symbol})</h2>
          <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">{coinData.symbol} Leader</span>
        </div>
      
      

      {/* 총 보유 & 거래대기 */}
      <div className="mt-2">

      {selectedCoin?.symbol === 'XRP' ?
        <div className="flex justify-between">
        <div>총 보유</div>
        <div>
          <p className="text-lg font-semibold">{userData.balance} {coinData.symbol}</p>
          <p className="text-gray-500 text-right">≈ {userData.balance * xrpPrice} KRW</p>
        </div>
      </div>
      :
      <div className="flex justify-between">
        <div>총 보유</div>
        <div>
          <p className="text-lg font-semibold">0 {coinData.symbol}</p>
          <p className="text-gray-500 text-right">≈ 0 KRW</p>
        </div>
      </div>
      }

        



        <div className="mt-1 flex items-center justify-between text-sm text-gray-500">
          <span>거래대기</span>
          <span>0 KRW</span>
        </div>
      </div>

      <div className="mt-4 border-t border-b border-gray-100">
        <div className="flex">
          <button onClick={setPaymentModalYn} className="flex-1 text-center py-2 font-bold text-red-500 hover:text-red-600 transition-all duration-300 ease-in-out">
            매수
          </button>
          <button onClick={setPaymentModalYn} className="flex-1 text-center py-2 font-bold text-blue-500 hover:text-blue-600 transition-all duration-300 ease-in-out">
            매도
          </button>
          <button onClick={setPaymentModalYn} className="flex-1 text-center py-2 font-bold text-black hover:text-gray-800 transition-all duration-300 ease-in-out">
            출금
          </button>
        </div>
      </div>


      {/* 탭 메뉴 */}
      <div className="mt-4 border-t border-b border-gray-100">
        <div className="flex">
          {["history", "deposit", "withdraw"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 text-center py-2 font-bold ${
                activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "history" ? "내역" : tab === "deposit" ? "입금" : "출금"}
            </button>
          ))}
        </div>
      </div>

      {/* 탭 내용 */}
      

      {/* 거래 내역 탭 */}
      <div className="mt-3">

        {selectedCoin?.symbol === 'XRP' ?
          <ul className="space-y-2">
            <li  className="text-sm pb-2 py-2 px-2 hover:bg-gray-100">
              <div className="flex justify-between mt-4 mb-4">
                  <div>
                    <div className="font-bold text-green-500">
                      입금완료
                    </div>
                    <div className="text-xs text-gray-400">{`${userData.input_dt} XRP`} </div>
                  </div>
                  <div className="text-black-700 font-bold">{userData.balance}</div>
                </div>
            </li>
          </ul>
        :
          activeTab === "history" && (
            coinData.transactions.length > 0 ? (
              <ul className="space-y-2">
                {coinData.transactions.map((tx, index) => (
                  <li key={index} className="text-sm pb-2 py-2 px-2 hover:bg-gray-100">
                    <div className="flex justify-between mt-4 mb-4">
                      <div>
                        <div className={`font-bold ${tx.status === "입금 완료" ? "text-green-500" : "text-blue-500"}`}>
                          입금 완료
                        </div>
                        <div className="text-xs text-gray-400">{tx.date}</div>
                      </div>
                      <div className="text-black-700 font-bold">{tx.balance}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-4">거래 내역이 없습니다.</p>
            )
          )
        }

        

        {/* 입금 내역 탭 */}
        {activeTab === "deposit" && (
          deposits.length > 0 ? (
            <ul className="space-y-2">
              {deposits.map((deposit, index) => (
                <li key={index} className="text-sm pb-2 py-2 px-2 hover:bg-gray-100">
                  <div className="flex justify-between mt-4 mb-4">
                    <div>
                      <div className="text-green-500 font-bold">{deposit.status}</div>
                      <div className="text-xs text-gray-400">{deposit.date}</div>
                    </div>
                    <div className="text-black-700 font-bold">{deposit.amount}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">입금 내역이 없습니다.</p>
          )
        )}

        {/* 출금 내역 탭 */}
        {activeTab === "withdraw" && (
          withdraws.length > 0 ? (
            <ul className="space-y-2">
              {withdraws.map((withdraw, index) => (
                <li key={index} className="text-sm pb-2 py-2 px-2 hover:bg-gray-100">
                  <div className="flex justify-between mt-4 mb-4">
                    <div>
                      <div className="text-blue-500 font-bold">{withdraw.status}</div>
                      <div className="text-xs text-gray-400">{withdraw.date}</div>
                    </div>
                    <div className="text-black-700 font-bold">{withdraw.amount}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">출금 내역이 없습니다.</p>
          )
        )}
      </div>
    </section>
  );
};

export default CheckingAccountComponent;

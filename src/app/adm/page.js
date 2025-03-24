'use client';

import { useRouter } from "next/navigation";

export default function Dashboard() {
  
  const router = useRouter();

  const handleUsers = () => {
    router.push('/adm/users')
  }
  
  return (
    <>
      <div className='text-white font-bold m-4 text-xl'>DashBoard</div>
        <div className="grid grid-cols-3 gap-6">
          <div onClick={handleUsers} class="cursor-pointer items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">사용자 관리 위젯</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400 opacity-80">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            
          </div>
        </div>
    </>
    
  );
}

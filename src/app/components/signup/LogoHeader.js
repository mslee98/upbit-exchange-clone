'use client';

import Image from "next/image";

const LogoHeader = () => {
    return (
        <div className="flex justify-center mb-6">
            <Image
                src={"/Upbit_Logo.png"}
                width={300}
                height={50}
                alt="Upbit logo"
            />
        </div>
    );
};

export default LogoHeader;
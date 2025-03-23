'use client'

import { useState } from "react";
import SignUpAgreement from "../components/signup/SignUpAgreement";
import { useRouter } from "next/navigation";
import LogoHeader from "../components/signup/LogoHeader";
import SignUpForm from "../components/signup/SIgnUpForm";

const SignUp = () => {

    const router = useRouter();

    const [nextYn, setNextYn] = useState(false);
    
    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="p-8 rounded-lg max-w-4xl">
                <LogoHeader />
                {nextYn ? 
                  <SignUpForm/>
                : <SignUpAgreement setNextYn={setNextYn}/>
                }
            </div>
        </div>
        
    )
} 

export default SignUp;

import React, { useState } from "react";
import SendOTPForm from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";
import { getOtp } from "../../services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function AuthCountainer() {
  const { isPending:isSendingOtp, mutateAsync, data:otpResponse } = useMutation({
    mutationFn: getOtp,
  });

  const sendOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateAsync({ phoneNumber });
      console.log(data);
      setStep(2);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm  
          isSendingOtp={isSendingOtp}
            onSubmit={sendOtpHandler}
            setStep={setStep}
            phoneNumber={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            
          />
        );
      case 2:
        return (
          <CheckOTPForm
            phoneNumber={phoneNumber}
            onBack={() => setStep((s) => s - 1)}
            onResendOtp={sendOtpHandler}
            otpResponse={otpResponse}
          />
        );

      default:
        return null;
    }
  };
  return <div className="w-full sm:max-w-sm">{renderStep()}</div>;
}

export default AuthCountainer;

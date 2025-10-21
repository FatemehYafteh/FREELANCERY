
import TextField from "../../ui/TextField";
import { useMutation } from "@tanstack/react-query";
import { getOtp } from "../../services/authService";
import toast from "react-hot-toast";
import Loading from "../../ui/Loading"

export default function SendOTPForm({ setStep,isSendingOtp ,phoneNumber ,onChange ,onSubmit }) {
  


  return (
    <div>
      <form className="space-y-8" onSubmit={onSubmit}>
        <TextField
          label="شماره موبایل"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onChange}
        />
        <div>
          {isSendingOtp ? (
            <Loading/>
          ) : (
            <button
              type="submit"
              className="px-4 py-1 font-bold bg-primary-900 text-white w-full rounded-xl transition-all duration-300 hover:bg-primary-800 shadow-lg shadow-primary-300"
            >
              ارسال کد تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

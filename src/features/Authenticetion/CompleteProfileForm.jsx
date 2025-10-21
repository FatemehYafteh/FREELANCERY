import React, { useState } from "react";
import TextField from "../../ui/TextField";
import RadioInput from "../../ui/RadioInput";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { completeProfile } from "../../services/authService";
import toast from "react-hot-toast";
import Loading from "../../ui/Loading";

export default function CompleteProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { isPending, mutateAsync } = useMutation({
    mutationFn: completeProfile,
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message, user } = await mutateAsync({ name, role, email });
      toast.success(message);
      
      if (user.status !== 2) {
        navigate("/");
        toast("پروفایل شما در انتظار تایید است", { icon: "👏" });
        return;
      }
      if(user.role === "OWNER") return navigate ("/owner")
      if(user.role === "FREELANCER") return navigate ("/freelancer")
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex justify-center pt-10">
      <div className="w-full sm:max-w-sm ">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <TextField
            label="نام و نام خانوادگی"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="ایمیل"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex items-center justify-center gap-x-8">
            <RadioInput
              lable="کارفرما"
              value="OWNER"
              onChange={(e) => setRole(e.target.value)}
              name="role"
              checked={role === "OWNER"}
            />
            <RadioInput
              lable="فریلنسر"
              value="FREELANCER"
              onChange={(e) => setRole(e.target.value)}
              name="role"
              checked={role === "FREELANCER"}
            />
          </div>
          <div>
            {isPending ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className="px-4 py-1 font-bold bg-primary-900 text-white w-full rounded-xl transition-all duration-300 hover:bg-primary-800 shadow-lg shadow-primary-300"
              >
                تایید
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

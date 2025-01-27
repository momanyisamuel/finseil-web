import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser, normalizePhoneNumber, sendEmail } from "@/lib/utils";
import { FC, useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { toast } from "sonner";
import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { decodeToken } from "@/lib/helpers";
import { useAppDispatch } from "@/store/hooks";
import { getLoggedInUser, sendSMS } from "@/store/authSlice";
import { verify2FA } from "@/store/usersSlice";
// import { getLoggedInUser } from "@/store/authSlice";
// import { useAppDispatch } from "@/store/hooks";

type LoginProps = object;

const Login: FC<LoginProps> = () => {
  // const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [userOTP, setUserOTP] = useState("");
  const [userAppOTP, setUserAppOTP] = useState("");
  const [step, setStep] = useState(1); // 1: Login, 2: OTP Verification
  const [access, setAccess] = useState("");
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser({ username, password });
      if (!response) {
        throw new Error("Login response is undefined");
      }
      const { access } = response.data;
      setAccess(access);
      const decodedUser = decodeToken(access);

      // Fetch the logged-in user's details to determine if OTP is required
      const user = await dispatch(
        getLoggedInUser(decodedUser?.user_id as string)
      ).unwrap();
      console.log(user);

      if (user.two_fa_enabled) {
        // User has 2FA enabled, proceed to OTP step
        if (user.two_fa_method === "email") {
          await sendEmailOtp(user.email);
          setStep(2);
        } else if (user.two_fa_method === "finseil_mobile") {
          await sendPhoneOTP(normalizePhoneNumber(user.phone_number, "KE"));
          console.log("OTP sent to phone");
          setStep(2);
        } else if(user.two_fa_method === "app") {
          setStep(3);
          console.log("OTP sent to App");
        }
        toast.success("OTP sent to your preferred method.");
      } else {
        // Complete login for non-2FA users
        completeLogin(decodedUser);
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setOtp(otp.toString());
    return otp;
  };

  const sendEmailOtp = async (email: string) => {
    // Implement actual email verification logic here
    const emailText = {
      subject: "Email Verification",
      message: `Your SOLZA Login OTP is ${generateOtp()}`,
      recipient_list: [email],
    };
    const result = await sendEmail(
      emailText.message,
      emailText.subject,
      emailText.recipient_list
    );

    return result;
  };

  const sendPhoneOTP = async (phone_number: string) => {
    // Implement actual phone verification logic here
    const smsData = {
      message: `Your SOLZA verification PIN is ${generateOtp()}`,
      destination: [phone_number],
    };
    const result = await dispatch(sendSMS(smsData));
    if (result) {
      return result;
    }
    return null;
  };

  const verifyAuthCode = async (code: string, user_id: string) => {
    // Call API to enable 2FA
    const input = {
      user_id: user_id,
      otp: code,
    };
    const res = await dispatch(verify2FA(input));

    if (res.payload.message === "2FA verified") {
      return true;
    }
    return false;
  };

  const handleOtpVerification = async () => {
    try {
      const decodedUser = decodeToken(access);
      if (otp.length !== 6) {
        toast.error("Invalid OTP. Please enter a 6-digit OTP.");
        return;
      }
      console.log("OTP", otp);
      console.log("User OTP", userOTP);
      if (otp !== userOTP) {
        toast.error("Invalid OTP. Please enter the correct OTP.");
        return;
      }
      completeLogin(decodedUser);
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
      console.error(error);
    }
  };

  const handleAppOtpVerification = async () => {
    try {
      const decodedUser = decodeToken(access);
      console.log("User OTP", userOTP);
      const isValid = await verifyAuthCode(
        userOTP,
        decodedUser?.user_id as string
      );
      if (!isValid) {
        toast.error("Invalid OTP. Please enter the correct OTP.");
        return;
      }
      completeLogin(decodedUser);
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
      console.error(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const completeLogin = (decodedUser: any) => {
    dispatch(getLoggedInUser(decodedUser.user_id as string));
    toast.success("Login successful");
    window.location.href = "/dashboard";
  };

  return (
    <AuthLayout title="Welcome back!" subtitle="Login to your account">
      {step === 1 && (
        <form onSubmit={handleLogin}>
          <div className="grid gap-6">
            <div>
              <Label>Username</Label>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                className="dark:bg-gray-800 dark:border-gray-500"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                className="dark:bg-gray-800 dark:border-gray-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-[#9167C6] hover:bg-purple-700">
              Login
            </Button>
          </div>
          <div className="mt-4 text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>
      )}

      {step === 2 && (
        <div>
          <div className="grid gap-6">
            <div>
              <Label>Enter OTP</Label>
              <Input
                type="text"
                placeholder="6-digit OTP"
                value={userOTP}
                className="dark:bg-gray-800 dark:border-gray-500"
                onChange={(e) => setUserOTP(e.target.value)}
              />
            </div>
            <Button
              type="button"
              className="bg-[#9167C6] hover:bg-purple-700"
              onClick={handleOtpVerification}
            >
              Verify OTP
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="grid gap-6">
            <div>
              <div className="w-full mb-3">
              <Label>Enter OTP</Label>
              </div>
              <div>
              <InputOTP
                maxLength={6}
                value={userAppOTP}
                onChange={(value) => setUserAppOTP(value)}
                
              >
                <InputOTPGroup className="w-full">
                  <InputOTPSlot index={0} className="w-full" />
                  <InputOTPSlot index={1} className="w-full" />
                  <InputOTPSlot index={2} className="w-full" />
                  <InputOTPSlot index={3} className="w-full" />
                  <InputOTPSlot index={4} className="w-full" />
                  <InputOTPSlot index={5} className="w-full" />
                </InputOTPGroup>
              </InputOTP>
              </div>
            </div>
            <Button
              type="button"
              className="bg-[#9167C6] hover:bg-purple-700"
              onClick={() => handleAppOtpVerification()}
            >
              Verify OTP
            </Button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default Login;

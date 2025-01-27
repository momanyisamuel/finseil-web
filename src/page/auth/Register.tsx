import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import api from "../../../api";
import { FC, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "sonner";
import { createAgent } from "@/store/usersSlice";
import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { sendSMS, verifyUser } from "@/store/authSlice";
import { BadgeCheckIcon } from "lucide-react";
import Spinner from "@/components/ui/spinner";
import { sendEmail } from "@/lib/utils";

const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  first_name: z
    .string()
    .min(3, { message: "First name must be at least 3 characters" }),
  middle_name: z
    .string()
    .min(3, { message: "Middle name must be at least 3 characters" }),
  last_name: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters" }),
  phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" }),
  identification_number: z.string().min(8, {
    message: "Identification number must be at least 10 characters",
  }),
  MPESA_NUMBER: z
    .string()
    .min(10, { message: "MPESA number must be at least 10 characters" }),
});

type UserInput = z.infer<typeof UserSchema>;

type RegisterProps = object;

const Register: FC<RegisterProps> = () => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [userOTP, setUserOTP] = useState("");
  const [email, setEmail] = useState("");
  const [identification_number, setIdentificationNumber] = useState("");
  const [first_name, setFirstName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [idVerified, setIdVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  // const [verifiedName, setVerifiedName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserInput>({
    resolver: zodResolver(UserSchema),
  });

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setOtp(otp.toString());
    return otp;
  };

  const handleVerifyOtp = async (step: string) => {
    console.log(otp, "otp", userOTP, "userOTP");
    setIsLoading(true);
    if (otp === userOTP) {
      setIsLoading(false);
      setUserOTP("");
      if(step === "2") {
        setStep(3);
      }
      if(step === "5") {
        setStep(6);
        setPhoneVerified(true);
      }
    }
  };

  const handleVerifyUser = async (id_number: string, first_name: string, middle_name: string, last_name: string) => {
    setIsLoading(true);
    const response = await dispatch(verifyUser(id_number));
    console.log(response.payload);
    //check that names provided and id_number match the response data
    if (response.payload.data.code !== "200.001") {
      setIdVerified(false);
      setIsLoading(false);
    }
    console.log(response.payload.data.response.identification_number, id_number, response.payload.data.response.first_name, first_name.toUpperCase(), response.payload.data.response.middle_name, middle_name.toUpperCase(), response.payload.data.response.last_name, last_name.toUpperCase());
    console.log(response.payload.data.response.identification_number === id_number && response.payload.data.response.first_name === first_name.toUpperCase() && response.payload.data.response.middle_name === middle_name.toUpperCase() && response.payload.data.response.last_name === last_name.toUpperCase())
    if (response.payload.data.response.identification_number === id_number && response.payload.data.response.first_name === first_name.toUpperCase() && response.payload.data.response.middle_name === middle_name.toUpperCase() && response.payload.data.response.last_name === last_name.toUpperCase()) {
      setIdVerified(true);
      setIsLoading(false);
      setValue("identification_number", id_number);
      setValue("first_name", first_name);
      setValue("middle_name", middle_name);
      setValue("last_name", last_name);
      setStep(4);
    }
  };

  const handleVerifyPhone = async (phone_number: string) => {
    setIsLoading(true)
    // Implement actual phone verification logic here
    const smsData = {
      message: `Your SOLZA verification PIN is ${generateOtp()}`,
      destination: [phone_number],
    };
    const result = await dispatch(sendSMS(smsData));
    if (result) {
      console.log(result);
      setIsLoading(false)
      setValue("phone_number", phone_number);
      setStep(5);
    }
  }

 

  const sendOtp = async () => {
    // Implement actual email verification logic here
    setIsLoading(true);
    const emailText = {
      subject: "Email Verification",
      message: `Your OTP is ${generateOtp()}`,
      recipient_list: [email],
    };
    const result = await sendEmail(
      emailText.message,
      emailText.subject,
      emailText.recipient_list
    );

    if (result) {
      setIsLoading(false);
      setValue("email", email);
      setStep(2);
    }
  };

  const handleRegister = async (data: UserInput) => {
    console.log(data);
    try {
      const res = await dispatch(createAgent(data));
      if (res) {
        toast.success("You successfully registered, please wait for approval");
        console.log(res);
        window.location.href = "/";
      }
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <div>
      <div className="">
        {step === 1 && (
          <AuthLayout
            title="Register"
            subtitle="We will send you an OTP to verify your email."
          >
            <div className="grid gap-6">
              <div>
                <Label className="">Email</Label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  className="dark:bg-gray-800 dark:border-gray-500"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                type="button"
                className="bg-[#9167C6] hover:bg-purple-700"
                onClick={() => sendOtp()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner className="text-white" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </div>
            <div className="mt-4 text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </AuthLayout>
        )}
        {step === 2 && (
          <AuthLayout
            title="Verify OTP"
            subtitle="Enter the OTP sent to your email."
          >
            <div className="grid gap-6">
              <div>
                <Label className="">OTP</Label>
                <Input
                  type="text"
                  placeholder="OTP"
                  value={userOTP}
                  className="dark:bg-gray-800 dark:border-gray-500"
                  onChange={(e) => setUserOTP(e.target.value)}
                />
              </div>
              <Button
                type="button"
                className="bg-[#9167C6] hover:bg-purple-700"
                onClick={() => handleVerifyOtp(step.toString())}
              >
                {isLoading ? (
                  <>
                    <Spinner className="text-white" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </div>
            <div className="mt-4 text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </AuthLayout>
        )}
        {step === 3 && (
          <AuthLayout
            title="Verify User"
            subtitle="Enter your ID number & names as in your ID to verify your identity."
          >
            <div className="grid gap-6">
              <div>
                <Label className="">ID Number</Label>
                <Input
                  type="text"
                  placeholder="ID Number"
                  value={identification_number}
                  className="dark:bg-gray-800 dark:border-gray-500"
                  onChange={(e) => setIdentificationNumber(e.target.value)}
                />
              </div>
              <div className="">
                <Label>First Name</Label>
                <Input
                  type="text"
                  placeholder="First Name"
                  className="w-full"
                  name="first_name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="">
                <Label>Middle Name</Label>
                <Input
                  type="text"
                  placeholder="Middle Name"
                  className="w-full"
                  name="middle_name"
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>
              <div className="">
                <Label>Last Name</Label>
                <Input
                  type="text"
                  placeholder="Last Name"
                  className="w-full"
                  name="last_name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <Button
                type="button"
                className="bg-[#9167C6] hover:bg-purple-700"
                onClick={() => handleVerifyUser(identification_number, first_name, middle_name, last_name)}
              >
                {isLoading ? (
                  <>
                    <Spinner className="text-white" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  "Verify User"
                )}
              </Button>
            </div>
            <div className="mt-4 text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </AuthLayout>
        )}
        {step === 4 && (
          <AuthLayout
            title="Verify Phone"
            subtitle="Enter your phone number to verify your phone."
          >
            <div className="grid gap-6">
              <div>
                <Label className="">Phone Number</Label>
                <Input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  className="dark:bg-gray-800 dark:border-gray-500"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <Button
                type="button"
                className="bg-[#9167C6] hover:bg-purple-700"
                onClick={() => handleVerifyPhone(phoneNumber)}
              >
                {isLoading ? (
                  <>
                    <Spinner className="text-white" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  "Verify Phone Number"
                )}
              </Button>
            </div>
            <div className="mt-4 text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </AuthLayout>
        )}
        {step === 5 && (
          <AuthLayout
            title="Verify OTP"
            subtitle="Enter the OTP sent to your phone."
          >
            <div className="grid gap-6">
              <div>
                <Label className="">OTP</Label>
                <Input
                  type="text"
                  placeholder="OTP"
                  value={userOTP}
                  className="dark:bg-gray-800 dark:border-gray-500"
                  onChange={(e) => setUserOTP(e.target.value)}
                />
              </div>
              <Button
                type="button"
                className="bg-[#9167C6] hover:bg-purple-700"
                onClick={() => handleVerifyOtp(step.toString())}
              >
                {isLoading ? (
                  <>
                    <Spinner className="text-white" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </div>
            <div className="mt-4 text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </AuthLayout>
        )}
        {step === 6 && (
          <AuthLayout
            title="Register"
            subtitle="Enter your details to register."
          >
            <form onSubmit={handleSubmit(handleRegister)}>
              <div className="grid gap-6">
                <div>
                  <Label className="">Username</Label>
                  <Input
                    type="text"
                    placeholder="Username"
                    className="dark:bg-gray-800 dark:border-gray-500"
                    {...register("username")}
                  />
                  {errors.username && (
                    <span className="text-red-500">
                      {errors.username.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label className="">Password</Label>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="dark:bg-gray-800 dark:border-gray-500"
                    {...register("password")}
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label className="">First Name</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    className="dark:bg-gray-800 dark:border-gray-500"
                    {...register("first_name")}
                  />
                  {errors.first_name && (
                    <span className="text-red-500">
                      {errors.first_name.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label className="">Middle Name</Label>
                  <Input
                    type="text"
                    placeholder="Middle Name"
                    className="dark:bg-gray-800 dark:border-gray-500"
                    {...register("middle_name")}
                  />
                  {errors.middle_name && (
                    <span className="text-red-500">
                      {errors.middle_name.message}
                    </span>
                  )}
                </div>

                <div>
                  <Label className="">Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    className="dark:bg-gray-800 dark:border-gray-500"
                    {...register("last_name")}
                  />
                  {errors.last_name && (
                    <span className="text-red-500">
                      {errors.last_name.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <span
                      className={
                        phoneVerified
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >Phone Number</span>
                    {
                      phoneVerified ? (
                        <span className="text-green-500">
                          <BadgeCheckIcon size={16} />
                        </span>
                      ) : (
                        <span className="text-red-500">
                          <p className="text-red-500">Phone number not verified</p>
                        </span>
                      )
                    }
                    </Label>
                  <Input
                    type="text"
                    placeholder="Phone Number"
                    className="dark:bg-gray-800 dark:border-gray-500"
                    {...register("phone_number")}
                  />
                  {errors.phone_number && (
                    <span className="text-red-500">
                      {errors.phone_number.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <span
                      className={
                        idVerified
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >Identification Number</span>
                    {
                      idVerified ? (
                        <span className="text-green-500">
                          <BadgeCheckIcon size={16} />
                        </span>
                      ) : (
                        <span className="text-red-500">
                          <p className="text-red-500">Identification number not verified</p>
                        </span>
                      )
                    }
                    </Label>
                  <Input
                    type="text"
                    placeholder="Identification Number"
                    className="dark:bg-gray-800 dark:border-gray-500"
                    {...register("identification_number")}
                  />
                  {errors.identification_number && (
                    <span className="text-red-500">
                      {errors.identification_number.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label className="">MPESA Number</Label>
                  <Input
                    type="text"
                    placeholder="MPESA Number"
                    className="dark:bg-gray-800 dark:border-gray-500"
                    {...register("MPESA_NUMBER")}
                  />
                  {errors.MPESA_NUMBER && (
                    <span className="text-red-500">
                      {errors.MPESA_NUMBER.message}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  className="bg-[#9167C6] hover:bg-purple-700"
                >
                  Register
                </Button>
              </div>
            </form>
            <div className="mt-4 text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </AuthLayout>
        )}
      </div>
    </div>
  );
};

export default Register;

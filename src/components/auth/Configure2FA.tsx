"use client"

import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CopyIcon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { verify2FA } from "@/store/usersSlice";

const twoFactorAuthSchema = z.object({
  code: z.string(),
});

type TwoFactorAuth = z.infer<typeof twoFactorAuthSchema>;

type Configure2FAProps = {
  qrCodeData: string;
  userinfo: {
    secret: string;
  };
  onCopyText: () => void;
  setEnabled: (enabled: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  enableAuthApp: () => void;
};

const Configure2FA: FC<Configure2FAProps> = ({
  qrCodeData,
  userinfo,
  setEnabled,
  setIsOpen,
  enableAuthApp,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TwoFactorAuth>({
    resolver: zodResolver(twoFactorAuthSchema),
  });

  const onSubmit = async (data: TwoFactorAuth) => {
    try {
      // Call API to enable 2FA
      const input = {
        user_id: user.id,
        otp: data.code,
      };    
      const res = await dispatch(verify2FA(input))
      console.log(res.payload)
      if (res.payload.message === "2FA verified") {
        setEnabled(true);
        enableAuthApp();
      } else {
        setEnabled(false);
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Set Up Two Factor Authentication</CardTitle>
          <CardDescription>
            Authenticator apps and browser extensions like Authy, Google
            Authenticator, and 1Password etc. generate one-time passwords that
            are used as a second factor to verify your identity when prompted
            during sign in.
          </CardDescription>
        </CardHeader>
        <CardContent className="shadow-none">
          <div>
            <h3 className="text-lg font-semibold text-primary">
              Scan the QR code below with your authenticator app to set up
              two-factor authentication.
            </h3>
            <p className="text-muted-foreground">
              Use an authenticator app like Authy, Google Authenticator, or
              1Password to scan the QR code below. If you can't scan the code,
              you can enter the code manually.
            </p>
            <div className="w-[30%] my-6">
              {qrCodeData ? (
                <QRCodeSVG
                  value={qrCodeData}
                  className="w-full h-auto border rounded-md"
                />
              ) : (
                <p>Generating QR code...</p>
              )}
            </div>
            <div className="pb-2">
              <h4 className="mt-1 text-base font-thin">
                Or enter the code manually
              </h4>
            </div>
            <div className="flex items-center justify-center w-[60%] gap-2">
              <Input value={userinfo.secret} />
                <Button variant="ghost" size="icon" type="button">
                  <CopyIcon />
                </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
              <div>
                <label htmlFor="code" className="block mt-4 text-sm">
                  Enter the 6-digit code
                </label>
                <Input
                  type="text"
                  placeholder="Enter the 6-digit code"
                  className="mt-4"
                  {...register("code")}
                />
                {errors.code && (
                  <p className="text-red-500">{errors.code.message}</p>
                )}
              </div>
              <Button size="lg" type="submit" className="mt-6">
                Enable Two-factor Authentication
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Configure2FA;

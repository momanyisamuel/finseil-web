import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUp2FA } from "@/store/usersSlice";
import Manage2FA from "./Manage2FA";
type Enable2FAProps = object;

const Enable2FA: FC<Enable2FAProps> = () => {
 const user = useAppSelector((state) => state.auth.user);
  const [step, setStep] = useState(1);
  const dispatch = useAppDispatch();
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

  const get2FAQRCode = async () => {
    console.log(user);
    const response = await dispatch(setUp2FA({ id: user.id }));
    console.log(response.payload);
    setStep(2);
  }
  
  return (
    <div>
      {step === 1 && (
        <Card x-chunk="dashboard-04-chunk-1">
          <CardHeader>
            <CardTitle>Enable Two Factor Authentication</CardTitle>
            <CardDescription>
              Add an extra layer of security to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-muted-foreground">
                Two-factor authentication (2FA) adds an extra layer of security
                to your account. Once enabled, you will be required to enter a
                unique code sent to your phone or email when you sign in.
              </p>
            </div>
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => get2FAQRCode()}
              >
                Enable Two Factor Authentication
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      {step === 2 && (
        <>
          <Manage2FA />
        </>
      )}
    </div>
  );
};

export default Enable2FA;

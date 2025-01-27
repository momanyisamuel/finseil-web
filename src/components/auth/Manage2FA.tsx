import { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Mail, MessageSquareMore, Smartphone } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUser } from "@/store/usersSlice";
import Configure2FA from "./Configure2FA";
import FormDialog from "../layout/form-dialog";

type Manage2FAProps = object;

const Manage2FA: FC<Manage2FAProps> = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAppEnabled, setIsAppEnabled] = useState(false);

  useEffect(() => {
    if (isAppEnabled) {
      setIsDialogOpen(false);
    }
  }, [isAppEnabled]);

  const enable = (method: string) => {
    console.log("Enabling", method);
    dispatch(
      updateUser({ id: user.id, user: { ...user, two_fa_method: method } })
    );
    window.location.href = "/settings"
  };

  const disable = (method: string) => {
    console.log("Disabling", method);
    if (method === "app") {
      dispatch(
        updateUser({ id: user.id, user: { ...user, two_fa_method: "" } })
      );
    }
  };

  const disable2FA = () => {
    console.log("Disabling 2FA");
    dispatch(
      updateUser({
        id: user.id,
        user: { ...user, two_fa_method: "", two_fa_enabled: false },
      })
    );
  };

  return (
    <div>
      <div>
        <div className="flex justify-between pb-4 border-b border-gray-200">
          <h3>Two-factor authentication</h3>
          <Button
            variant="outline"
            size="sm"
            className="text-green-800 border-green-200 rounded-md"
          >
            Enabled
          </Button>
        </div>
        <div className="pt-4 mb-4">
          <p className="text-sm text-muted-foreground">
            Two-factor authentication adds an extra layer of security to your
            account. Once enabled, you will be required to enter a unique code
            in addition to your password when signing in.
          </p>
        </div>
        
      </div>

      <div className="flex flex-col gap-4 border border-gray-200 rounded-md">
        <div className="px-4 py-4 border-b border-gray-200 bg-slate-200">
          <h4 className="text-sm font-semibold">Two-factor methods</h4>
        </div>
        <div className="flex justify-between px-4 py-4 border-b border-gray-200">
          <div className="flex items-start gap-4">
            <Smartphone size={24} />
            <div>
              <h4 className="text-sm font-semibold">
                <span>Authenticator app</span>
                {user.two_fa_method === "app" && (
                  <span>
                    <h4 className="px-2 ml-2 text-sm font-semibold text-green-800 border border-green-200 rounded-lg">
                      enabled
                    </h4>
                  </span>
                )}
              </h4>
              <p className="text-sm text-muted-foreground">
                Use an authentication app or browser extension to get two-factor
                authentication codes when prompted.
              </p>
            </div>
          </div>
          <div>
            {user.two_fa_method === "app" ? (
              <Button
                variant="outline"
                size="sm"
                className="text-green-800 rounded-md"
                onClick={() => disable("app")}
              >
                Disable
              </Button>
            ) : (
              <>
                <FormDialog
                    btnText="Enable"
                    isOpen={isDialogOpen}
                    setIsOpen={setIsDialogOpen}  
                    title={""}
                    className=""
                    variant={"outline"}
                  >
                  <Configure2FA
                    qrCodeData={user.otp_uri}
                    userinfo={{ secret: user.otp_secret }}
                    onCopyText={() => {}}
                    setEnabled={setIsAppEnabled}
                    setIsOpen={setIsDialogOpen}
                    enableAuthApp={() => enable("app")}
                  />
                </FormDialog>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-between px-4 py-4 border-b border-gray-200">
          <div className="flex items-start gap-4">
            <MessageSquareMore size={24} />
            <div>
              <h4 className="flex items-start text-sm font-semibold">
                <span>SMS/Text message</span>
                {user.two_fa_method === "finseil_mobile" && (
                  <span>
                    <h4 className="px-2 ml-2 text-sm font-semibold text-green-800 border border-green-200 rounded-lg">
                      enabled
                    </h4>
                  </span>
                )}
              </h4>
              <p className="text-sm text-muted-foreground">
                Get one-time codes sent to your phone via SMS to complete
                authentication requests.
              </p>
            </div>
          </div>
          <div>
            {user.two_fa_method === "finseil_mobile" ? (
              <Button
                variant="outline"
                size="sm"
                className="text-green-800 rounded-md"
                onClick={() => disable("finseil_mobile")}
              >
                Disable
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-gray-500 rounded-md"
                onClick={() => enable("finseil_mobile")}
              >
                Enable
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-between px-4 py-4">
          <div className="flex items-start gap-4">
            <Mail size={24} />
            <div>
              <h4 className="flex items-start text-sm font-semibold">
                <span>Email</span>
                {user.two_fa_method === "email" && (
                  <span>
                    <h4 className="px-2 ml-2 text-sm font-semibold text-green-800 border border-green-200 rounded-lg">
                      enabled
                    </h4>
                  </span>
                )}
              </h4>
              <p className="text-sm text-muted-foreground">
                Get one-time codes sent to your email address to complete
                authentication requests.
              </p>
            </div>
          </div>
          <div>
            {user.two_fa_method === "email" ? (
              <Button
                variant="outline"
                size="sm"
                className="text-green-800 rounded-md"
                onClick={() => disable("email")}
              >
                Disable
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-gray-500 rounded-md"
                onClick={() => enable("email")}
              >
                Enable
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
     
        <div className="flex flex-col gap-4 p-4 mb-4 border border-gray-200 rounded-md">
          <h4 className="text-sm font-semibold">Disable 2FA</h4>
          <p className="text-sm text-muted-foreground">
            Disabling two-factor authentication will make your account less
            secure. Are you sure you want to disable it?
          </p>
          <Button
            variant="outline"
            size="sm"
            className="text-red-800 border-red-200 rounded-md"
            onClick={disable2FA}
          >
            Disable two-factor authentication
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Manage2FA;

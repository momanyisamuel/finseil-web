import { FC, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRoles } from "@/store/rolesSlice";
import Enable2FA from "@/components/auth/Enable2FA";
import Profile from "./Profile";
import Manage2FA from "@/components/auth/Manage2FA";

type SettingsProps = object;

const Settings: FC<SettingsProps> = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);

  console.log(user);
  

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  return (
    <div>
      <div className="flex flex-col w-full min-h-screen">
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
          <div className="grid w-full max-w-6xl gap-2 mx-auto">
            <h1 className="text-3xl font-semibold">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings & preferences.
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <nav
              className="grid gap-4 text-sm text-muted-foreground"
              x-chunk="dashboard-04-chunk-0"
            >
              <Link
                to="#"
                className={step === 1 ? `font-semibold text-primary` : ``}
                onClick={() => setStep(1)}
              >
                Public Profile
              </Link>
              <Link
                to="#"
                className={step === 2 ? `font-semibold text-primary` : ``}
                onClick={() => setStep(2)}
              >
                Password and authentication
              </Link>
              <Link
                to="#"
                className={step === 3 ? `font-semibold text-primary` : ``}
                onClick={() => setStep(3)}
              >
                Security log
              </Link>
              <Link
                to="#"
                className={step === 4 ? `font-semibold text-primary` : ``}
                onClick={() => setStep(4)}
              >
                Intergrations
              </Link>
              {/* <Link to="#">Organizations</Link>
              <Link to="#">Advanced</Link> */}
            </nav>
            <div className="grid gap-6">
              {step === 1 && <Profile />}
              {step === 2 && (<div>
                {user?.two_fa_enabled ? <Manage2FA/> : <Enable2FA />}
              </div>)}
              </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;

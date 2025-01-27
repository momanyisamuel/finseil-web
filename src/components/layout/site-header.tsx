import Navigation from "./navigation";
import UserNav from "./user-nav";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { getLoggedInUser } from "@/store/authSlice";
import { decodeToken } from "@/lib/helpers";
import { User } from "@/store/types";
import LogoWhite from "./logo-white";
import Logo from "./logo";

const SiteHeader = () => {
  const router = useNavigate();
  const user = useAppSelector((state: { auth: { user: User; }; }) => state.auth.user);
  const userDetails = localStorage.getItem("access") as string;
  const decodedUser = decodeToken(userDetails)
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(getLoggedInUser(decodedUser?.user_id as string));
  }, []);
  
  return (
    <>
      <div className="text-gray-200 border-b shadow-sm bg-[#9167C6] dark:bg-background dark:border-b-gray-500 dark:text-gray-200">
        <div className="flex items-center h-16 px-4">
          <div className="flex items-center pr-2">
            <div className="flex items-center w-full h-8 bg-center bg-cover" onClick={() => router("/dashboard")}>
            {theme === "dark" ? <LogoWhite className="w-full" /> : <Logo className="w-full" />}
            </div>
          </div>
          <Navigation
            className="mx-6"
            user={{
              id: user.id,
              role: user.role as "ADMIN" | "AGENT" | "MANAGER",
            }}
          />
          <div className="flex items-center gap-2 ml-auto">
            <UserNav />
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteHeader;

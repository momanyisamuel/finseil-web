import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/layout/ThemeProvider";
import LogoWhite from "@/components/layout/logo-white";
import Logo from "@/components/layout/logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  subtitle: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, className, title, subtitle, ...props }) => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 min-h-svh bg-muted md:p-10">
      <div className="flex flex-col w-full max-w-sm gap-6">
        <a href="#" className="flex items-center self-center gap-2 font-medium">
          <div className="">
          {theme === "dark" ? <LogoWhite className="w-24 mb-3" /> : <Logo className="w-24 mb-3" />}
          </div>
        </a>
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

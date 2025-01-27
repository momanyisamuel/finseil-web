import { FC } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { hasPermission, Role } from "@/page/auth/permission";

interface NavigationProps {
  className?: string;
  user: { id: string; role: Role };
}

const Navigation: FC<NavigationProps> = ({ className, user }) => {
  console.log(user, "user");
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <Link
        to="/dashboard"
        className="text-base font-normal transition-colors hover:text-[#818daf]"
      >
        Dashboard
      </Link>
      {
        hasPermission(user, "view:leads") && (
          <Link
          to="/leads"
          className="text-base font-normal transition-colors hover:text-[#818daf]"
        >
          Leads
        </Link>
        )
      }
      {
        hasPermission(user, "view:agents") && (
          <Link
        to="/agents"
        className="text-base font-normal transition-colors hover:text-[#818daf]"
      >
        Agents
      </Link>
        )
      }
      {
        hasPermission(user, "view:settings") && (
          <Link
        to="/settings"
        className="text-base font-normal transition-colors hover:text-[#818daf]"
      >
        Settings
      </Link>
        )
      }
    </nav>
  );
};

export default Navigation;

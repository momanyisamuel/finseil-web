import { FC } from "react";
import { UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { logoutUser } from "@/lib/utils";
// import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { toast } from "sonner";

type UserNavProps = object;

const UserNav: FC<UserNavProps> = () => {


  const handleLogout = async() => {
    // Implement actual logout logic here
    const result = await logoutUser();
    if (result) {
      toast.success("Logout successful");
      // remove token and refresh token from local storage
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      // navigate to login
      window.location.href = "/";
    }
  }
  
  return (
    <div className="flex items-center justify-center gap-2">
      <div>
        <ModeToggle />
      </div>
      <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden bg-[#9167C6] text-white rounded-full hover:bg-purple-700"
          >
            <UserIcon
              width={24}
              height={24}
              className="overflow-hidden bg-[#9167C6] text-white rounded-full hover:bg-purple-700"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
          >Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </div>
  );
};

export default UserNav;

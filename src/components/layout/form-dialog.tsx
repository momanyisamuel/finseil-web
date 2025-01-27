import { FC, JSX, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
// import { Button } from "./ui/button";

interface FormDialogProps {
  children: ReactNode;
  btnText: string;
  btnIcon?: JSX.Element
  title?: string | null;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null;
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const FormDialog: FC<FormDialogProps> = ({ children, btnText, title, isOpen, setIsOpen, btnIcon, variant, className }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger 
      className=""
      >
        <Button variant={variant} size="sm" className={className}>
        <span>{btnIcon}</span>
        <span>
        {btnText}
        </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        {title && (<DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
        </DialogHeader>)}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
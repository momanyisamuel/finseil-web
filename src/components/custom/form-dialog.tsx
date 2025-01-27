import { FC, JSX, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Button } from "./ui/button";

interface FormDialogProps {
  children: ReactNode;
  btnText: string;
  btnIcon?: JSX.Element
  title:string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const FormDialog: FC<FormDialogProps> = ({ children, btnText, title, isOpen, setIsOpen, btnIcon }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="inline-flex items-center justify-center w-full h-10 gap-3 px-4 py-2 text-sm font-medium transition-colors border rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground">
        <span>{btnIcon}</span>
        <span>
        {btnText}
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
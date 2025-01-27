import { FC, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  

import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils';

interface ConfirmDialogProps {
    handleDeletion: () => void;
    styles: string;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({ handleDeletion, styles }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleConfirmDeletion = () => {
        console.log("Confirm Deletion");
        handleDeletion();
        setIsOpen(false);
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"  size="sm" className={`rounded-none text-red-400 ${cn(styles)}`}>Delete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this item? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2">
                    <Button variant="secondary" onClick={()=> setIsOpen(false)} >Cancel</Button>
                    <Button variant="destructive" onClick={handleConfirmDeletion}>
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmDialog
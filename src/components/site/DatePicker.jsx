import { cn } from "@app/lib/utils.js";
import Container from "@app/ui/Container.jsx";
import { Calendar } from "@components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import MotionButton from "@components/application/MotionButton.jsx";
import { Button } from "@components/ui/button.jsx";

const DatePicker = ({ value, onChange, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "text-foreground/60 w-full justify-between font-normal",
              {
                "text-foreground": value,
              },
            )}
          >
            {value ? value.toLocaleDateString() : "Select date"}
            <ChevronDownIcon size={15} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            {...props}
            mode="single"
            selected={value}
            captionLayout="dropdown"
            fromYear={new Date().getFullYear()}
            toYear={new Date().getFullYear() + 1}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </Container>
  );
};

export default DatePicker;

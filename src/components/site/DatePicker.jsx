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

const DatePicker = ({ value, onChange, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id="date"
            className={cn(
              "hover:bg-accent hover:text-accent-foreground/ dark:hover:bg-accent/50 focus:ring-ring focus:ring-offset-background flex w-full items-center justify-between rounded-md border px-3 py-2 font-normal focus:ring-2 focus:ring-offset-2 focus:outline-none",
              { "text-foreground": value, "text-foreground/50": !value },
            )}
          >
            {value ? value.toLocaleDateString() : "Select date"}
            <ChevronDownIcon size={15} />
          </button>
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

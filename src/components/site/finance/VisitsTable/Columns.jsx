import MotionButton from "@app/components/application/MotionButton.jsx";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@app/components/ui/dialog.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@app/components/ui/dropdown-menu.jsx";
import { cn } from "@app/lib/utils.js";
import Container from "@ui/Container.jsx";
import { ArrowUpDown } from "lucide-react";
import { BiClipboard, BiDotsHorizontal } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import VisitDetails from "../../VisitDetails.jsx";

const visitsTableColumns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <MotionButton
        variant="ghost"
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 1 }}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className={cn("p-0!")}
      >
        Visit ID
        <ArrowUpDown />
      </MotionButton>
    ),
  },
  {
    accessorKey: "doctor",
    header: "Doctor",
  },
  {
    accessorKey: "patient",
    header: "Patient Name",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "treatments",
    header: "Treatments",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <MotionButton
        variant="ghost"
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 1 }}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className={cn("p-0!")}
      >
        Amount
        <ArrowUpDown />
      </MotionButton>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <Container className="font-medium">{formattedAmount}</Container>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const visit = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MotionButton
              variant="ghost"
              className={cn("aspect-square w-8 p-0")}
              whileHover={{ color: "#2249d9" }}
            >
              <span className={cn("sr-only")}>Open menu</span>
              <BiDotsHorizontal />
            </MotionButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={cn("w-40")}>
            <DropdownMenuLabel>Actions for Visit {visit.id}</DropdownMenuLabel>
            <DropdownMenuItem
              className={cn("flex flex-row justify-between")}
              onClick={() => navigator.clipboard.writeText(visit.id)}
            >
              Copy Visit ID
              <BiClipboard />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <Dialog>
                <DialogTrigger
                  asChild
                  className={cn("flex flex-row items-center gap-3")}
                >
                  <span>
                    View Visit Details
                    <BsEye />
                  </span>
                </DialogTrigger>
                <DialogContent>
                  <VisitDetails visit={visit} />
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export { visitsTableColumns };

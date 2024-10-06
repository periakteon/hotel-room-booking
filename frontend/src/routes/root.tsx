import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();

  const [date, setDate] = useState<Date>();
  const [backgroundAngle, setBackgroundAngle] = useState(0);

  const handleSearch = () => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";

    console.log("Search with:", {
      date: formattedDate,
    });

    navigate(`/list?givenDate=${formattedDate}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundAngle((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div
          className="absolute inset-0 transition-colors duration-500 ease-in-out"
          style={{
            background: `linear-gradient(${backgroundAngle}deg, #64748b, #94a3b8, #e2e8f0)`,
          }}
        />
        <div className="absolute inset-0 opacity-50 mix-blend-soft-light"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-25"></div>
      </div>
      <div className="relative z-10 text-center mb-8">
        <motion.h1
          className="max-w-3xl bg-gradient-to-br from-white to-gray-300 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Find Your Perfect Stay
        </motion.h1>
      </div>
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white bg-opacity-70 backdrop-blur-md rounded-xl shadow-lg animate-fade-in">
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="availableDate"
              className="text-sm font-medium text-gray-700"
            >
              Available Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="availableDate"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  aria-label="Select available date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  disabled={{ before: new Date() }}
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Button className="w-full" onClick={handleSearch}>
          Search Hotels
        </Button>
      </div>
    </div>
  );
}

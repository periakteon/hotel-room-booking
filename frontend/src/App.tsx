import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

export default function Component() {
  const [date, setDate] = useState<Date>();
  const [heroText, setHeroText] = useState("");

  const fullText = "Find Your Perfect Stay";

  useEffect(() => {
    let index = 0;
    let pause = false;

    const intervalId = setInterval(() => {
      if (!pause) {
        setHeroText(fullText.slice(0, index));
        index++;
        if (index > fullText.length) {
          pause = true;
          setTimeout(() => {
            index = 0;
            pause = false;
          }, 3000);
        }
      }
    }, 200);

    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = () => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";

    console.log("Search with:", {
      date: formattedDate,
    });
    // TODO: API request
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-300 via-slate-500 to-slate-700"></div>
        <div className="absolute inset-0 opacity-50 mix-blend-soft-light"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-25"></div>
      </div>
      <div className="relative z-10 text-center mb-8">
        <h1
          className="text-4xl font-bold text-white mb-4 min-h-[48px]"
          aria-live="polite"
        >
          {heroText}
        </h1>
      </div>
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg animate-fade-in">
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

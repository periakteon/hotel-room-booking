"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useRooms from "@/hooks/useRooms";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import API from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

export default function ListRooms() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const searchParams = useSearchParams();
  const givenDate = searchParams.get("givenDate");

  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<Date | undefined>(
    givenDate ? new Date(givenDate) : undefined
  );

  const { data: rooms, isLoading: loading } = useRooms({
    givenDate: date ? format(date, "yyyy-MM-dd") : null,
  });

  const roomsPerPage = 20;

  async function handleReservation({ roomId }: { roomId: string }) {
    try {
      const response = await API.post(`/booking/create/${roomId}`, {
        date: date ? format(date, "yyyy-MM-dd") : "",
      });

      if (response.status === 403) {
        toast.error("Only authenticated users can make reservations");
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Reservation made successfully");
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
      }

      toast.error("Failed to make reservation");
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const totalPages = rooms ? Math.ceil(rooms.length / roomsPerPage) : 0;

  const currentRooms = rooms?.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <div className="container mx-auto p-4">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Available Rooms {rooms && `(${rooms.length})`}
      </motion.h1>
      <div className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white bg-opacity-70 backdrop-blur-md rounded-xl animate-fade-in"
        >
          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="availableDate"
                  variant={"outline"}
                  className={cn(
                    "flex-1 justify-start text-left font-normal",
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
                  onSelect={(date) => {
                    setDate(date);

                    void router.push(
                      `/list?givenDate=${
                        date ? format(date, "yyyy-MM-dd") : ""
                      }`
                    );
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {loading && <SkeletonLoading />}
        {!loading && rooms?.length === 0 && (
          <motion.div
            variants={item}
            className="absolute inset-0 flex justify-center items-center text-center text-lg mt-4"
          >
            <span className="block mb-4">No rooms available</span>
          </motion.div>
        )}
        {!loading &&
          rooms &&
          currentRooms?.map((room) => (
            <motion.div key={room._id} variants={item}>
              <Card className="w-full h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span className="text-lg">{room.name}</span>
                    <Badge
                      variant={
                        room.type === "suite"
                          ? "destructive"
                          : room.type === "premium"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {room.type === "suite"
                        ? "suite"
                        : room.type === "premium"
                        ? "Premium"
                        : "Basic"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  {/* <div className="relative h-[200px] mb-4">
                      <img
                        src="https://g-yncsazhgufb.vusercontent.net/placeholder.svg"
                        alt={room.name}
                        className="rounded-md"
                      />
                    </div> */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-primary">
                      ${room.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      per night
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Room {room.roomNumber}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Available Dates ({room.availableDates.length}):
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {room.availableDates.map((date, index) => (
                      <span key={index} className="mr-2">
                        {date}
                      </span>
                    ))}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => handleReservation({ roomId: room._id })}
                    disabled={!room.isAvailable}
                  >
                    {room.isAvailable ? "Make Reservation" : "Not Available"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
      </motion.div>
      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

function SkeletonLoading() {
  return Array.from({ length: 20 }).map((_, index) => (
    <Card key={index} className="w-full">
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[200px] w-full mb-4" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  ));
}

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
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Hotel = {
  name: string;
  type: string;
  price: number;
  availableDates: string[];
  roomNumber: number;
  isAvailable: boolean;
};

export default function ListRooms() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const date = searchParams.get("givenDate");

  const roomsPerPage = 20;

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const generatedHotels = Array.from({ length: 50 }, (_, i) => ({
        name: `Hotel Room ${i + 1}`,
        type: ["basic", "premium", "luxury"][Math.floor(Math.random() * 3)],
        price: Math.floor(Math.random() * 1000) + 100,
        availableDates: ["2024-12-10", "2024-12-11", "2024-12-12"],
        roomNumber: i + 1,
        isAvailable: Math.random() > 0.2,
      }));
      setHotels(generatedHotels);
      setLoading(false);
      toast.success("Rooms loaded successfully");
    }, 2000);
  }, []);

  const handleReservation = (hotel: Hotel) => {
    console.log(`Reservation made for ${hotel.name}`);
    // TODO: Implement reservation logic
  };

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
  const currentRooms = hotels.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(hotels.length / roomsPerPage);

  return (
    <div className="container mx-auto p-4">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Available Rooms
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {loading
          ? Array.from({ length: 20 }).map((_, index) => (
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
            ))
          : currentRooms.map((hotel, index) => (
              <motion.div key={index} variants={item}>
                <Card className="w-full h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span className="text-lg">{hotel.name}</span>
                      <Badge
                        variant={
                          hotel.type === "luxury"
                            ? "destructive"
                            : hotel.type === "premium"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {hotel.type === "luxury"
                          ? "Luxury"
                          : hotel.type === "premium"
                          ? "Premium"
                          : "Basic"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {/* <div className="relative h-[200px] mb-4">
                      <img
                        src="https://g-yncsazhgufb.vusercontent.net/placeholder.svg"
                        alt={hotel.name}
                        className="rounded-md"
                      />
                    </div> */}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold text-primary">
                        ${hotel.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        per night
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Room {hotel.roomNumber}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Available Dates:{" "}
                      {hotel.availableDates.map((date) => (
                        <span key={date} className="mr-2">
                          {date}
                        </span>
                      ))}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => handleReservation(hotel)}
                      disabled={!hotel.isAvailable}
                    >
                      {hotel.isAvailable ? "Make Reservation" : "Not Available"}
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

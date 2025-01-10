import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  Calendar,
  MapPin,
  Clock,
  Gift,
  Youtube,
  Info,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 4;

// Platform configuration
const COMPANY_CONFIG = {
  Google: {
    color: "border-blue-200 hover:border-blue-300 bg-blue-50/50",
    badge: "bg-blue-100 text-blue-700",
    icon: "/google.svg",
  },
  Meta: {
    color: "border-indigo-200 hover:border-indigo-300 bg-indigo-50/50",
    badge: "bg-indigo-100 text-indigo-700",
    icon: "/meta.svg",
  },
  Amazon: {
    color: "border-orange-200 hover:border-orange-300 bg-orange-50/50",
    badge: "bg-orange-100 text-orange-700",
    icon: "/amazon.svg",
  },
  Apple: {
    color: "border-gray-200 hover:border-gray-300 bg-gray-50/50",
    badge: "bg-gray-100 text-gray-700",
    icon: "/apple.svg",
  },
  Netflix: {
    color: "border-red-200 hover:border-red-300 bg-red-50/50",
    badge: "bg-red-100 text-red-700",
    icon: "/netflix.svg",
  },
};

const EventItem = ({ event, onClick }) => (
  <div
    onClick={onClick}
    className={cn(
      "group border rounded-xl transition-all duration-200",
      "hover:shadow-md cursor-pointer",
      COMPANY_CONFIG[event.Company]?.color ||
        "border-gray-200 hover:border-gray-300 bg-gray-50/50"
    )}
  >
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium w-fit",
                COMPANY_CONFIG[event.Company]?.badge || "bg-gray-100 text-gray-700"
              )}
            >
              {event.Company}
            </span>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 leading-tight">
              {event["Event Name"]}
            </h3>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            {event.Time}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {event.Venue}
          </div>
        </div>

        <div className="hidden sm:flex items-center self-center">
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
    </div>
  </div>
);

const EventDialog = ({ event, onClose }) => (
  <Dialog open={!!event} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-2xl">
      {event && (
        <>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {event["Event Name"]}
            </DialogTitle>
            <div
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium w-fit mt-2",
                COMPANY_CONFIG[event.Company]?.badge || "bg-gray-100 text-gray-700"
              )}
            >
              {event.Company}
            </div>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-3" />
              <span>{event.Time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-3" />
              <span>{event.Venue}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Info className="w-5 h-5 mr-3" />
              <span>{event["Stacks Needed"]}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Gift className="w-5 h-5 mr-3" />
              <span>{event.Rewards}</span>
            </div>
            {event["YT Related"] && (
              <div className="flex items-center text-gray-600">
                <Youtube className="w-5 h-5 mr-3" />
                <span>{event["YT Related"]}</span>
              </div>
            )}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">{event["About"]}</p>
            </div>
            {event["Website Link"] && (
              <Button
                className="w-full mt-4"
                onClick={() => window.open(event["Website Link"], "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Event Website
              </Button>
            )}
          </div>
        </>
      )}
    </DialogContent>
  </Dialog>
);

const Events = () => {
  const [eventsData, setEventsData] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [category, setCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    Papa.parse("/MAANG_events.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setEventsData(result.data);
        setFilteredEvents(result.data);
        setLoading(false);
      },
    });
  }, []);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    if (selectedCategory === "All") {
      setFilteredEvents(eventsData);
    } else {
      setFilteredEvents(
        eventsData.filter((event) => event.Company === selectedCategory)
      );
    }
  };

  const totalEvents = filteredEvents.length;
  const totalPages = Math.ceil(totalEvents / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(
        <PaginationItem key="1">
          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pages.push(
          <PaginationItem key="ellipsis-1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <PaginationItem key="ellipsis-2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-semibold">Tech Events</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Companies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Companies</SelectItem>
              {Object.keys(COMPANY_CONFIG).map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/events")}
          >
            View All
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        </div>
      ) : (
        <div className="space-y-4">
          {currentEvents.length > 0 ? (
            <div className="space-y-4">
              {currentEvents.map((event, index) => (
                <EventItem
                  key={index}
                  event={event}
                  onClick={() => setSelectedEvent(event)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
              No events found for the selected company.
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent className="flex flex-wrap justify-center gap-2">
                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className="hidden sm:flex"
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>

                  <div className="flex flex-wrap justify-center gap-1">
                    {renderPaginationNumbers()}
                  </div>

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className="hidden sm:flex"
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              <div className="text-center text-sm text-gray-600 mt-4">
                Showing {startIndex + 1} to {Math.min(endIndex, totalEvents)} of{" "}
                {totalEvents} events
              </div>
            </div>
          )}
        </div>
      )}

      <EventDialog
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default Events;
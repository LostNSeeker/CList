import { useEffect, useState } from "react";
import axios from "axios";
import {
	Calendar,
	Clock,
	ExternalLink,
	Loader2,
	Timer,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/Components/ui/pagination";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 4;

const PaginationButton = ({ onClick, disabled, className, children }) => (
	<button
		onClick={onClick}
		disabled={disabled}
		className={cn(
			"h-9 px-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors",
			"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
			"disabled:pointer-events-none disabled:opacity-50",
			disabled
				? "text-gray-400 cursor-not-allowed"
				: "hover:bg-accent hover:text-accent-foreground",
			className
		)}
	>
		{children}
	</button>
);

const Contests = () => {
	const [upcomingContests, setUpcomingContests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedPlatform, setSelectedPlatform] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchContests = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_APP_BACKEND_URL}/api/contests/upcoming`
				);
				const data = response.data.contests;
				setUpcomingContests(data);
			} catch (error) {
				console.error("Error fetching contests:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchContests();
	}, []);

	// Reset to first page when platform changes
	useEffect(() => {
		setCurrentPage(1);
	}, [selectedPlatform]);

	const platformConfig = {
		"codeforces.com": {
			name: "CodeForces",
			icon: "/code-forces.svg",
			class: "bg-blue-50/50 border-blue-100 hover:bg-blue-50",
		},
		"codechef.com": {
			name: "CodeChef",
			icon: "/codechef-svgrepo-com.svg",
			class: "bg-orange-50/50 border-orange-100 hover:bg-orange-50",
		},
		"atcoder.jp": {
			name: "AtCoder",
			icon: "/atCoder.svg",
			class: "bg-gray-50/50 border-gray-100 hover:bg-gray-50",
		},
		"leetcode.com": {
			name: "LeetCode",
			icon: "/leetcode.svg",
			class: "bg-yellow-50/50 border-yellow-100 hover:bg-yellow-50",
		},
		"geeksforgeeks.org": {
			name: "GeeksforGeeks",
			icon: "/gfg.svg",
			class: "bg-green-50/50 border-green-100 hover:bg-green-50",
		},
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleString("en-US", {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const formatDuration = (minutes) => {
		if (minutes >= 60) {
			const hours = Math.floor(minutes / 60);
			const remainingMinutes = minutes % 60;
			return `${hours} ${hours === 1 ? "hour" : "hours"}${
				remainingMinutes > 0 ? ` ${remainingMinutes} mins` : ""
			}`;
		}
		return `${minutes} mins`;
	};

	const filteredContests =
		selectedPlatform === "all"
			? upcomingContests
			: upcomingContests.filter((contest) =>
					contest.resource.includes(selectedPlatform)
			  );

	// Pagination calculations
	const totalPages = Math.ceil(filteredContests.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedContests = filteredContests.slice(
		startIndex,
		startIndex + ITEMS_PER_PAGE
	);

	const handlePageChange = (page) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// Update the renderPagination function:
	const renderPagination = () => {
		const pages = [];
		const maxVisiblePages = 3; // Reduced for better mobile view

		let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
		let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

		// Adjust start page if we're near the end
		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}

		// Add first page if not included in range
		if (startPage > 1) {
			pages.push(
				<PaginationItem key="1">
					<PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
				</PaginationItem>
			);
			if (startPage > 2) {
				pages.push(
					<PaginationItem key="ellipsis-1">
						<span className="px-4 py-2">...</span>
					</PaginationItem>
				);
			}
		}

		// Add pages in range
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

		// Add last page if not included in range
		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				pages.push(
					<PaginationItem key="ellipsis-2">
						<span className="px-4 py-2">...</span>
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

	// Replace the Pagination section with:
	{
		totalPages > 1 && (
			<div className="flex justify-center pt-6">
				<Pagination>
					<PaginationContent className="flex items-center gap-1">
						<PaginationItem>
							<PaginationButton
								onClick={() => handlePageChange(1)}
								disabled={currentPage === 1}
								className="gap-1"
							>
								<ChevronLeft className="h-4 w-4" />
								<ChevronLeft className="h-4 w-4 -ml-2" />
							</PaginationButton>
						</PaginationItem>
						<PaginationItem>
							<PaginationButton
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
							>
								<ChevronLeft className="h-4 w-4 mr-1" />
								Previous
							</PaginationButton>
						</PaginationItem>

						{renderPagination()}

						<PaginationItem>
							<PaginationButton
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
							>
								Next
								<ChevronRight className="h-4 w-4 ml-1" />
							</PaginationButton>
						</PaginationItem>
						<PaginationItem>
							<PaginationButton
								onClick={() => handlePageChange(totalPages)}
								disabled={currentPage === totalPages}
								className="gap-1"
							>
								<ChevronRight className="h-4 w-4" />
								<ChevronRight className="h-4 w-4 -ml-2" />
							</PaginationButton>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[300px]">
				<Loader2 className="w-8 h-8 animate-spin text-primary" />
			</div>
		);
	}

	return (
		<div className="w-full max-w-3xl mx-auto px-4">
			<div className="space-y-4">
				{/* Header Section */}
				<div className="flex flex-col gap-4">
					<h2 className="text-xl font-semibold">Upcoming Contests</h2>
					<div className="flex flex-col sm:flex-row gap-3 w-full">
						<Select
							value={selectedPlatform}
							onValueChange={setSelectedPlatform}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="All Platforms" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Platforms</SelectItem>
								{Object.entries(platformConfig).map(([key, value]) => (
									<SelectItem
										key={key}
										value={key}
										className="flex items-center gap-2"
									>
										<img
											src={value.icon}
											alt={value.name}
											className="w-4 h-4"
										/>
										{value.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Button
							variant="outline"
							onClick={() => (window.location.href = "/contests")}
							className="w-full sm:w-auto whitespace-nowrap"
						>
							View All
						</Button>
					</div>
				</div>

				{/* Contests List */}
				<div className="space-y-3">
					{paginatedContests.length > 0 ? (
						<>
							{paginatedContests.map((contest) => (
								<div
									key={contest.id}
									className={cn(
										"relative border rounded-xl p-4 transition-all duration-200",
										"hover:shadow-md",
										platformConfig[contest.resource]?.class
									)}
								>
									{/* Contest Header */}
									<div className="flex items-start gap-3 mb-3">
										<img
											src={platformConfig[contest.resource]?.icon}
											alt={platformConfig[contest.resource]?.name}
											className="w-6 h-6 object-contain flex-shrink-0"
										/>
										<div className="flex-1 min-w-0">
											<h3 className="font-medium text-sm sm:text-base line-clamp-2">
												{contest.event}
											</h3>
										</div>
									</div>

									{/* Contest Details */}
									<div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-600">
										<div className="flex items-center gap-1.5">
											<Calendar className="w-4 h-4" />
											{formatDate(contest.start)}
										</div>
										<div className="hidden sm:block text-gray-300">•</div>
										<div className="flex items-center gap-1.5">
											<Timer className="w-4 h-4" />
											{formatDuration(contest.duration)}
										</div>

										<div className="sm:ml-auto">
											<Button
												variant="ghost"
												size="sm"
												className="h-8 px-3 hover:bg-gray-100"
												onClick={() => window.open(contest.href, "_blank")}
											>
												<ExternalLink className="w-4 h-4 mr-2" />
												Open
											</Button>
										</div>
									</div>
								</div>
							))}

							{/* Pagination */}
							{totalPages > 1 && (
								<Pagination className="pt-4">
									<PaginationContent>
										<PaginationItem>
											<PaginationPrevious
												onClick={() => handlePageChange(currentPage - 1)}
												disabled={currentPage === 1}
											/>
										</PaginationItem>

										{renderPagination()}

										<PaginationItem>
											<PaginationNext
												onClick={() => handlePageChange(currentPage + 1)}
												disabled={currentPage === totalPages}
											/>
										</PaginationItem>
									</PaginationContent>
								</Pagination>
							)}
						</>
					) : (
						<div className="text-center py-12 text-gray-500 bg-gray-50/50 rounded-lg">
							No upcoming contests for the selected platform.
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Contests;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	Home,
	Trophy,
	Calendar,
	History,
	ChevronRight,
	ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "@/Components/ui/tooltip";
import { Button } from "@/Components/ui/button";

const LeftNav = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const location = useLocation();

	const menuItems = [
		{ path: "/", name: "Home", icon: Home },
		{ path: "/contests", name: "Contests", icon: Trophy },
		{ path: "/events", name: "Events", icon: Calendar },
		{ path: "/solvedQuestions", name: "Solved Questions", icon: History },
	];

	return (
		<TooltipProvider delayDuration={0}>
			<div
				className={cn(
					"fixed left-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 z-40",
					"flex flex-col items-center py-8",
					isExpanded ? "w-48" : "w-16"
				)}
			>
				{/* Toggle Button */}
				<Button
					variant="ghost"
					size="icon"
					className="absolute -right-3 top-8 h-6 w-6 rounded-full bg-white shadow-md hover:bg-gray-100"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					{isExpanded ? (
						<ChevronLeft className="h-4 w-4" />
					) : (
						<ChevronRight className="h-4 w-4" />
					)}
				</Button>

				{/* Navigation Items */}
				<div className="flex flex-col items-center space-y-6 mt-8">
					{menuItems.map((item) => {
						const isActive = location.pathname === item.path;
						const Icon = item.icon;

						if (isExpanded) {
							return (
								<Link
									key={item.path}
									to={item.path}
									className={cn(
										"w-40 px-4 py-2 rounded-lg transition-all duration-200",
										"flex items-center space-x-3",
										"hover:bg-blue-50 hover:text-blue-600",
										isActive && "bg-blue-50 text-blue-600",
										!isActive && "text-gray-600"
									)}
								>
									<Icon className="h-5 w-5" />
									<span className="text-sm font-medium">{item.name}</span>
								</Link>
							);
						}

						return (
							<Tooltip key={item.path}>
								<TooltipTrigger asChild>
									<Link
										to={item.path}
										className={cn(
											"w-10 h-10 rounded-lg transition-all duration-200",
											"flex items-center justify-center",
											"hover:bg-blue-50 hover:text-blue-600",
											isActive && "bg-blue-50 text-blue-600",
											!isActive && "text-gray-600"
										)}
									>
										<Icon className="h-5 w-5" />
									</Link>
								</TooltipTrigger>
								<TooltipContent side="right" className="bg-gray-800 text-white">
									<p>{item.name}</p>
								</TooltipContent>
							</Tooltip>
						);
					})}
				</div>

				{/* Decorative Element */}
				<div className="absolute bottom-8 left-0 right-0 flex justify-center">
					<div
						className={cn(
							"h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600",
							isExpanded ? "w-32" : "w-8"
						)}
					/>
				</div>
			</div>
		</TooltipProvider>
	);
};

export default LeftNav;

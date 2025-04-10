import { useState, useEffect } from "react";
import { auth } from "../../config/firebaseConfig";
import {
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Button } from "@/Components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

const PreviousSolved = () => {
  const [activeTab, setActiveTab] = useState("codechef");
  const [solvedQuestions, setSolvedQuestions] = useState({
    codechef: [],
    leetcode: [],
    codeforces: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const questionsPerPage = 10;

  const fetchPageData = async (pageNumber) => {
    if (!auth.currentUser) {
      window.location.href = "/login";
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/api/user/getQuestionByPage?page=${pageNumber - 1}`,
        {
          headers: {
            Authorization: await auth.currentUser.getIdToken(),
          },
        }
      );
      const data = await response.json();
      setSolvedQuestions((prevState) => ({
        ...prevState,
        codechef: data.solvedQ || [],
      }));
      setMaxPage(data.maxPage || 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/getSolvedQuestions`,
          {
            headers: {
              Authorization: await auth.currentUser.getIdToken(),
            },
          }
        );
        const data = await response.json();
        setSolvedQuestions({
          codechef: data.CC.solvedQ,
          leetcode: data.LC,
          codeforces: data.CF,
        });
        setMaxPage(data.CC.maxPage);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    if (activeTab === "codechef") {
      fetchPageData(pageNumber);
    }
    setCurrentPage(pageNumber);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions =
    activeTab === "codechef"
      ? solvedQuestions[activeTab]
      : solvedQuestions[activeTab].slice(
          indexOfFirstQuestion,
          indexOfLastQuestion
        );

  const renderPageNumbers = () => {
    const totalPages =
      activeTab === "codechef"
        ? maxPage
        : Math.ceil(solvedQuestions[activeTab].length / questionsPerPage);

    const maxButtonsToShow = 5;
    const buttons = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className="w-8 h-8 p-0"
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Solved Problems</h2>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="codechef">CodeChef</TabsTrigger>
            <TabsTrigger value="leetcode">LeetCode</TabsTrigger>
            <TabsTrigger value="codeforces">CodeForces</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : currentQuestions?.length > 0 ? (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#ID</TableHead>
                  <TableHead>Problem Name</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentQuestions.map((question, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {index + 1 + (currentPage - 1) * questionsPerPage}
                    </TableCell>
                    <TableCell>{question.problemName}</TableCell>
                    <TableCell>{activeTab.toUpperCase()}</TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() =>
                          window.open(question.problemLink, "_blank")
                        }
                      >
                        Visit <ExternalLink className="ml-1 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft />
              </Button>
              {renderPageNumbers()}
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === maxPage}
              >
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(maxPage)}
                disabled={currentPage === maxPage}
              >
                <ChevronsRight />
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No solved questions available.
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousSolved;

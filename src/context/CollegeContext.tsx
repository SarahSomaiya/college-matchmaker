import React, { createContext, useContext, useState, ReactNode } from "react";
import { loadDataset } from "@/lib/loadDataset";

interface SearchParams {
  studentName: string;
  stream: string;
  exam: string;
  examScore: number;
  minBudget: number;
  maxBudget: number;
}

interface CollegeContextType {
  selectedColleges: College[];
  addToCompare: (college: College) => void;
  removeFromCompare: (collegeId: string) => void;
  clearCompare: () => void;
  isSelected: (collegeId: string) => boolean;
  searchParams: SearchParams | null;
  setSearchParams: (params: SearchParams) => void;
  searchResults: College[];
  setSearchResults: (results: College[]) => void;
  shortlist: College[];
  addToShortlist: (college: College) => void;
  removeFromShortlist: (collegeId: string) => void;
  isShortlisted: (collegeId: string) => boolean;
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined);

export function CollegeProvider({ children }: { children: ReactNode }) {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [searchResults, setSearchResults] = useState<College[]>([]);
  const [shortlist, setShortlist] = useState<College[]>(() => {
    try {
      const stored = localStorage.getItem("collegeShortlist");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  React.useEffect(() => {
    localStorage.setItem("collegeShortlist", JSON.stringify(shortlist));
  }, [shortlist]);

  const addToCompare = (college: College) => {
    if (selectedColleges.length < 5 && !selectedColleges.find((c) => c.id === college.id)) {
      setSelectedColleges([...selectedColleges, college]);
    }
  };

  const removeFromCompare = (collegeId: string) => {
    setSelectedColleges(selectedColleges.filter((c) => c.id !== collegeId));
  };

  const clearCompare = () => {
    setSelectedColleges([]);
  };

  const isSelected = (collegeId: string) => {
    return selectedColleges.some((c) => c.id === collegeId);
  };

  const addToShortlist = (college: College) => {
    if (!shortlist.find((c) => c.id === college.id)) {
      setShortlist([...shortlist, college]);
    }
  };

  const removeFromShortlist = (collegeId: string) => {
    setShortlist(shortlist.filter((c) => c.id !== collegeId));
  };

  const isShortlisted = (collegeId: string) => {
    return shortlist.some((c) => c.id === collegeId);
  };

  return (
    <CollegeContext.Provider
      value={{
        selectedColleges,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isSelected,
        searchParams,
        setSearchParams,
        searchResults,
        setSearchResults,
        shortlist,
        addToShortlist,
        removeFromShortlist,
        isShortlisted,
      }}
    >
      {children}
    </CollegeContext.Provider>
  );
}

export function useCollege() {
  const context = useContext(CollegeContext);
  if (!context) {
    throw new Error("useCollege must be used within a CollegeProvider");
  }
  return context;
}
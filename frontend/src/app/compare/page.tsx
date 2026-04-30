"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import { Plus, X, ArrowRightLeft, Star, Banknote, MapPin, TrendingUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ComparePage() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [compareData, setCompareData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchSearch = async () => {
      if (search.length < 1) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const response = await api.get(`/colleges?search=${search}&limit=100`);
        setSearchResults(response.data.data.filter((c: any) => !selectedIds.includes(c.id)));
      } catch (error) {
        console.error("Error searching colleges:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const timer = setTimeout(fetchSearch, 300);
    return () => clearTimeout(timer);
  }, [search, selectedIds]);

  useEffect(() => {
    const fetchCompareData = async () => {
      if (selectedIds.length < 2) {
        setCompareData([]);
        return;
      }
      setLoading(true);
      try {
        const response = await api.get(`/colleges/compare?ids=${selectedIds.join(',')}`);
        // Sort to match selectedIds order
        const sorted = selectedIds.map(id => response.data.find((c: any) => c.id === id)).filter(Boolean);
        setCompareData(sorted);
      } catch (error) {
        console.error("Error fetching compare data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompareData();
  }, [selectedIds]);

  const addCollege = (college: any) => {
    if (selectedIds.length >= 3) return;
    setSelectedIds([...selectedIds, college.id]);
    setSearch("");
  };

  const removeCollege = (id: string) => {
    setSelectedIds(selectedIds.filter(cId => cId !== id));
  };

  const getBestMetric = (metric: string) => {
    if (compareData.length < 2) return null;
    
    if (metric === 'fees') {
      const valid = compareData.filter(c => c.fees != null);
      if (valid.length === 0) return null;
      const min = Math.min(...valid.map(c => c.fees));
      return compareData.find(c => c.fees === min)?.id;
    } else if (metric === 'rating') {
      const valid = compareData.filter(c => c.rating != null);
      if (valid.length === 0) return null;
      const max = Math.max(...valid.map(c => c.rating));
      return compareData.find(c => c.rating === max)?.id;
    } else if (metric === 'placement') {
      const valid = compareData.filter(c => c.placements?.[0]?.placementPercentage != null);
      if (valid.length === 0) return null;
      const max = Math.max(...valid.map(c => c.placements[0].placementPercentage));
      return compareData.find(c => c.placements[0]?.placementPercentage === max)?.id;
    } else if (metric === 'package') {
      const valid = compareData.filter(c => c.placements?.[0]?.averagePackage != null);
      if (valid.length === 0) return null;
      const max = Math.max(...valid.map(c => c.placements[0].averagePackage));
      return compareData.find(c => c.placements[0]?.averagePackage === max)?.id;
    }
    return null;
  };

  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col items-start border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight flex items-center">
          Comparison Engine
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Evaluate up to 3 institutions side-by-side. Our engine highlights the optimal metrics across your selection.
        </p>
      </div>

      {/* Selection Area */}
      <div className="bg-card rounded-xl p-5 shadow-sm border border-border mb-8 z-20 relative">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 w-full relative">
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Select Institutions ({selectedIds.length}/3)
            </label>
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none shadow-sm disabled:opacity-50 transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={selectedIds.length >= 3}
            />
            
            <AnimatePresence>
              {search.length >= 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute w-full mt-1 bg-card rounded-md shadow-lg border border-border max-h-60 overflow-y-auto z-50"
                >
                  {isSearching ? (
                    <div className="p-3 text-sm text-center text-muted-foreground">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map(college => (
                        <li key={college.id}>
                          <button
                            className="w-full text-left px-3 py-2.5 hover:bg-muted border-b border-border last:border-0 flex items-center justify-between transition-colors"
                            onClick={() => addCollege(college)}
                          >
                            <div>
                              <div className="text-sm font-medium text-foreground">{college.name}</div>
                              <div className="text-xs text-muted-foreground">{college.location}</div>
                            </div>
                            <Plus className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-3 text-sm text-center text-muted-foreground">No matches found</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 pt-6">
            {selectedIds.map((id) => {
              const data = compareData.find(c => c.id === id);
              return (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={id} 
                  className="flex-shrink-0 w-48 bg-muted rounded-lg border border-border p-3 relative group"
                >
                  <button 
                    onClick={() => removeCollege(id)}
                    className="absolute -top-2 -right-2 bg-background border border-border text-muted-foreground hover:text-red-500 hover:border-red-200 rounded-full p-1 transition-colors shadow-sm"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <div className="text-xs font-semibold text-foreground line-clamp-2 pr-2">
                    {data?.name || "Loading..."}
                  </div>
                </motion.div>
              );
            })}
            
            {selectedIds.length < 2 && (
              <div className="flex-shrink-0 w-48 border border-dashed border-border rounded-lg flex items-center justify-center p-3 text-muted-foreground text-xs font-medium text-center bg-transparent">
                Add {2 - selectedIds.length} more to compare
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      {selectedIds.length >= 2 ? (
        loading ? (
          <div className="text-center py-20 bg-card rounded-xl border border-border">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
            <p className="text-sm text-muted-foreground">Processing comparison data...</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl overflow-hidden shadow-sm border border-border z-10"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="p-4 md:p-6 font-semibold text-muted-foreground w-1/4 align-bottom">
                      METRIC
                    </th>
                    {compareData.map(college => (
                      <th key={college.id} className="p-4 md:p-6 w-1/4 border-l border-border align-top">
                        <h3 className="font-semibold text-foreground text-base mb-1 line-clamp-2">{college.name}</h3>
                        <Link href={`/colleges/${college.id}`}>
                          <button className="text-xs text-blue-600 font-medium hover:underline">View Profile</button>
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {/* Rating */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-foreground flex items-center">
                      <Star className="h-4 w-4 mr-2 text-muted-foreground" /> Overall Rating
                    </td>
                    {compareData.map(college => (
                      <td key={college.id} className="p-4 md:p-6 border-l border-border">
                        <div className={`flex items-center ${getBestMetric('rating') === college.id ? 'text-green-600 font-semibold' : 'text-foreground'}`}>
                          {college.rating || "N/A"} / 5
                          {getBestMetric('rating') === college.id && <CheckCircle2 className="h-3.5 w-3.5 ml-1.5 text-green-500" />}
                        </div>
                      </td>
                    ))}
                  </tr>
                  
                  {/* Location */}
                  <tr className="hover:bg-muted/30 transition-colors bg-muted/10">
                    <td className="p-4 md:p-6 font-medium text-foreground flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" /> Region
                    </td>
                    {compareData.map(college => (
                      <td key={college.id} className="p-4 md:p-6 border-l border-border text-foreground">
                        {college.location}
                      </td>
                    ))}
                  </tr>

                  {/* Fees */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-foreground flex items-center">
                      <Banknote className="h-4 w-4 mr-2 text-muted-foreground" /> Annual Tuition
                    </td>
                    {compareData.map(college => (
                      <td key={college.id} className="p-4 md:p-6 border-l border-border">
                        <div className={`flex items-center ${getBestMetric('fees') === college.id ? 'text-green-600 font-semibold' : 'text-foreground'}`}>
                          {college.fees ? `₹${college.fees.toLocaleString()}` : "N/A"}
                          {getBestMetric('fees') === college.id && <CheckCircle2 className="h-3.5 w-3.5 ml-1.5 text-green-500" />}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Placement Percentage */}
                  <tr className="hover:bg-muted/30 transition-colors bg-muted/10">
                    <td className="p-4 md:p-6 font-medium text-foreground flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" /> Placement Rate
                    </td>
                    {compareData.map(college => {
                      const rate = college.placements?.[0]?.placementPercentage;
                      return (
                        <td key={college.id} className="p-4 md:p-6 border-l border-border">
                          <div className={`flex items-center ${getBestMetric('placement') === college.id ? 'text-green-600 font-semibold' : 'text-foreground'}`}>
                            {rate ? `${rate}%` : "N/A"}
                            {getBestMetric('placement') === college.id && <CheckCircle2 className="h-3.5 w-3.5 ml-1.5 text-green-500" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Average Package */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 md:p-6 font-medium text-foreground flex items-center">
                      <Banknote className="h-4 w-4 mr-2 text-muted-foreground" /> Average Salary
                    </td>
                    {compareData.map(college => {
                      const pkg = college.placements?.[0]?.averagePackage;
                      return (
                        <td key={college.id} className="p-4 md:p-6 border-l border-border">
                          <div className={`flex items-center ${getBestMetric('package') === college.id ? 'text-green-600 font-semibold' : 'text-foreground'}`}>
                            {pkg ? `₹${(pkg/100000).toFixed(1)} LPA` : "N/A"}
                            {getBestMetric('package') === college.id && <CheckCircle2 className="h-3.5 w-3.5 ml-1.5 text-green-500" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  
                  {/* Top Course */}
                  <tr className="hover:bg-muted/30 transition-colors bg-muted/10">
                    <td className="p-4 md:p-6 font-medium text-foreground">Top Programs</td>
                    {compareData.map(college => (
                      <td key={college.id} className="p-4 md:p-6 border-l border-border text-foreground">
                        <ul className="list-disc pl-4 space-y-1 text-xs">
                          {college.courses?.slice(0, 3).map((c: any) => (
                            <li key={c.id}>{c.name}</li>
                          )) || "N/A"}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )
      ) : (
        <div className="text-center py-16 bg-muted/20 border border-dashed border-border rounded-xl">
          <ArrowRightLeft className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="text-base font-medium text-foreground mb-1">Awaiting Selection</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Choose at least two institutions using the search above to view analytical comparisons.
          </p>
        </div>
      )}
    </div>
  );
}

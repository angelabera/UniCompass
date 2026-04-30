"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { MapPin, Star, BookOpen, Briefcase, Heart, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Course {
  id: string;
  name: string;
  duration: string;
  fees?: number | null;
}

interface Placement {
  id: string;
  year: number;
  highestPackage?: number | null;
  averagePackage?: number | null;
  placementPercentage?: number | null;
}

interface College {
  id: string;
  name: string;
  location: string;
  description?: string | null;
  imageUrl?: string | null;
  rating?: number | null;
  courses?: Course[];
  placements?: Placement[];
}

export default function CollegeDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { isAuthenticated, savedColleges, addSavedCollege, removeSavedCollege } = useStore();
  const isSaved = savedColleges.some((c) => c.id === id);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [id]);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await api.get(`/colleges/${id}`);
        setCollege(response.data);
      } catch (error) {
        console.error("Error fetching college:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [id]);

  const toggleSave = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    setSaving(true);
    try {
      if (isSaved) {
        await api.delete(`/save/${id}`);
        removeSavedCollege(id as string);
      } else {
        await api.post(`/save`, { collegeId: id });
        addSavedCollege(college);
      }
    } catch (error) {
      console.error("Error toggling save:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-8 animate-pulse">
        <div className="h-64 bg-muted rounded-xl mb-8"></div>
        <div className="h-8 bg-muted w-1/3 rounded mb-4"></div>
        <div className="h-4 bg-muted w-1/4 rounded mb-10"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-40 bg-muted rounded-xl"></div>
          <div className="h-40 bg-muted rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="text-center py-20 border border-dashed border-border rounded-xl bg-muted/20 mt-10">
        <h2 className="text-xl font-medium text-foreground mb-2">College not found</h2>
        <Link href="/colleges" className="text-sm text-blue-600 hover:underline">
          Return to directory
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6">
      <Link href="/colleges" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Directory
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl overflow-hidden shadow-sm border border-border mb-10"
      >
        <div className="h-48 md:h-72 relative bg-muted border-b border-border">
          <img
            src={college.imageUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000"}
            alt={college.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex justify-between items-end">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-tight">{college.name}</h1>
              <div className="flex flex-wrap items-center text-gray-300 gap-4 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1.5" />
                  <span>{college.location}</span>
                </div>
                <div className="flex items-center bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  <Star className="h-3.5 w-3.5 mr-1.5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-white">{college.rating || "N/A"}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={toggleSave}
              disabled={saving}
              className={`p-3 rounded-md transition-all shadow-sm border ${isSaved ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' : 'bg-background text-foreground border-border hover:bg-muted'}`}
              title={isSaved ? "Remove from saved" : "Save college"}
            >
              <Heart className={`h-5 w-5 ${isSaved ? 'fill-red-600' : ''}`} />
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center">
              Overview
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">{college.description || "No description available."}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Courses Section */}
            <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
              <h3 className="text-base font-semibold text-foreground mb-4 flex items-center pb-3 border-b border-border">
                <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                Academic Programs
              </h3>
              {college.courses && college.courses.length > 0 ? (
                <ul className="space-y-3">
                  {college.courses.map((course) => (
                    <li key={course.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-border/50 last:border-0 last:pb-0">
                      <div className="font-medium text-sm text-foreground mb-1 sm:mb-0">{course.name}</div>
                      <div className="flex items-center space-x-3 text-xs">
                        <span className="text-muted-foreground bg-muted px-2 py-1 rounded-md">{course.duration}</span>
                        <span className="font-semibold text-foreground">₹{(course.fees || 0).toLocaleString()}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No academic programs listed.</p>
              )}
            </div>

            {/* Placements Section */}
            <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
              <h3 className="text-base font-semibold text-foreground mb-4 flex items-center pb-3 border-b border-border">
                <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                Placement Statistics
              </h3>
              {college.placements && college.placements.length > 0 ? (
                <div className="space-y-4">
                  {college.placements.map((placement) => (
                    <div key={placement.id} className="bg-muted/30 p-4 rounded-lg border border-border/50">
                      <div className="font-semibold text-sm text-foreground mb-3 flex items-center">
                        <span className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full mr-2">CLASS OF {placement.year}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-1">Highest Package</div>
                          <div className="text-sm font-semibold text-foreground">₹{((placement.highestPackage || 0) / 100000).toFixed(1)} LPA</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-1">Average Package</div>
                          <div className="text-sm font-semibold text-foreground">₹{((placement.averagePackage || 0) / 100000).toFixed(1)} LPA</div>
                        </div>
                        <div className="col-span-2 mt-2">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Placement Rate</span>
                            <span className="text-xs font-semibold text-foreground">{placement.placementPercentage || 0}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: `${placement.placementPercentage || 0}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No placement data available.</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

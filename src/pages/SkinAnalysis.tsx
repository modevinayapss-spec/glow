import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CameraCapture from "@/src/components/SkinAnalysis/CameraCapture";
import SkinQuiz from "@/src/components/SkinAnalysis/SkinQuiz";
import { analyzeSkinImage, analyzeSkinQuiz, SkinAnalysisResult } from "@/src/services/aiService";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";

export default function SkinAnalysis() {
  const { mode } = useParams<{ mode: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const handleAnalysis = async (method: "camera" | "quiz", data: any) => {
    setLoading(true);
    setLoadingText(method === "camera" ? "Our AI is scanning your skin..." : "Processing your answers...");
    
    try {
      let result: SkinAnalysisResult;
      if (method === "camera") {
        result = await analyzeSkinImage(data);
      } else {
        result = await analyzeSkinQuiz(data);
      }
      
      // Navigate to results with data
      navigate("/analysis/results", { state: { result, method } });
    } catch (error) {
      console.error(error);
      alert("Something went wrong during analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 bg-paper">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-8 text-center"
          >
            <div className="relative">
              <div className="w-20 h-20 border-[0.5px] border-ink/10 rounded-full flex items-center justify-center animate-[spin_4s_linear_infinite]">
                 <div className="w-16 h-16 border border-tan/40 rounded-full border-t-tan animate-spin" />
              </div>
              <div className="absolute inset-0 bg-tan/5 blur-3xl rounded-full" />
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-tan">DermaEngine 4.2</span>
              <h2 className="text-4xl font-serif italic text-ink">{loadingText}</h2>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            {mode === "camera" ? (
              <CameraCapture onCapture={(img) => handleAnalysis("camera", img)} onCancel={() => navigate("/home")} />
            ) : (
              <SkinQuiz onComplete={(answers) => handleAnalysis("quiz", answers)} onCancel={() => navigate("/home")} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

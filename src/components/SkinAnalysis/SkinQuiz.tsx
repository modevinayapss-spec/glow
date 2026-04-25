import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

interface Question {
  id: string;
  text: string;
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: "oiliness",
    text: "How does your skin feel by midday?",
    options: [
      { value: "oily", label: "Shiny and oily all over" },
      { value: "combination", label: "Oily in the T-zone, dry elsewhere" },
      { value: "normal", label: "Comfortable and balanced" },
      { value: "dry", label: "Tight and dry" },
    ],
  },
  {
    id: "sensitivity",
    text: "How does your skin react to new products?",
    options: [
      { value: "sensitive", label: "Easily irritated or red" },
      { value: "occasional", label: "Sometimes reacts but usually fine" },
      { value: "stable", label: "Rarely has issues" },
    ],
  },
  {
    id: "concerns",
    text: "What is your primary skin concern?",
    options: [
      { value: "acne", label: "Acne and breakouts" },
      { value: "pigmentation", label: "Dark spots or uneven tone" },
      { value: "aging", label: "Fine lines and wrinkles" },
      { value: "dullness", label: "Lack of radiance" },
      { value: "clogged", label: "Large pores or blackheads" },
    ],
  },
  {
    id: "routine_pref",
    text: "How many steps do you prefer in your routine?",
    options: [
      { value: "minimal", label: "Quick and simple (2-3 steps)" },
      { value: "standard", label: "Standard (4-5 steps)" },
      { value: "advanced", label: "Thorough (6+ steps)" },
    ],
  },
];

interface SkinQuizProps {
  onComplete: (answers: Record<string, string>) => void;
  onCancel: () => void;
}

export default function SkinQuiz({ onComplete, onCancel }: SkinQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentStep].id]: value }));
  };

  const next = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onCancel();
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 max-w-md w-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Skin Assessment</h3>
        <span className="text-sm font-medium text-rose-500">{currentStep + 1} / {questions.length}</span>
      </div>

      <div className="h-1.5 w-full bg-gray-100 rounded-full mb-12 overflow-hidden">
        <motion.div 
          className="h-full bg-rose-400" 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-display font-bold text-gray-900 leading-tight">
            {currentQuestion.text}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full p-5 rounded-2xl text-left transition-all border-2 flex items-center justify-between group",
                    isSelected 
                      ? "border-rose-400 bg-rose-50 text-rose-900" 
                      : "border-gray-100 hover:border-rose-200 text-gray-700"
                  )}
                >
                  <span className="font-medium">{option.label}</span>
                  {isSelected && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-rose-500">
                      <Check size={20} />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex items-center justify-between">
        <button
          onClick={prev}
          className="flex items-center gap-2 text-gray-400 font-medium hover:text-gray-600 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>{currentStep === 0 ? "Cancel" : "Back"}</span>
        </button>

        <button
          onClick={next}
          disabled={!answers[currentQuestion.id]}
          className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 transition-all shadow-lg active:scale-95"
        >
          <span>{currentStep === questions.length - 1 ? "Finish" : "Next"}</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

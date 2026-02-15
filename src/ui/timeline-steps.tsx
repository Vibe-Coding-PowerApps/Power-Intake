import React from "react";
import { IconCheck, IconCircle, IconArrowRight } from "@tabler/icons-react";

export interface Step {
  title: string;
  description: string;
  completed?: boolean;
}

interface TimelineStepsProps {
  steps: Step[];
  currentStep: number;
}

export const TimelineSteps: React.FC<TimelineStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-8 w-full mb-8">
      {steps.map((step, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className={`rounded-full border-2 flex items-center justify-center size-8 mb-2 ${idx < currentStep ? 'border-primary bg-primary text-primary-foreground' : 'border-muted bg-background text-muted-foreground'}`}> 
            {idx < currentStep ? <IconCheck className="size-5" /> : <IconCircle className="size-5" />}
          </div>
          <div className="text-sm font-semibold mb-1">{step.title}</div>
          <div className="text-xs text-muted-foreground text-center w-32">{step.description}</div>
        </div>
      ))}
      {/* Arrows between steps */}
      {steps.map((_, idx) => idx < steps.length - 1 && (
        <IconArrowRight key={idx} className="size-5 text-muted-foreground" />
      ))}
    </div>
  );
};

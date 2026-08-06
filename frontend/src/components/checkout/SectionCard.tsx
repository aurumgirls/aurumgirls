import { ReactNode } from 'react';
import { Check, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  step: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  onEdit: () => void;
  children: ReactNode;
}

export function SectionCard({ step, title, isActive, isCompleted, onEdit, children }: SectionCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-3xl border transition-all duration-300",
      isActive ? "border-forest shadow-soft" : "border-sand",
      !isActive && !isCompleted && "opacity-60"
    )}>
      <div className="px-6 md:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
            isCompleted ? "bg-forest text-cream" : isActive ? "bg-terracotta text-white" : "bg-cream text-slate border border-sand"
          )}>
            {isCompleted ? <Check className="w-4 h-4" /> : step}
          </div>
          <h2 className="font-display text-2xl text-forest">{title}</h2>
        </div>
        
        {isCompleted && !isActive && (
          <button 
            onClick={onEdit}
            className="text-slate hover:text-terracotta transition-colors flex items-center gap-1 text-sm font-medium"
          >
            <Edit2 className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </button>
        )}
      </div>

      <div className={cn(
        "overflow-hidden transition-all duration-500",
        isActive ? "max-h-[1000px] opacity-100 px-6 md:px-8 pb-8" : "max-h-0 opacity-0 px-6 md:px-8 pb-0"
      )}>
        {children}
      </div>
    </div>
  );
}

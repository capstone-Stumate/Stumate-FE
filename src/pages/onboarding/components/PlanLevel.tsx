import type React from 'react';
import { LEVEL, type LevelId } from '@/shared/constants/level';

interface PlanLevelProps {
  value: LevelId;
  onChange: (value: LevelId) => void;
  action?: React.ReactNode;
}

const PlanLevel = ({ value, onChange, action }: PlanLevelProps) => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-body font-sans font-bold text-text">플랜 난이도</h2>
        {action}
      </div>
      <div className="flex gap-2">
        {LEVEL.map(({ id, label, description }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex flex-1 flex-col items-center justify-center rounded-xl py-3 font-sans transition-colors duration-200 ${
              value === id
                ? 'bg-primary-light outline outline-2 outline-primary'
                : 'bg-white outline outline-1 outline-border'
            }`}
          >
            <span className={`text-body font-bold ${value === id ? 'text-text' : 'text-text-gray'}`}>
              {label}
            </span>
            <span className={`mt-1 text-xs ${value === id ? 'text-text' : 'text-text-gray'}`}>
              {description}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default PlanLevel;

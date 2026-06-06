import type { AiLearningType as AiLearningTypeData } from '@/shared/constants/ai-learning-types';

interface AiLearningTypeProps {
  learningType: AiLearningTypeData;
}

const AiLearningType = ({ learningType }: AiLearningTypeProps) => {
  return (
    <section>
      <h2 className="mb-3 font-sans text-body font-semibold text-text">AI 학습 유형 분석</h2>
      <div className="rounded-xl bg-white p-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-text px-3 py-1.5 font-sans text-sm font-semibold text-white">
          {learningType.emoji} {learningType.name}
        </span>
        <p className="mt-3 whitespace-pre-line font-sans text-body text-text-gray">
          {learningType.description}
        </p>
      </div>
    </section>
  );
};

export default AiLearningType;

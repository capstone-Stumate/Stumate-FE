import SubjectTag from '@/shared/ui/Tag/SubjectTag';

interface SubjectSelectProps {
  subjects: string[];
  subjectInput: string;
  onInputChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onDelete: (index: number) => void;
}

const SubjectSelect = ({
  subjects,
  subjectInput,
  onInputChange,
  onKeyDown,
  onDelete,
}: SubjectSelectProps) => {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-body text-text font-sans font-bold">공부 과목</h2>
      <div className="bg-bg flex min-h-[44px] flex-wrap items-center gap-2 rounded-lg px-3 py-2">
        {subjects.map((subject, index) => (
          <SubjectTag
            key={index}
            label={subject}
            isSelected
            onDelete={() => onDelete(index)}
          />
        ))}
        {subjects.length < 5 && (
          <input
            type="text"
            value={subjectInput}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={subjects.length === 0 ? '#태그 입력 (최대 5개)' : ''}
            className="text-body text-text placeholder:text-text-gray min-w-[120px] flex-1 bg-transparent font-sans outline-none"
          />
        )}
      </div>
    </section>
  );
};

export default SubjectSelect;

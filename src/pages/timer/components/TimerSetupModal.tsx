import { useState } from 'react';
import { LOCATIONS } from '@/shared/constants/locations';
import type { SubjectInfo } from '@/shared/api/generated/stumateAPI.schemas';

interface TimerSetupModalProps {
  subjects: SubjectInfo[];
  onStart: (userSubjectId: number, subjectName: string, location: string) => void;
  onCancel: () => void;
}

const TimerSetupModal = ({ subjects, onStart, onCancel }: TimerSetupModalProps) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectInfo | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const isValid = selectedSubject !== null && selectedLocation !== null;

  const handleStart = () => {
    if (!isValid || !selectedSubject?.userSubjectId) return;
    onStart(selectedSubject.userSubjectId, selectedSubject.subjectName ?? '', selectedLocation!);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onCancel} />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-48px)] max-w-95.5 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6">
        <h2 className="text-header2 text-text mb-5 text-center font-sans font-bold">
          공부 설정
        </h2>

        {/* 과목 */}
        <div className="mb-4">
          <p className="text-body text-text mb-2 font-sans font-semibold">
            과목
          </p>
          <div className="flex flex-wrap gap-2">
            {subjects.length === 0 ? (
              <p className="text-body text-text-gray font-sans">등록된 과목이 없습니다.</p>
            ) : (
              subjects.map((subject) => (
                <button
                  key={subject.userSubjectId}
                  type="button"
                  onClick={() => setSelectedSubject(subject)}
                  className={`text-body rounded-full px-4 py-1.5 font-sans font-medium ${
                    selectedSubject?.userSubjectId === subject.userSubjectId
                      ? 'bg-primary text-text'
                      : 'bg-bg text-text-gray'
                  }`}
                >
                  {subject.subjectName}
                </button>
              ))
            )}
          </div>
        </div>

        {/* 장소 */}
        <div className="mb-6">
          <p className="text-body text-text mb-2 font-sans font-semibold">
            장소
          </p>
          <div className="flex flex-wrap gap-2">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => setSelectedLocation(loc.label)}
                className={`text-body rounded-full px-4 py-1.5 font-sans font-medium ${
                  selectedLocation === loc.label
                    ? 'bg-primary text-text'
                    : 'bg-bg text-text-gray'
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleStart}
            disabled={!isValid}
            className="bg-primary text-body text-text w-full rounded-xl py-3 font-sans font-semibold disabled:opacity-40"
          >
            시작하기
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-bg text-body text-text-gray w-full rounded-xl py-3 font-sans font-semibold"
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default TimerSetupModal;

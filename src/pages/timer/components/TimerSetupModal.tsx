import { useState } from 'react';
import { LOCATIONS } from '@/shared/constants/locations';

interface TimerSetupModalProps {
  onStart: (subject: string, location: string) => void;
  onCancel: () => void;
}

const MOCK_SUBJECTS = ['수학', '영어', '물리'];

const TimerSetupModal = ({ onStart, onCancel }: TimerSetupModalProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const isValid = selectedSubject !== null && selectedLocation !== null;

  const handleStart = () => {
    if (!isValid) return;
    onStart(selectedSubject!, selectedLocation!);
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
            {MOCK_SUBJECTS.map((subject) => (
              <button
                key={subject}
                type="button"
                onClick={() => setSelectedSubject(subject)}
                className={`text-body rounded-full px-4 py-1.5 font-sans font-medium ${
                  selectedSubject === subject
                    ? 'bg-primary text-text'
                    : 'bg-bg text-text-gray'
                }`}
              >
                {subject}
              </button>
            ))}
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

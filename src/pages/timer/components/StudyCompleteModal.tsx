import StarRating from '@/shared/ui/StarRating/StarRating';

interface StudyCompleteModalProps {
  todayTotalDisplay: string;
  pauseCount: number;
  rating: number;
  onRatingChange: (rating: number) => void;
  onSave: () => void;
}

const StudyCompleteModal = ({
  todayTotalDisplay,
  pauseCount,
  rating,
  onRatingChange,
  onSave,
}: StudyCompleteModalProps) => {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/40" />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-48px)] max-w-[382px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6">
        <div className="mb-5 text-center">
          <h2 className="font-sans text-header2 font-bold text-text">공부 완료!</h2>
          <p className="mt-1 font-sans text-body text-text-gray">오늘도 잘 해냈어요</p>
        </div>

        {/* 오늘 공부 시간 */}
        <div className="mb-5 rounded-xl bg-bg px-4 py-4 text-center">
          <p className="font-sans text-body text-text-gray">오늘 공부 시간</p>
          <p className="mt-1 font-sans text-2xl font-bold text-text">{todayTotalDisplay}</p>
        </div>

        {/* 별점 */}
        <div className="mb-4 text-center">
          <p className="mb-2 font-sans text-body text-text">집중도를 평가해주세요</p>
          <div className="flex justify-center">
            <StarRating rating={rating} onChange={onRatingChange} />
          </div>
        </div>

        {/* 일시정지 횟수 */}
        <p className="mb-5 text-center font-sans text-body text-text-gray">
          오늘 쉬었던 횟수: {pauseCount}번
        </p>

        {/* 저장 버튼 */}
        <button
          type="button"
          onClick={onSave}
          className="w-full rounded-xl bg-primary py-3 font-sans text-body font-semibold text-text"
        >
          저장
        </button>
      </div>
    </>
  );
};

export default StudyCompleteModal;

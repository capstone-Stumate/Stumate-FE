import { useState } from 'react';
import logoSmall from '@/assets/logo-small.svg';
import type { Todo } from '@/shared/types/todo';
import { useGetMessage } from '@/shared/api/generated/motivational-message-controller/motivational-message-controller';
import useTimer from './hooks/useTimer';
import Timer from './components/Timer';
import TimerSetupModal from './components/TimerSetupModal';
import StudyCompleteModal from './components/StudyCompleteModal';
import TimerTodoList from './components/TimerTodoList';

const MOCK_NAME = '학생';
const MOCK_USER_ID = 1; // TODO: 인증 연동 시 실제 userId로 교체

const INITIAL_TODOS: Todo[] = [
  { id: '1', subject: '물리', content: '모의고사 1', isCompleted: true },
  { id: '2', subject: '물리', content: '모의고사 2', isCompleted: true },
  { id: '3', subject: '토플', content: '모의고사 1', isCompleted: false },
  { id: '4', subject: '토플', content: '모의고사 2', isCompleted: false },
  { id: '5', subject: '도형', content: '모의고사 2', isCompleted: false },
];

const TimerPage = () => {
  const {
    status,
    modalType,
    session,
    pauseCount,
    rating,
    setRating,
    sessionTimeDisplay,
    todayTotalDisplay,
    handleOnClick,
    handleOffClick,
    handleSetupStart,
    handleSetupCancel,
    handlePauseToggle,
    handleCompleteSave,
  } = useTimer();

  const { data: messageData, isLoading: isMessageLoading } = useGetMessage(MOCK_USER_ID);
  const motivationalMessage = isMessageLoading ? '로딩 중...' : String(messageData ?? '오늘도 화이팅!');

  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);

  const isActive = status !== 'idle';

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)),
    );
  };

  const handleAddTodo = (content: string) => {
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), subject: '', content, isCompleted: false },
    ]);
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <>
      {/* 헤더 */}
      <header className="pt-10">
        <img src={logoSmall} alt="Stumate" />
        <div className="mt-3">
          {isActive ? (
            <>
              <p className="font-sans text-header2 font-bold text-text">
                집중하는 중이에요{' '}
                <button
                  type="button"
                  onClick={() => {
                    /* TimerTodoList의 추가 트리거 - 아래 컴포넌트에서 처리 */
                  }}
                  className="text-primary"
                >
                  +
                </button>
              </p>
              {session && (
                <p className="mt-0.5 font-sans text-body text-primary">
                  {session.subject} · {session.location}
                </p>
              )}
            </>
          ) : (
            <>
              <p className="font-sans text-header2 font-bold text-text">
                오늘도 화이팅, {MOCK_NAME} 님! 🌙
              </p>
              <p className="mt-0.5 font-sans text-body text-text-gray">{motivationalMessage}</p>
            </>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-6 pb-8 pt-6">
        {/* 타이머 */}
        <div className="flex justify-center">
          <Timer status={status} timeDisplay={sessionTimeDisplay} />
        </div>

        {/* OFF / ON 버튼 */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleOffClick}
            disabled={!isActive}
            className="flex-1 rounded-xl border border-border bg-white py-3 font-sans text-body font-semibold text-text disabled:opacity-40"
          >
            OFF
          </button>
          <button
            type="button"
            onClick={handleOnClick}
            disabled={isActive}
            className="flex-1 rounded-xl bg-primary py-3 font-sans text-body font-semibold text-text disabled:opacity-40"
          >
            ON
          </button>
        </div>

        {/* 일시정지 / 재시작 버튼 (활성 상태에서만) */}
        {isActive && (
          <button
            type="button"
            onClick={handlePauseToggle}
            className="w-full rounded-xl bg-[#EAF7E2] py-3 font-sans text-body font-semibold text-text"
          >
            {status === 'paused' ? '재시작' : '일시정지'}
          </button>
        )}

        {/* 투두 리스트 */}
        <TimerTodoList todos={todos} onToggle={handleToggleTodo} onAdd={handleAddTodo} onDelete={handleDeleteTodo} />
      </div>

      {/* 공부 설정 모달 */}
      {modalType === 'setup' && (
        <TimerSetupModal onStart={handleSetupStart} onCancel={handleSetupCancel} />
      )}

      {/* 공부 완료 모달 */}
      {modalType === 'complete' && (
        <StudyCompleteModal
          todayTotalDisplay={todayTotalDisplay}
          pauseCount={pauseCount}
          rating={rating}
          onRatingChange={setRating}
          onSave={handleCompleteSave}
        />
      )}
    </>
  );
};

export default TimerPage;

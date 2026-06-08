import logoSmall from '@/assets/logo-small.svg';
import type { Info } from '@/shared/api/generated/stumateAPI.schemas';
import { useGetMessage } from '@/shared/api/generated/motivational-message-controller/motivational-message-controller';
import {
  useGetTodayTodos,
  useCreateTodo,
  useCompleteTodo,
  useDeleteTodo,
} from '@/shared/api/generated/todo-controller/todo-controller';
import useAuthStore from '@/shared/store/authStore';
import { getTodayString } from '@/shared/utils/formatDate';
import useTimer from './hooks/useTimer';
import Timer from './components/Timer';
import TimerSetupModal from './components/TimerSetupModal';
import StudyCompleteModal from './components/StudyCompleteModal';
import TimerTodoList from './components/TimerTodoList';

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

  const user = useAuthStore((state) => state.user);
  const { data: messageData, isLoading: isMessageLoading } = useGetMessage(user?.userId ?? 0, {
    query: { enabled: !!user?.userId },
  });
  const motivationalMessage = isMessageLoading ? '로딩 중...' : String(messageData ?? '오늘도 화이팅!');

  const { data: todayTodosData, refetch: refetchTodos } = useGetTodayTodos(user?.userId ?? 0, {
    query: { enabled: !!user?.userId, placeholderData: (prev) => prev },
  });
  const todayTodos = todayTodosData as unknown as Info[] | undefined;

  const { mutate: createTodoMutate } = useCreateTodo();
  const { mutate: completeTodoMutate } = useCompleteTodo();
  const { mutate: deleteTodoMutate } = useDeleteTodo();

  const todos = (todayTodos ?? []).map((info) => ({
    id: String(info.todoId),
    content: info.content ?? '',
    isCompleted: info.isCompleted ?? false,
  }));

  const isActive = status !== 'idle';

  const handleToggleTodo = (id: string) => {
    if (!user) return;
    completeTodoMutate(
      { userId: user.userId, todoId: Number(id) },
      { onSuccess: () => refetchTodos() },
    );
  };

  const handleAddTodo = (content: string) => {
    if (!user) return;
    createTodoMutate(
      { userId: user.userId, data: { content, todoDate: getTodayString() } },
      { onSuccess: () => refetchTodos() },
    );
  };

  const handleDeleteTodo = (id: string) => {
    if (!user) return;
    deleteTodoMutate(
      { userId: user.userId, todoId: Number(id) },
      { onSuccess: () => refetchTodos() },
    );
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
                오늘도 화이팅, {user?.name ?? '학생'} 님! 🌙
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

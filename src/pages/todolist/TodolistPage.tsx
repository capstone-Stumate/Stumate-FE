import { useNavigate } from 'react-router-dom';
import logoSmall from '@/assets/logo-small.svg';
import chevronLeft from '@/assets/chevron-left.svg';
import BarChart from '@/shared/ui/BarChart/BarChart';
import DateAccordion from './components/DateAccordion';
import TodoInput from './components/TodoInput';
import useTodolist from './hooks/useTodolist';

const TodolistPage = () => {
  const navigate = useNavigate();
  const {
    dayTodosList,
    openDates,
    studyHourData,
    newTodoContent,
    setNewTodoContent,
    newTodoDate,
    setNewTodoDate,
    isDateDisabled,
    handleToggleDate,
    handleCompleteTodo,
    handleDeleteTodo,
    handleCreateTodo,
  } = useTodolist();

  return (
    <>
      <header className="pt-10">
        <img src={logoSmall} alt="Stumate" />
        <div className="relative mt-4 flex items-center justify-center py-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-0 p-1"
          >
            <img src={chevronLeft} alt="뒤로가기" className="h-5 w-5" />
          </button>
          <h1 className="text-body text-text font-sans font-bold">
            투두리스트
          </h1>
        </div>
      </header>

      <div className="flex flex-col gap-6 pt-4">
        <section className="flex flex-col gap-3">
          <h2 className="text-body text-text font-sans font-bold">
            이번주 공부 시간
          </h2>
          <BarChart
            data={studyHourData}
            showValueLabel
            formatValue={(v) => `${v}h`}
          />
        </section>

        <TodoInput
          content={newTodoContent}
          date={newTodoDate}
          onContentChange={setNewTodoContent}
          onDateChange={setNewTodoDate}
          onSubmit={handleCreateTodo}
        />

        <section className="flex flex-col gap-2">
          {dayTodosList.map(({ date, todos }) => (
            <DateAccordion
              key={date}
              date={date}
              todos={todos}
              isOpen={openDates.has(date)}
              isDisabled={isDateDisabled(date, todos)}
              onToggle={() => handleToggleDate(date)}
              onCompleteTodo={handleCompleteTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default TodolistPage;

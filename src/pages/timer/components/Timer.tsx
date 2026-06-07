import type { TimerStatus } from '@/shared/types/timer';

interface TimerProps {
  status: TimerStatus;
  timeDisplay: string;
}

// r=88, circumference≈552.9, arc=50, gap=88.2
const ARC_DASHARRAY = '50 88.2';

const Timer = ({ status, timeDisplay }: TimerProps) => {
  const statusText =
    status === 'idle' ? '시작 전' : status === 'running' ? '집중 중' : '일시정지';
  const isRunning = status === 'running';

  return (
    <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-[#F2F3F1]">
      {/* 장식 아크 4개 (SVG) */}
      <svg className="absolute inset-0" viewBox="0 0 200 200" width="224" height="224">
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="#9DDE78"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={ARC_DASHARRAY}
          strokeDashoffset="0"
          transform="rotate(-135, 100, 100)"
        />
      </svg>

      {/* 회전하는 검정 점 */}
      <div
        className="absolute inset-0"
        style={{
          animation: 'rotateDot 8s linear infinite',
          animationPlayState: isRunning ? 'running' : 'paused',
        }}
      >
        <div className="absolute left-1/2 top-[10px] h-3 w-3 -translate-x-1/2 rounded-full bg-text" />
      </div>

      {/* 중앙 텍스트 */}
      <div className="text-center">
        <p className="font-sans text-4xl font-bold text-text">{timeDisplay}</p>
        <p className="mt-1 font-sans text-sm text-primary">{statusText}</p>
      </div>
    </div>
  );
};

export default Timer;

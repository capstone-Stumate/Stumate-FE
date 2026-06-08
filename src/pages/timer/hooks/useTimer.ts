import { useState, useEffect, useRef } from 'react';
import type { TimerStatus, TimerModalType, TimerSession } from '@/shared/types/timer';
import type { StartLocation } from '@/shared/api/generated/stumateAPI.schemas';
import {
  useStartSession,
  useFinishSession,
} from '@/shared/api/generated/study-session-controller/study-session-controller';
import useAuthStore from '@/shared/store/authStore';

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const formatTotalTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}시간 ${m}분`;
  if (m > 0) return `${m}분 ${s}초`;
  return `${s}초`;
};

const toStartLocation = (label: string): StartLocation => {
  const map: Record<string, StartLocation> = { '기타 장소': '기타' };
  return (map[label] ?? label) as StartLocation;
};

const useTimer = () => {
  const user = useAuthStore((state) => state.user);

  const [status, setStatus] = useState<TimerStatus>('idle');
  const [modalType, setModalType] = useState<TimerModalType>('none');
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [todayTotalSeconds, setTodayTotalSeconds] = useState(0);
  const [pauseCount, setPauseCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [session, setSession] = useState<TimerSession | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { mutate: startSessionMutate } = useStartSession();
  const { mutate: finishSessionMutate } = useFinishSession();

  useEffect(() => {
    if (status === 'running') {
      intervalRef.current = setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
        setTodayTotalSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status]);

  const handleOnClick = () => {
    setModalType('setup');
  };

  const handleOffClick = () => {
    if (status === 'idle') return;
    setStatus('idle');
    setModalType('complete');
  };

  const handleSetupStart = (userSubjectId: number, subjectName: string, location: string) => {
    if (!user) return;
    startSessionMutate(
      {
        userId: user.userId,
        data: { userSubjectId, location: toStartLocation(location) },
      },
      {
        onSuccess: (data) => {
          const sessionInfo = data as unknown as { sessionId?: number };
          setSession({
            sessionId: sessionInfo.sessionId ?? 0,
            userSubjectId,
            subject: subjectName,
            location,
          });
          setSessionSeconds(0);
          setPauseCount(0);
          setStatus('running');
          setModalType('none');
        },
      },
    );
  };

  const handleSetupCancel = () => {
    setModalType('none');
  };

  const handlePauseToggle = () => {
    if (status === 'running') {
      setStatus('paused');
      setPauseCount((prev) => prev + 1);
    } else if (status === 'paused') {
      setStatus('running');
    }
  };

  const handleCompleteSave = () => {
    if (!user || !session?.sessionId) {
      setModalType('none');
      setSessionSeconds(0);
      setRating(0);
      setSession(null);
      setPauseCount(0);
      return;
    }
    finishSessionMutate(
      {
        userId: user.userId,
        sessionId: session.sessionId,
        data: { focusScore: rating, pauseCount },
      },
      {
        onSuccess: () => {
          setModalType('none');
          setSessionSeconds(0);
          setRating(0);
          setSession(null);
          setPauseCount(0);
        },
      },
    );
  };

  return {
    status,
    modalType,
    session,
    sessionSeconds,
    pauseCount,
    rating,
    setRating,
    sessionTimeDisplay: formatTime(sessionSeconds),
    todayTotalDisplay: formatTotalTime(todayTotalSeconds),
    handleOnClick,
    handleOffClick,
    handleSetupStart,
    handleSetupCancel,
    handlePauseToggle,
    handleCompleteSave,
  };
};

export default useTimer;

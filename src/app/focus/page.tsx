'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

const focusDurations = [
  { label: 'Pomodoro', minutes: 25 },
  { label: 'Short Break', minutes: 5 },
  { label: 'Long Focus', minutes: 50 },
  { label: 'Long Break', minutes: 15 },
];

export default function FocusPage() {
  const [duration, setDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Optional: Add a sound notification here
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(duration * 60);
  }, [duration]);

  const selectDuration = (minutes: number) => {
    setDuration(minutes);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  const progress = (timeLeft / (duration * 60)) * 100;

  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Focus Session</CardTitle>
          <CardDescription>
            Minimize distractions. Maximize productivity.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8">
          <div className="relative h-64 w-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-6xl font-bold text-foreground">
                {formatTime(timeLeft)}
              </span>
            </div>
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
              <circle
                className="text-secondary"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                r="56"
                cx="60"
                cy="60"
              />
              <circle
                className="text-primary transition-all duration-1000 ease-linear"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 56}
                strokeDashoffset={2 * Math.PI * 56 * (1 - progress / 100)}
                strokeLinecap="round"
                fill="transparent"
                r="56"
                cx="60"
                cy="60"
              />
            </svg>
          </div>
          <div className="flex w-full justify-center gap-4">
            {focusDurations.map(({ label, minutes }) => (
              <Button
                key={label}
                variant={duration === minutes ? 'default' : 'outline'}
                className="rounded-full"
                onClick={() => selectDuration(minutes)}
              >
                {label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button
              size="lg"
              className="rounded-full w-32"
              onClick={toggleTimer}
            >
              {isActive ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
              {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="rounded-full"
              onClick={resetTimer}
              aria-label="Reset Timer"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

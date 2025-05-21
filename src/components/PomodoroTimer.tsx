
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Clock, Play, Pause, RotateCcw, Settings, Bell, Volume2, Coffee, Brain, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PomodoroTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            const newMode = mode === 'focus' ? 'break' : 'focus';
            setMode(newMode);
            setIsActive(false);
            if (newMode === 'break') {
              setSessionsCompleted(prev => prev + 1);
              // Play notification sound when pomodoro is complete
              const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
              audio.play().catch(e => console.log('Audio play error:', e));
            }
            return newMode === 'focus' ? focusTime * 60 : breakTime * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, mode, focusTime, breakTime]);

  useEffect(() => {
    setTimeLeft(mode === 'focus' ? focusTime * 60 : breakTime * 60);
  }, [focusTime, breakTime, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? focusTime * 60 : breakTime * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'focus' 
    ? ((focusTime * 60 - timeLeft) / (focusTime * 60)) * 100
    : ((breakTime * 60 - timeLeft) / (breakTime * 60)) * 100;

  const saveSettings = () => {
    setSettingsVisible(false);
    // Could add toast notification here
  };

  return (
    <Card 
      id="pomodoro"
      className={`pomodoro-container ${mode === 'focus' ? 'bg-card' : 'bg-card/80 border-green-800/20'}`}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Pomodoro Timer
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-xs flex items-center">
              <Brain className="h-3 w-3 mr-1" />
              {sessionsCompleted} sessions
            </Badge>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSettingsVisible(!settingsVisible)}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <Tabs defaultValue="focus" value={mode} onValueChange={setMode}>
            <TabsList className="mb-4">
              <TabsTrigger value="focus" className="flex items-center gap-1">
                <Brain className="h-4 w-4" />
                Focus
              </TabsTrigger>
              <TabsTrigger value="break" className="flex items-center gap-1">
                <Coffee className="h-4 w-4" />
                Break
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {settingsVisible && (
            <div className="w-full space-y-4 mb-6 bg-muted p-4 rounded-md border border-border/50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium flex items-center">
                  <Settings className="h-4 w-4 mr-1.5" />
                  Timer Settings
                </h3>
                <Button size="sm" variant="secondary" onClick={saveSettings} className="h-8">
                  <Save className="h-4 w-4 mr-1.5" />
                  Save
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <Brain className="h-4 w-4 mr-1.5 text-primary" />
                    Focus Time (min): {focusTime}
                  </span>
                </div>
                <Slider
                  min={5}
                  max={60}
                  step={5}
                  value={[focusTime]}
                  onValueChange={(val) => setFocusTime(val[0])}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <Coffee className="h-4 w-4 mr-1.5 text-green-500" />
                    Break Time (min): {breakTime}
                  </span>
                </div>
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  value={[breakTime]}
                  onValueChange={(val) => setBreakTime(val[0])}
                />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <span className="text-sm flex items-center">
                  <Bell className="h-4 w-4 mr-1.5" />
                  Notification Sound
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="relative w-48 h-48 flex items-center justify-center mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress) / 100}
                className={mode === 'focus' ? 'text-primary' : 'text-green-500'}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-mono font-bold">{formatTime(timeLeft)}</div>
              <div className="text-xs capitalize text-muted-foreground flex items-center">
                {mode === 'focus' ? 
                  <><Brain className="h-3 w-3 mr-1" /> Focus mode</> : 
                  <><Coffee className="h-3 w-3 mr-1" /> Break mode</>
                }
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-2">
            <Button 
              onClick={toggleTimer} 
              variant="default" 
              className={mode === 'focus' ? 'bg-primary hover:bg-primary/90' : 'bg-green-600 hover:bg-green-700'}
            >
              {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={resetTimer} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;

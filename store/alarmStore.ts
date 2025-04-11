import { create } from 'zustand';

export interface Alarm {
  id: string;
  time: string;
  days: number[];
  enabled: boolean;
  label?: string;
  requirePhoto: boolean;
  mathProblems: boolean;
}

interface Statistics {
  successRate: number;
  averageWakeTime: string;
  snoozeCount: number;
  currentStreak: number;
}

interface Settings {
  vibration: boolean;
  sound: boolean;
  defaultSound: string;
  requirePhoto: boolean;
  mathProblems: boolean;
}

interface AlarmStore {
  alarms: Alarm[];
  statistics: Statistics;
  settings: Settings;
  addAlarm: (alarm: Omit<Alarm, 'id'>) => void;
  toggleAlarm: (id: string) => void;
  deleteAlarm: (id: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  updateStatistics: (stats: Partial<Statistics>) => void;
}

export const useAlarmStore = create<AlarmStore>((set) => ({
  alarms: [],
  statistics: {
    successRate: 85,
    averageWakeTime: '7:30 AM',
    snoozeCount: 3,
    currentStreak: 5,
  },
  settings: {
    vibration: true,
    sound: true,
    defaultSound: 'Classic',
    requirePhoto: false,
    mathProblems: false,
  },
  addAlarm: (alarm) =>
    set((state) => ({
      alarms: [...state.alarms, { ...alarm, id: Math.random().toString() }],
    })),
  toggleAlarm: (id) =>
    set((state) => ({
      alarms: state.alarms.map((alarm) =>
        alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
      ),
    })),
  deleteAlarm: (id) =>
    set((state) => ({
      alarms: state.alarms.filter((alarm) => alarm.id !== id),
    })),
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
  updateStatistics: (newStats) =>
    set((state) => ({
      statistics: { ...state.statistics, ...newStats },
    })),
}));
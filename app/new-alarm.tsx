import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X, Check } from 'lucide-react-native';
import { useAlarmStore } from '@/store/alarmStore';
import { format } from 'date-fns';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function NewAlarmScreen() {
  const insets = useSafeAreaInsets();
  const addAlarm = useAlarmStore((state) => state.addAlarm);
  const [time, setTime] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [label, setLabel] = useState('');
  const [requirePhoto, setRequirePhoto] = useState(false);
  const [mathProblems, setMathProblems] = useState(false);

  const toggleDay = (index: number) => {
    if (selectedDays.includes(index)) {
      setSelectedDays(selectedDays.filter((day) => day !== index));
    } else {
      setSelectedDays([...selectedDays, index]);
    }
  };

  const handleSave = () => {
    addAlarm({
      time: format(time, 'h:mm a'),
      days: selectedDays,
      enabled: true,
      label,
      requirePhoto,
      mathProblems,
    });
    router.back();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>New Alarm</Text>
        <TouchableOpacity onPress={handleSave}>
          <Check color="#2563eb" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.timeContainer}>
          <TextInput
            style={styles.timeInput}
            value={format(time, 'h:mm')}
            onChangeText={(text) => {
              const [hours, minutes] = text.split(':').map(Number);
              const newTime = new Date();
              newTime.setHours(hours);
              newTime.setMinutes(minutes || 0);
              setTime(newTime);
            }}
            keyboardType="numbers-and-punctuation"
            maxLength={5}
            placeholder="12:00"
          />
          <Text style={styles.ampm}>{format(time, 'a')}</Text>
        </View>

        <View style={styles.daysContainer}>
          {DAYS.map((day, index) => (
            <TouchableOpacity
              key={day}
              style={[styles.dayButton, selectedDays.includes(index) && styles.dayButtonActive]}
              onPress={() => toggleDay(index)}>
              <Text
                style={[styles.dayText, selectedDays.includes(index) && styles.dayTextActive]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.labelInput}
            value={label}
            onChangeText={setLabel}
            placeholder="Alarm label (optional)"
            placeholderTextColor="#71717a"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wake-up Verification</Text>

          <View style={styles.setting}>
            <Text style={styles.settingText}>Take a Photo</Text>
            <Switch
              value={requirePhoto}
              onValueChange={setRequirePhoto}
              trackColor={{ false: '#3f3f46', true: '#2563eb' }}
            />
          </View>

          <View style={styles.setting}>
            <Text style={styles.settingText}>Solve Math Problems</Text>
            <Switch
              value={mathProblems}
              onValueChange={setMathProblems}
              trackColor={{ false: '#3f3f46', true: '#2563eb' }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  timeInput: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: 200,
  },
  ampm: {
    fontSize: 24,
    color: '#fff',
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#27272a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButtonActive: {
    backgroundColor: '#2563eb',
  },
  dayText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  dayTextActive: {
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 32,
  },
  labelInput: {
    backgroundColor: '#18181b',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#fff',
  },
});
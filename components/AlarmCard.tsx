import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Trash2, Camera, Calculator } from 'lucide-react-native';
import { useAlarmStore, Alarm } from '@/store/alarmStore';

interface AlarmCardProps {
  alarm: Alarm;
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function AlarmCard({ alarm }: AlarmCardProps) {
  const toggleAlarm = useAlarmStore((state) => state.toggleAlarm);
  const deleteAlarm = useAlarmStore((state) => state.deleteAlarm);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.time}>{alarm.time}</Text>
        <View style={styles.days}>
          {DAYS.map((day, index) => (
            <Text
              key={index}
              style={[
                styles.day,
                alarm.days.includes(index) && styles.dayActive,
              ]}>
              {day}
            </Text>
          ))}
        </View>
        {alarm.label && <Text style={styles.label}>{alarm.label}</Text>}
        
        <View style={styles.verificationMethods}>
          {alarm.requirePhoto && (
            <View style={styles.verificationMethod}>
              <Camera size={16} color="#2563eb" />
              <Text style={styles.verificationText}>Photo Required</Text>
            </View>
          )}
          {alarm.mathProblems && (
            <View style={styles.verificationMethod}>
              <Calculator size={16} color="#2563eb" />
              <Text style={styles.verificationText}>Math Problems</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <Switch
          value={alarm.enabled}
          onValueChange={() => toggleAlarm(alarm.id)}
          trackColor={{ false: '#3f3f46', true: '#2563eb' }}
        />
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteAlarm(alarm.id)}>
          <Trash2 color="#ef4444" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18181b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  time: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  days: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  day: {
    color: '#71717a',
    fontSize: 14,
    fontWeight: '500',
  },
  dayActive: {
    color: '#2563eb',
  },
  label: {
    color: '#a1a1aa',
    fontSize: 14,
    marginBottom: 8,
  },
  verificationMethods: {
    flexDirection: 'row',
    gap: 12,
  },
  verificationMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verificationText: {
    color: '#2563eb',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  deleteButton: {
    padding: 8,
  },
});
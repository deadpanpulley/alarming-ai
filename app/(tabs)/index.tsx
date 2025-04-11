import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useAlarmStore } from '@/store/alarmStore';
import { AlarmCard } from '@/components/AlarmCard';

export default function AlarmsScreen() {
  const insets = useSafeAreaInsets();
  const alarms = useAlarmStore((state) => state.alarms);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Alarms</Text>
        <Link href="/new-alarm" asChild>
          <TouchableOpacity style={styles.addButton}>
            <Plus color="#fff" size={24} />
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView style={styles.alarmList}>
        {alarms.map((alarm) => (
          <AlarmCard key={alarm.id} alarm={alarm} />
        ))}
        {alarms.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No alarms set</Text>
            <Text style={styles.emptyStateSubtext}>
              Tap the + button to create your first alarm
            </Text>
          </View>
        )}
      </ScrollView>
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alarmList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#71717a',
    textAlign: 'center',
  },
});
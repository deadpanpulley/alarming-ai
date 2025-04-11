import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAlarmStore } from '@/store/alarmStore';
import { StatCard } from '@/components/StatCard';

export default function StatisticsScreen() {
  const insets = useSafeAreaInsets();
  const stats = useAlarmStore((state) => state.statistics);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Statistics</Text>
      
      <ScrollView style={styles.content}>
        <View style={styles.statsGrid}>
          <StatCard
            title="Wake-up Success Rate"
            value={`${stats.successRate}%`}
            trend={stats.successRate > 75 ? 'up' : 'down'}
          />
          <StatCard
            title="Average Wake Time"
            value={stats.averageWakeTime}
            subtitle="This Week"
          />
          <StatCard
            title="Snooze Count"
            value={stats.snoozeCount.toString()}
            subtitle="This Week"
            trend={stats.snoozeCount < 5 ? 'up' : 'down'}
          />
          <StatCard
            title="Streak"
            value={`${stats.currentStreak} days`}
            subtitle="Current Streak"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
});
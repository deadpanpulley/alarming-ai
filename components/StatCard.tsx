import { View, Text, StyleSheet } from 'react-native';
import { TrendingDown, TrendingUp } from 'lucide-react-native';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: 'up' | 'down';
}

export function StatCard({ title, value, subtitle, trend }: StatCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        {trend && (
          <View
            style={[
              styles.trendContainer,
              trend === 'up' ? styles.trendUp : styles.trendDown,
            ]}>
            {trend === 'up' ? (
              <TrendingUp size={16} color="#22c55e" />
            ) : (
              <TrendingDown size={16} color="#ef4444" />
            )}
          </View>
        )}
      </View>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18181b',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    color: '#a1a1aa',
    marginBottom: 8,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  trendContainer: {
    padding: 4,
    borderRadius: 8,
  },
  trendUp: {
    backgroundColor: '#22c55e20',
  },
  trendDown: {
    backgroundColor: '#ef444420',
  },
  subtitle: {
    fontSize: 12,
    color: '#71717a',
    marginTop: 4,
  },
});
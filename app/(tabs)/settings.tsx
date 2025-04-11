import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAlarmStore } from '@/store/alarmStore';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const settings = useAlarmStore((state) => state.settings);
  const updateSettings = useAlarmStore((state) => state.updateSettings);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        
        <View style={styles.setting}>
          <Text style={styles.settingText}>Vibration</Text>
          <Switch
            value={settings.vibration}
            onValueChange={(value) => updateSettings({ vibration: value })}
            trackColor={{ false: '#3f3f46', true: '#2563eb' }}
          />
        </View>

        <View style={styles.setting}>
          <Text style={styles.settingText}>Sound</Text>
          <Switch
            value={settings.sound}
            onValueChange={(value) => updateSettings({ sound: value })}
            trackColor={{ false: '#3f3f46', true: '#2563eb' }}
          />
        </View>

        <TouchableOpacity style={styles.setting}>
          <Text style={styles.settingText}>Default Alarm Sound</Text>
          <Text style={styles.settingValue}>{settings.defaultSound}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wake-up Verification</Text>
        
        <View style={styles.setting}>
          <Text style={styles.settingText}>Require Photo</Text>
          <Switch
            value={settings.requirePhoto}
            onValueChange={(value) => updateSettings({ requirePhoto: value })}
            trackColor={{ false: '#3f3f46', true: '#2563eb' }}
          />
        </View>

        <View style={styles.setting}>
          <Text style={styles.settingText}>Math Problems</Text>
          <Switch
            value={settings.mathProblems}
            onValueChange={(value) => updateSettings({ mathProblems: value })}
            trackColor={{ false: '#3f3f46', true: '#2563eb' }}
          />
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
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
  settingValue: {
    fontSize: 16,
    color: '#71717a',
  },
});
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAlarmStore } from '@/store/alarmStore';

function generateMathProblem() {
  const operations = ['+', '-', '*'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  let num1 = Math.floor(Math.random() * 20) + 1;
  let num2 = Math.floor(Math.random() * 20) + 1;

  if (operation === '-') {
    // Ensure the result is positive
    num1 = Math.max(num1, num2);
  }

  let answer;
  switch (operation) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case '*':
      answer = num1 * num2;
      break;
    default:
      answer = 0;
  }

  return {
    problem: `${num1} ${operation} ${num2}`,
    answer: answer.toString(),
  };
}

export default function MathVerificationScreen() {
  const insets = useSafeAreaInsets();
  const updateStats = useAlarmStore((state) => state.updateStatistics);
  const [problem] = useState(generateMathProblem());
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (answer === problem.answer) {
      updateStats({ successRate: 90, currentStreak: 6 });
      router.back();
    } else {
      setError('Wrong answer, try again!');
      setAnswer('');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Solve to Dismiss</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.problem}>{problem.problem} = ?</Text>
        
        <TextInput
          style={styles.input}
          value={answer}
          onChangeText={(text) => {
            setError('');
            setAnswer(text);
          }}
          keyboardType="number-pad"
          placeholder="Enter your answer"
          placeholderTextColor="#71717a"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, !answer && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!answer}>
          <Text style={styles.buttonText}>Check Answer</Text>
        </TouchableOpacity>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  problem: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#18181b',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  error: {
    color: '#ef4444',
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: '#3f3f46',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
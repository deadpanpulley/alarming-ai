import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera as CameraIcon, Check } from 'lucide-react-native';
import { CameraView, CameraType } from 'expo-camera';
import { manipulateAsync } from 'expo-image-manipulator';
import { useAlarmStore } from '@/store/alarmStore';

export default function VerifyWakeUpScreen() {
  const insets = useSafeAreaInsets();
  const [type] = useState<CameraType>('front');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<any>(null);
  const updateStats = useAlarmStore((state) => state.updateStatistics);

  const requestPermission = async () => {
    const { status } = await CameraView.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      
      // Process the image (resize, compress, etc.)
      const processedPhoto = await manipulateAsync(
        photo.uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7 }
      );

      // Update statistics and dismiss
      updateStats({ successRate: 90, currentStreak: 6 });
      router.back();
    }
  };

  if (hasPermission === null) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionText}>Grant Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.errorText}>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Take a Wake-up Selfie</Text>
      </View>

      <CameraView
        ref={cameraRef}
        style={styles.camera}
        type={type}>
        <View style={styles.overlay}>
          <Text style={styles.instruction}>
            Take a clear photo of yourself to verify you're awake
          </Text>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <CameraIcon color="#fff" size={32} />
          </TouchableOpacity>
        </View>
      </CameraView>
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
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    padding: 20,
  },
  instruction: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
  permissionButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    margin: 20,
  },
  permissionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
});
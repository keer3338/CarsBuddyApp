import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function TasksScreen() {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [beforePhoto, setBeforePhoto] = useState<string | null>(null);
  const [afterPhoto, setAfterPhoto] = useState<string | null>(null);
  const [remarks, setRemarks] = useState('');
  const [serviceStarted, setServiceStarted] = useState(false);

  const tasks = [
    {
      id: '1',
      vehicle: 'KA02CD5678',
      brand: 'Audi A4',
      customer: 'Sneha Reddy',
      apartment: 'Brigade Gateway',
      parking: 'A-102',
      service: 'Interior Cleaning',
      credits: 4,
      status: 'pending',
    },
    {
      id: '2',
      vehicle: 'KA03EF9012',
      brand: 'Mercedes C-Class',
      customer: 'Arjun Kumar',
      apartment: 'Prestige Lakeside',
      parking: 'C-301',
      service: 'Exterior Wash',
      credits: 1,
      status: 'pending',
    },
    {
      id: '3',
      vehicle: 'KA04GH3456',
      brand: 'BMW 5 Series',
      customer: 'Rahul Mehta',
      apartment: 'Brigade Gateway',
      parking: 'B-405',
      service: 'Foam Wash',
      credits: 6,
      status: 'pending',
    },
  ];

  const pickImage = async (type: 'before' | 'after') => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      if (type === 'before') {
        setBeforePhoto(base64Image);
      } else {
        setAfterPhoto(base64Image);
      }
    }
  };

  const handleStartService = () => {
    setServiceStarted(true);
    Alert.alert('Service Started', 'Please take a before photo to continue');
  };

  const handleCompleteService = () => {
    if (!beforePhoto || !afterPhoto) {
      Alert.alert('Error', 'Please upload both before and after photos');
      return;
    }
    Alert.alert('Success', 'Service completed successfully! Credits deducted from customer.');
    setShowModal(false);
    resetServiceData();
  };

  const resetServiceData = () => {
    setServiceStarted(false);
    setBeforePhoto(null);
    setAfterPhoto(null);
    setRemarks('');
    setSelectedTask(null);
  };

  const openTaskModal = (task: any) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.header}>
        <Text style={styles.headerTitle}>Assigned Tasks</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.tasksContainer}>
          <Text style={styles.sectionTitle}>Pending Tasks ({tasks.length})</Text>
          {tasks.map((task) => (
            <TouchableOpacity key={task.id} onPress={() => openTaskModal(task)}>
              <Card variant="elevated" style={styles.taskCard}>
                <View style={styles.taskHeader}>
                  <Ionicons name="car-sport" size={32} color={COLORS.accent} />
                  <View style={styles.taskInfo}>
                    <Text style={styles.taskVehicle}>
                      {task.vehicle} - {task.brand}
                    </Text>
                    <Text style={styles.taskCustomer}>{task.customer}</Text>
                  </View>
                </View>

                <View style={styles.taskDetails}>
                  <View style={styles.taskDetail}>
                    <Ionicons name="location" size={16} color={COLORS.gray} />
                    <Text style={styles.taskDetailText}>{task.apartment}</Text>
                  </View>
                  <View style={styles.taskDetail}>
                    <Ionicons name="car" size={16} color={COLORS.gray} />
                    <Text style={styles.taskDetailText}>Slot: {task.parking}</Text>
                  </View>
                </View>

                <View style={styles.taskFooter}>
                  <View style={styles.serviceBadge}>
                    <Ionicons name="water" size={14} color={COLORS.accent} />
                    <Text style={styles.serviceText}>{task.service}</Text>
                  </View>
                  <View style={styles.creditsBadge}>
                    <Ionicons name="diamond" size={12} color={COLORS.accent} />
                    <Text style={styles.creditsText}>{task.credits} Credits</Text>
                  </View>
                </View>

                <View style={styles.startAction}>
                  <Ionicons name="play-circle" size={20} color={COLORS.accent} />
                  <Text style={styles.startText}>Tap to start service</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Service Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setShowModal(false);
          resetServiceData();
        }}
      >
        <View style={styles.modalOverlay}>
          <ScrollView style={styles.modalScroll} contentContainerStyle={styles.modalScrollContent}>
            <Card variant="elevated" style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Complete Service</Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowModal(false);
                    resetServiceData();
                  }}
                >
                  <Ionicons name="close-circle" size={28} color={COLORS.gray} />
                </TouchableOpacity>
              </View>

              {/* Task Info */}
              <View style={styles.modalTaskInfo}>
                <Text style={styles.modalVehicle}>
                  {selectedTask?.vehicle} - {selectedTask?.brand}
                </Text>
                <Text style={styles.modalCustomer}>{selectedTask?.customer}</Text>
                <View style={styles.modalService}>
                  <Ionicons name="water" size={16} color={COLORS.accent} />
                  <Text style={styles.modalServiceText}>{selectedTask?.service}</Text>
                </View>
              </View>

              {!serviceStarted ? (
                <Button
                  title="Start Service"
                  onPress={handleStartService}
                  style={styles.startBtn}
                />
              ) : (
                <>
                  {/* Photo Upload Section */}
                  <View style={styles.photoSection}>
                    <Text style={styles.photoTitle}>Before Photo *</Text>
                    {beforePhoto ? (
                      <View style={styles.photoPreview}>
                        <Image source={{ uri: beforePhoto }} style={styles.photoImage} />
                        <TouchableOpacity
                          style={styles.photoRetake}
                          onPress={() => pickImage('before')}
                        >
                          <Ionicons name="refresh" size={20} color={COLORS.white} />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.photoUpload}
                        onPress={() => pickImage('before')}
                      >
                        <Ionicons name="camera" size={40} color={COLORS.accent} />
                        <Text style={styles.photoUploadText}>Take Before Photo</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={styles.photoSection}>
                    <Text style={styles.photoTitle}>After Photo *</Text>
                    {afterPhoto ? (
                      <View style={styles.photoPreview}>
                        <Image source={{ uri: afterPhoto }} style={styles.photoImage} />
                        <TouchableOpacity
                          style={styles.photoRetake}
                          onPress={() => pickImage('after')}
                        >
                          <Ionicons name="refresh" size={20} color={COLORS.white} />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.photoUpload}
                        onPress={() => pickImage('after')}
                        disabled={!beforePhoto}
                      >
                        <Ionicons
                          name="camera"
                          size={40}
                          color={beforePhoto ? COLORS.accent : COLORS.gray}
                        />
                        <Text
                          style={[
                            styles.photoUploadText,
                            !beforePhoto && styles.photoUploadTextDisabled,
                          ]}
                        >
                          Take After Photo
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Remarks */}
                  <Input
                    label="Remarks (Optional)"
                    placeholder="Add any notes about the service..."
                    value={remarks}
                    onChangeText={setRemarks}
                    multiline
                  />

                  {/* Complete Button */}
                  <Button
                    title="Complete Service"
                    onPress={handleCompleteService}
                    disabled={!beforePhoto || !afterPhoto}
                    style={styles.completeBtn}
                  />
                </>
              )}
            </Card>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    paddingTop: 50,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  tasksContainer: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.cream,
    marginBottom: SPACING.md,
  },
  taskCard: {
    marginBottom: SPACING.md,
    padding: SPACING.md,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  taskInfo: {
    flex: 1,
  },
  taskVehicle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 4,
  },
  taskCustomer: {
    fontSize: 14,
    color: COLORS.gray,
  },
  taskDetails: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  taskDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  taskDetailText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  serviceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    gap: 4,
  },
  serviceText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '600',
  },
  creditsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  creditsText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '600',
  },
  startAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    gap: SPACING.xs,
  },
  startText: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalScroll: {
    flex: 1,
  },
  modalScrollContent: {
    padding: SPACING.lg,
  },
  modalCard: {
    marginTop: 60,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.cream,
  },
  modalTaskInfo: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.lg,
  },
  modalVehicle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 4,
  },
  modalCustomer: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: SPACING.sm,
  },
  modalService: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  modalServiceText: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
  },
  startBtn: {
    marginTop: SPACING.md,
  },
  photoSection: {
    marginBottom: SPACING.lg,
  },
  photoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.cream,
    marginBottom: SPACING.sm,
  },
  photoUpload: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderStyle: 'dashed',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoUploadText: {
    fontSize: 14,
    color: COLORS.accent,
    marginTop: SPACING.sm,
    fontWeight: '600',
  },
  photoUploadTextDisabled: {
    color: COLORS.gray,
  },
  photoPreview: {
    position: 'relative',
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: 200,
    borderRadius: BORDER_RADIUS.md,
  },
  photoRetake: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.secondary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeBtn: {
    marginTop: SPACING.md,
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { SERVICES } from '../../constants/data';

export default function BookingsScreen() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState('');

  const bookings = [
    {
      id: '1',
      service: 'Foam Wash',
      date: '25 Jan 2025',
      time: '10:00 AM',
      status: 'confirmed',
      credits: 6,
    },
    {
      id: '2',
      service: 'Interior Cleaning',
      date: '28 Jan 2025',
      time: '02:00 PM',
      status: 'confirmed',
      credits: 4,
    },
    {
      id: '3',
      service: 'Exterior Wash',
      date: '20 Jan 2025',
      time: '09:30 AM',
      status: 'completed',
      credits: 1,
    },
  ];

  const timeSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'];

  const handleBooking = () => {
    if (!selectedSlot) {
      Alert.alert('Error', 'Please select a time slot');
      return;
    }
    Alert.alert('Success', 'Booking confirmed! You will receive a confirmation shortly.');
    setShowBookingModal(false);
    setSelectedSlot('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return COLORS.warning;
      case 'completed':
        return COLORS.success;
      case 'cancelled':
        return COLORS.error;
      default:
        return COLORS.gray;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.header}>
        <Text style={styles.headerTitle}>Bookings</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Quick Book Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Book a Service</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {SERVICES.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => {
                  setSelectedService(service);
                  setShowBookingModal(true);
                }}
              >
                <Card variant="glass" style={styles.serviceCardInner}>
                  <Ionicons name={service.icon as any} size={32} color={COLORS.accent} />
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <View style={styles.creditsBadge}>
                    <Ionicons name="diamond" size={10} color={COLORS.accent} />
                    <Text style={styles.creditsText}>{service.credits}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* My Bookings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Bookings</Text>
          {bookings.map((booking) => (
            <Card key={booking.id} variant="elevated" style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingService}>{booking.service}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(booking.status) + '20' },
                    ]}
                  >
                    <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                      {booking.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.creditsBadgeLarge}>
                  <Ionicons name="diamond" size={12} color={COLORS.accent} />
                  <Text style={styles.creditsTextLarge}>{booking.credits}</Text>
                </View>
              </View>
              <View style={styles.bookingDetails}>
                <View style={styles.bookingDetail}>
                  <Ionicons name="calendar" size={16} color={COLORS.gray} />
                  <Text style={styles.bookingDetailText}>{booking.date}</Text>
                </View>
                <View style={styles.bookingDetail}>
                  <Ionicons name="time" size={16} color={COLORS.gray} />
                  <Text style={styles.bookingDetailText}>{booking.time}</Text>
                </View>
              </View>
              {booking.status === 'confirmed' && (
                <View style={styles.bookingActions}>
                  <Button
                    title="Reschedule"
                    variant="outline"
                    size="small"
                    onPress={() => {}}
                    style={styles.actionBtn}
                  />
                  <Button
                    title="Cancel"
                    variant="ghost"
                    size="small"
                    onPress={() => {}}
                    style={styles.actionBtn}
                    textStyle={{ color: COLORS.error }}
                  />
                </View>
              )}
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* Booking Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Card variant="elevated" style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Book {selectedService?.name}</Text>
                <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                  <Ionicons name="close-circle" size={28} color={COLORS.gray} />
                </TouchableOpacity>
              </View>

              <View style={styles.serviceInfo}>
                <Ionicons name={selectedService?.icon} size={40} color={COLORS.accent} />
                <View style={styles.serviceInfoText}>
                  <Text style={styles.serviceInfoName}>{selectedService?.name}</Text>
                  <View style={styles.creditsBadgeLarge}>
                    <Ionicons name="diamond" size={12} color={COLORS.accent} />
                    <Text style={styles.creditsTextLarge}>
                      {selectedService?.credits} Credits
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.slotLabel}>Select Time Slot</Text>
              <View style={styles.slotsContainer}>
                {timeSlots.map((slot) => (
                  <TouchableOpacity
                    key={slot}
                    style={[
                      styles.slotCard,
                      selectedSlot === slot && styles.slotCardActive,
                    ]}
                    onPress={() => setSelectedSlot(slot)}
                  >
                    <Ionicons
                      name="time"
                      size={20}
                      color={selectedSlot === slot ? COLORS.primary : COLORS.accent}
                    />
                    <Text
                      style={[
                        styles.slotText,
                        selectedSlot === slot && styles.slotTextActive,
                      ]}
                    >
                      {slot}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Input label="Special Instructions (Optional)" placeholder="Any specific requests..." />

              <Button
                title="Confirm Booking"
                onPress={handleBooking}
                style={styles.confirmBtn}
              />
            </Card>
          </View>
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
  section: {
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.cream,
    marginBottom: SPACING.md,
  },
  serviceCard: {
    width: 150,
    height: 150,
    marginRight: SPACING.md,
  },
  serviceCardInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
  },
  serviceName: {
    fontSize: 14,
    color: COLORS.white,
    marginTop: SPACING.sm,
    textAlign: 'center',
    fontWeight: '600',
  },
  creditsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    marginTop: SPACING.xs,
    gap: 4,
  },
  creditsText: {
    fontSize: 10,
    color: COLORS.accent,
    fontWeight: '600',
  },
  bookingCard: {
    marginBottom: SPACING.md,
    padding: SPACING.lg,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingService: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  creditsBadgeLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    gap: 4,
  },
  creditsTextLarge: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '600',
  },
  bookingDetails: {
    flexDirection: 'row',
    gap: SPACING.lg,
    marginBottom: SPACING.md,
  },
  bookingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  bookingDetailText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.sm,
  },
  actionBtn: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    maxHeight: '90%',
  },
  modalCard: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    maxHeight: '100%',
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
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  serviceInfoText: {
    flex: 1,
  },
  serviceInfoName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  slotLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.cream,
    marginBottom: SPACING.md,
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  slotCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: SPACING.xs,
  },
  slotCardActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  slotText: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
  },
  slotTextActive: {
    color: COLORS.primary,
  },
  confirmBtn: {
    marginTop: SPACING.md,
  },
});

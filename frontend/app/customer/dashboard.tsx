import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export default function CustomerDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const { width: windowWidth } = useWindowDimensions();
  const ACTION_CARD_WIDTH = (windowWidth - SPACING.lg * 2 - SPACING.md) / 2;

  // Mock data - In real app, fetch from API
  const subscriptionData = {
    plan: 'Premium Plan',
    creditsTotal: 60,
    creditsUsed: 23,
    creditsRemaining: 37,
    expiryDate: '28 Feb 2025',
  };

  const todayService = {
    status: 'completed',
    time: '09:30 AM',
    cleaner: 'Ravi Kumar',
  };

  const upcomingBookings = [
    { id: '1', service: 'Foam Wash', date: '25 Jan', time: '10:00 AM', credits: 6 },
    { id: '2', service: 'Interior Cleaning', date: '28 Jan', time: '02:00 PM', credits: 4 },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || 'Customer'}!</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={24} color={COLORS.accent} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Credit Wallet Card */}
        <LinearGradient
          colors={[COLORS.accent, COLORS.accentDark]}
          style={styles.walletCard}
        >
          <View style={styles.walletHeader}>
            <Ionicons name="diamond" size={32} color={COLORS.primary} />
            <Text style={styles.walletTitle}>Credit Wallet</Text>
          </View>
          <View style={styles.walletContent}>
            <View style={styles.walletMain}>
              <Text style={styles.creditsLarge}>{subscriptionData.creditsRemaining}</Text>
              <Text style={styles.creditsLabel}>Credits Remaining</Text>
            </View>
            <View style={styles.walletDetails}>
              <View style={styles.walletRow}>
                <Text style={styles.walletText}>Total: {subscriptionData.creditsTotal}</Text>
              </View>
              <View style={styles.walletRow}>
                <Text style={styles.walletText}>Used: {subscriptionData.creditsUsed}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/customer/wallet')}>
            <Text style={styles.viewDetails}>View Details →</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Active Subscription */}
        <Card variant="elevated" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="card" size={24} color={COLORS.accent} />
            <Text style={styles.sectionTitle}>Active Subscription</Text>
          </View>
          <View style={styles.subscriptionContent}>
            <Text style={styles.planName}>{subscriptionData.plan}</Text>
            <View style={styles.subscriptionRow}>
              <View style={styles.subscriptionItem}>
                <Text style={styles.subscriptionLabel}>Expires On</Text>
                <Text style={styles.subscriptionValue}>{subscriptionData.expiryDate}</Text>
              </View>
              <Button
                title="Renew"
                onPress={() => {}}
                size="small"
                variant="outline"
              />
            </View>
          </View>
        </Card>

        {/* Today's Service Status */}
        <Card variant="elevated" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="today" size={24} color={COLORS.accent} />
            <Text style={styles.sectionTitle}>Today's Service</Text>
          </View>
          <View style={styles.serviceStatus}>
            {todayService.status === 'completed' ? (
              <>
                <View style={styles.statusBadge}>
                  <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                  <Text style={styles.statusText}>Completed</Text>
                </View>
                <Text style={styles.serviceDetail}>Cleaned by {todayService.cleaner}</Text>
                <Text style={styles.serviceDetail}>at {todayService.time}</Text>
              </>
            ) : (
              <>
                <View style={styles.statusBadge}>
                  <Ionicons name="time" size={20} color={COLORS.warning} />
                  <Text style={styles.statusText}>Scheduled</Text>
                </View>
                <Text style={styles.serviceDetail}>Expected at {todayService.time}</Text>
              </>
            )}
          </View>
        </Card>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionCard, { width: ACTION_CARD_WIDTH }]}
              onPress={() => router.push('/customer/bookings')}
            >
              <Card variant="glass" style={styles.actionCardInner}>
                <Ionicons name="sparkles" size={32} color={COLORS.accent} />
                <Text style={styles.actionText}>Book Foam Wash</Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionCard, { width: ACTION_CARD_WIDTH }]}
              onPress={() => router.push('/customer/bookings')}
            >
              <Card variant="glass" style={styles.actionCardInner}>
                <Ionicons name="car" size={32} color={COLORS.accent} />
                <Text style={styles.actionText}>Interior Clean</Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionCard, { width: ACTION_CARD_WIDTH }]}
              onPress={() => router.push('/customer/wallet')}
            >
              <Card variant="glass" style={styles.actionCardInner}>
                <Ionicons name="wallet" size={32} color={COLORS.accent} />
                <Text style={styles.actionText}>View Wallet</Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionCard, { width: ACTION_CARD_WIDTH }]}
              onPress={() => {}}
            >
              <Card variant="glass" style={styles.actionCardInner}>
                <Ionicons name="alert-circle" size={32} color={COLORS.accent} />
                <Text style={styles.actionText}>Raise Issue</Text>
              </Card>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar" size={24} color={COLORS.accent} />
            <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
          </View>
          {upcomingBookings.map((booking) => (
            <Card key={booking.id} variant="glass" style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <Text style={styles.bookingService}>{booking.service}</Text>
                <View style={styles.creditsBadge}>
                  <Ionicons name="diamond" size={12} color={COLORS.accent} />
                  <Text style={styles.creditsText}>{booking.credits}</Text>
                </View>
              </View>
              <View style={styles.bookingDetails}>
                <View style={styles.bookingDetail}>
                  <Ionicons name="calendar-outline" size={16} color={COLORS.gray} />
                  <Text style={styles.bookingDetailText}>{booking.date}</Text>
                </View>
                <View style={styles.bookingDetail}>
                  <Ionicons name="time-outline" size={16} color={COLORS.gray} />
                  <Text style={styles.bookingDetailText}>{booking.time}</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
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
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: COLORS.cream,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 4,
  },
  logoutBtn: {
    padding: SPACING.sm,
  },
  scrollView: {
    flex: 1,
  },
  walletCard: {
    margin: SPACING.lg,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.gold,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  walletTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  walletContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  walletMain: {
    alignItems: 'flex-start',
  },
  creditsLarge: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  creditsLabel: {
    fontSize: 14,
    color: COLORS.primary,
    opacity: 0.8,
  },
  walletDetails: {
    alignItems: 'flex-end',
  },
  walletRow: {
    marginVertical: 2,
  },
  walletText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  viewDetails: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    textAlign: 'right',
  },
  section: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.cream,
  },
  subscriptionContent: {
    paddingTop: SPACING.sm,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.md,
  },
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subscriptionItem: {},
  subscriptionLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 4,
  },
  subscriptionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.accent,
  },
  serviceStatus: {
    paddingTop: SPACING.sm,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.xs,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  serviceDetail: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
  },
  quickActions: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.cream,
    marginBottom: SPACING.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  actionCard: {
    height: 120,
  },
  actionCardInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
  },
  actionText: {
    fontSize: 14,
    color: COLORS.white,
    marginTop: SPACING.sm,
    textAlign: 'center',
    fontWeight: '600',
  },
  bookingCard: {
    marginBottom: SPACING.md,
    padding: SPACING.md,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  bookingService: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  creditsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    gap: 4,
  },
  creditsText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '600',
  },
  bookingDetails: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  bookingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bookingDetailText: {
    fontSize: 12,
    color: COLORS.gray,
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';

export default function StaffDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const statsData = {
    todayCompleted: 8,
    todayPending: 4,
    todayTotal: 12,
    monthCompleted: 156,
  };

  const todayTasks = [
    {
      id: '1',
      vehicle: 'KA01AB1234 - BMW 3 Series',
      customer: 'Vikram Singh',
      apartment: 'Prestige Lakeside',
      parking: 'B-205',
      service: 'Exterior Wash',
      time: '09:00 AM',
      status: 'completed',
    },
    {
      id: '2',
      vehicle: 'KA02CD5678 - Audi A4',
      customer: 'Sneha Reddy',
      apartment: 'Brigade Gateway',
      parking: 'A-102',
      service: 'Interior Cleaning',
      time: '10:30 AM',
      status: 'pending',
    },
    {
      id: '3',
      vehicle: 'KA03EF9012 - Mercedes C-Class',
      customer: 'Arjun Kumar',
      apartment: 'Prestige Lakeside',
      parking: 'C-301',
      service: 'Exterior Wash',
      time: '11:00 AM',
      status: 'pending',
    },
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
            <Text style={styles.greeting}>Welcome,</Text>
            <Text style={styles.userName}>{user?.name || 'Staff Member'}!</Text>
            <Text style={styles.staffId}>ID: {user?.staff_id || 'STF001'}</Text>
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
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <LinearGradient colors={[COLORS.accent, COLORS.accentDark]} style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={32} color={COLORS.primary} />
            <Text style={styles.statValue}>{statsData.todayCompleted}</Text>
            <Text style={styles.statLabel}>Completed Today</Text>
          </LinearGradient>

          <Card variant="elevated" style={styles.statCard}>
            <Ionicons name="time" size={32} color={COLORS.warning} />
            <Text style={styles.statValue}>{statsData.todayPending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </Card>

          <Card variant="elevated" style={styles.statCard}>
            <Ionicons name="list" size={32} color={COLORS.accent} />
            <Text style={styles.statValue}>{statsData.todayTotal}</Text>
            <Text style={styles.statLabel}>Total Today</Text>
          </Card>

          <Card variant="elevated" style={styles.statCard}>
            <Ionicons name="trophy" size={32} color={COLORS.success} />
            <Text style={styles.statValue}>{statsData.monthCompleted}</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </Card>
        </View>

        {/* Attendance Status */}
        <Card variant="elevated" style={styles.section}>
          <View style={styles.attendanceHeader}>
            <Ionicons name="finger-print" size={24} color={COLORS.success} />
            <View style={styles.attendanceInfo}>
              <Text style={styles.attendanceText}>Checked In</Text>
              <Text style={styles.attendanceTime}>08:45 AM</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}>Check Out</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Today's Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <Text style={styles.taskCount}>
              {statsData.todayCompleted}/{statsData.todayTotal}
            </Text>
          </View>

          {todayTasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              onPress={() => task.status === 'pending' && router.push('/staff/tasks')}
              disabled={task.status !== 'pending'}
            >
              <Card
                variant={task.status === 'pending' ? 'elevated' : 'glass'}
                style={styles.taskCard}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskInfo}>
                    <Text style={styles.taskVehicle}>{task.vehicle}</Text>
                    <Text style={styles.taskCustomer}>{task.customer}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          task.status === 'completed' ? COLORS.success + '20' : COLORS.warning + '20',
                      },
                    ]}
                  >
                    <Ionicons
                      name={task.status === 'completed' ? 'checkmark-circle' : 'time'}
                      size={16}
                      color={task.status === 'completed' ? COLORS.success : COLORS.warning}
                    />
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color: task.status === 'completed' ? COLORS.success : COLORS.warning,
                        },
                      ]}
                    >
                      {task.status.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.taskDetails}>
                  <View style={styles.taskDetail}>
                    <Ionicons name="location" size={16} color={COLORS.gray} />
                    <Text style={styles.taskDetailText}>{task.apartment}</Text>
                  </View>
                  <View style={styles.taskDetail}>
                    <Ionicons name="car" size={16} color={COLORS.gray} />
                    <Text style={styles.taskDetailText}>{task.parking}</Text>
                  </View>
                  <View style={styles.taskDetail}>
                    <Ionicons name="time" size={16} color={COLORS.gray} />
                    <Text style={styles.taskDetailText}>{task.time}</Text>
                  </View>
                </View>

                <View style={styles.taskService}>
                  <Ionicons name="water" size={16} color={COLORS.accent} />
                  <Text style={styles.taskServiceText}>{task.service}</Text>
                </View>

                {task.status === 'pending' && (
                  <View style={styles.taskAction}>
                    <Ionicons name="arrow-forward-circle" size={20} color={COLORS.accent} />
                    <Text style={styles.taskActionText}>Tap to start service</Text>
                  </View>
                )}
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Route Information */}
        <Card variant="elevated" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="map" size={24} color={COLORS.accent} />
            <Text style={styles.sectionTitle}>Today's Route</Text>
          </View>
          <View style={styles.routeInfo}>
            <View style={styles.routeItem}>
              <Text style={styles.routeLabel}>Area</Text>
              <Text style={styles.routeValue}>Whitefield, Bangalore</Text>
            </View>
            <View style={styles.routeItem}>
              <Text style={styles.routeLabel}>Buildings</Text>
              <Text style={styles.routeValue}>4 Buildings</Text>
            </View>
            <View style={styles.routeItem}>
              <Text style={styles.routeLabel}>Total Vehicles</Text>
              <Text style={styles.routeValue}>12 Cars</Text>
            </View>
          </View>
        </Card>

        <View style={styles.bottomPadding} />
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
  staffId: {
    fontSize: 12,
    color: COLORS.accent,
    marginTop: 4,
  },
  logoutBtn: {
    padding: SPACING.sm,
  },
  scrollView: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
    gap: SPACING.md,
  },
  statCard: {
    width: '48%',
    padding: SPACING.lg,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.lg,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: SPACING.sm,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  section: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  attendanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  attendanceInfo: {
    flex: 1,
  },
  attendanceText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  attendanceTime: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  checkoutBtn: {
    backgroundColor: COLORS.error + '20',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  checkoutText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.error,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.cream,
  },
  taskCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  taskCard: {
    marginBottom: SPACING.md,
    padding: SPACING.md,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  taskDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
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
  taskService: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
    gap: 4,
    marginTop: SPACING.xs,
  },
  taskServiceText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '600',
  },
  taskAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    gap: SPACING.xs,
  },
  taskActionText: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
  },
  routeInfo: {
    marginTop: SPACING.sm,
  },
  routeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  routeLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  routeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  bottomPadding: {
    height: SPACING.xxl,
  },
});

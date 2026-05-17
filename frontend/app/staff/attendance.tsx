import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function AttendanceScreen() {
  const [checkedIn, setCheckedIn] = useState(true);
  const [checkInTime] = useState('08:45 AM');

  const attendanceHistory = [
    { date: '22 Jan 2025', checkIn: '08:45 AM', checkOut: '06:15 PM', status: 'present' },
    { date: '21 Jan 2025', checkIn: '08:50 AM', checkOut: '06:10 PM', status: 'present' },
    { date: '20 Jan 2025', checkIn: '09:05 AM', checkOut: '06:30 PM', status: 'late' },
    { date: '19 Jan 2025', checkIn: '08:40 AM', checkOut: '06:00 PM', status: 'present' },
    { date: '18 Jan 2025', checkIn: '--', checkOut: '--', status: 'absent' },
  ];

  const monthlyStats = {
    present: 20,
    late: 2,
    absent: 1,
    total: 23,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return COLORS.success;
      case 'late':
        return COLORS.warning;
      case 'absent':
        return COLORS.error;
      default:
        return COLORS.gray;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.header}>
        <Text style={styles.headerTitle}>Attendance</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Today's Attendance */}
        <LinearGradient
          colors={checkedIn ? [COLORS.success, COLORS.success + 'CC'] : [COLORS.accent, COLORS.accentDark]}
          style={styles.todayCard}
        >
          <View style={styles.todayHeader}>
            <Ionicons
              name={checkedIn ? 'checkmark-circle' : 'finger-print'}
              size={48}
              color={COLORS.white}
            />
            <View style={styles.todayInfo}>
              <Text style={styles.todayDate}>{format(new Date(), 'EEEE, d MMMM yyyy')}</Text>
              <Text style={styles.todayStatus}>
                {checkedIn ? 'Checked In' : 'Not Checked In'}
              </Text>
            </View>
          </View>

          {checkedIn ? (
            <View style={styles.todayDetails}>
              <View style={styles.todayTimeRow}>
                <View style={styles.todayTimeItem}>
                  <Text style={styles.todayTimeLabel}>Check In</Text>
                  <Text style={styles.todayTimeValue}>{checkInTime}</Text>
                </View>
                <View style={styles.todayTimeDivider} />
                <View style={styles.todayTimeItem}>
                  <Text style={styles.todayTimeLabel}>Duration</Text>
                  <Text style={styles.todayTimeValue}>8h 30m</Text>
                </View>
              </View>
              <Button
                title="Check Out"
                variant="secondary"
                onPress={() => {}}
                style={styles.checkOutBtn}
              />
            </View>
          ) : (
            <Button
              title="Check In Now"
              variant="secondary"
              onPress={() => {}}
              style={styles.checkInBtn}
            />
          )}
        </LinearGradient>

        {/* Monthly Stats */}
        <Card variant="elevated" style={styles.section}>
          <Text style={styles.sectionTitle}>This Month</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: COLORS.success + '20' }]}>
                <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
              </View>
              <Text style={styles.statValue}>{monthlyStats.present}</Text>
              <Text style={styles.statLabel}>Present</Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: COLORS.warning + '20' }]}>
                <Ionicons name="time" size={24} color={COLORS.warning} />
              </View>
              <Text style={styles.statValue}>{monthlyStats.late}</Text>
              <Text style={styles.statLabel}>Late</Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: COLORS.error + '20' }]}>
                <Ionicons name="close-circle" size={24} color={COLORS.error} />
              </View>
              <Text style={styles.statValue}>{monthlyStats.absent}</Text>
              <Text style={styles.statLabel}>Absent</Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Attendance Rate</Text>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={[COLORS.success, COLORS.success + 'CC']}
                style={[
                  styles.progressFill,
                  { width: `${(monthlyStats.present / monthlyStats.total) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round((monthlyStats.present / monthlyStats.total) * 100)}%
            </Text>
          </View>
        </Card>

        {/* Attendance History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attendance History</Text>
          {attendanceHistory.map((record, index) => (
            <Card key={index} variant="glass" style={styles.historyCard}>
              <View style={styles.historyRow}>
                <View style={styles.historyDate}>
                  <Ionicons name="calendar" size={20} color={COLORS.accent} />
                  <Text style={styles.historyDateText}>{record.date}</Text>
                </View>
                <View
                  style={[
                    styles.historyStatus,
                    { backgroundColor: getStatusColor(record.status) + '20' },
                  ]}
                >
                  <Text style={[styles.historyStatusText, { color: getStatusColor(record.status) }]}>
                    {record.status.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.historyTimes}>
                <View style={styles.historyTime}>
                  <Text style={styles.historyTimeLabel}>In:</Text>
                  <Text style={styles.historyTimeValue}>{record.checkIn}</Text>
                </View>
                <View style={styles.historyTime}>
                  <Text style={styles.historyTimeLabel}>Out:</Text>
                  <Text style={styles.historyTimeValue}>{record.checkOut}</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Leave Request */}
        <Card variant="elevated" style={styles.section}>
          <View style={styles.leaveHeader}>
            <Ionicons name="calendar-outline" size={24} color={COLORS.accent} />
            <Text style={styles.leaveTitle}>Request Leave</Text>
          </View>
          <Text style={styles.leaveDesc}>
            Need a day off? Submit your leave request to your supervisor.
          </Text>
          <Button title="Request Leave" variant="outline" onPress={() => {}} />
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
  todayCard: {
    margin: SPACING.lg,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
  },
  todayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  todayInfo: {
    flex: 1,
  },
  todayDate: {
    fontSize: 14,
    color: COLORS.white,
    marginBottom: 4,
  },
  todayStatus: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  todayDetails: {},
  todayTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  todayTimeItem: {
    flex: 1,
    alignItems: 'center',
  },
  todayTimeLabel: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.7,
    marginBottom: 4,
  },
  todayTimeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  todayTimeDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  checkOutBtn: {},
  checkInBtn: {},
  section: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.cream,
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },
  progressContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: SPACING.md,
  },
  progressLabel: {
    fontSize: 14,
    color: COLORS.cream,
    marginBottom: SPACING.sm,
  },
  progressBar: {
    height: 12,
    backgroundColor: COLORS.darkGray,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
    textAlign: 'right',
  },
  historyCard: {
    marginBottom: SPACING.md,
    padding: SPACING.md,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  historyDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  historyDateText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  historyStatus: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  historyStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  historyTimes: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  historyTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  historyTimeLabel: {
    fontSize: 12,
    color: COLORS.gray,
  },
  historyTimeValue: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.white,
  },
  leaveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  leaveTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.cream,
  },
  leaveDesc: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: SPACING.lg,
    lineHeight: 20,
  },
  bottomPadding: {
    height: SPACING.xxl,
  },
});

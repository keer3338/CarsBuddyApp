import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export default function StaffProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const performanceData = {
    rating: 4.8,
    totalServices: 356,
    completionRate: 98,
    customerSatisfaction: 4.9,
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <LinearGradient colors={[COLORS.accent, COLORS.accentDark]} style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color={COLORS.white} />
          </View>
          <Text style={styles.profileName}>{user?.name || 'Staff Member'}</Text>
          <Text style={styles.staffId}>Staff ID: {user?.staff_id || 'STF001'}</Text>
          <Text style={styles.profileMobile}>{user?.mobile}</Text>
          
          <View style={styles.ratingRow}>
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name={i < Math.floor(performanceData.rating) ? 'star' : 'star-outline'}
                size={20}
                color={COLORS.white}
              />
            ))}
            <Text style={styles.ratingText}>{performanceData.rating}</Text>
          </View>
        </LinearGradient>

        {/* Performance Stats */}
        <Card variant="elevated" style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Ionicons name="checkmark-done" size={32} color={COLORS.success} />
              <Text style={styles.statValue}>{performanceData.totalServices}</Text>
              <Text style={styles.statLabel}>Total Services</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="trending-up" size={32} color={COLORS.accent} />
              <Text style={styles.statValue}>{performanceData.completionRate}%</Text>
              <Text style={styles.statLabel}>Completion</Text>
            </View>
          </View>
          <View style={styles.satisfactionRow}>
            <View style={styles.satisfactionLeft}>
              <Ionicons name="happy" size={24} color={COLORS.success} />
              <Text style={styles.satisfactionText}>Customer Satisfaction</Text>
            </View>
            <Text style={styles.satisfactionValue}>{performanceData.customerSatisfaction}/5.0</Text>
          </View>
        </Card>

        {/* Work Details */}
        <Card variant="elevated" style={styles.section}>
          <Text style={styles.sectionTitle}>Work Details</Text>
          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="location" size={20} color={COLORS.accent} />
              <Text style={styles.detailLabel}>Assigned Area</Text>
            </View>
            <Text style={styles.detailValue}>Whitefield, Bangalore</Text>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="calendar" size={20} color={COLORS.accent} />
              <Text style={styles.detailLabel}>Joined On</Text>
            </View>
            <Text style={styles.detailValue}>15 Sep 2024</Text>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="time" size={20} color={COLORS.accent} />
              <Text style={styles.detailLabel}>Shift</Text>
            </View>
            <Text style={styles.detailValue}>08:00 AM - 06:00 PM</Text>
          </View>
        </Card>

        {/* Account Settings */}
        <Card variant="elevated" style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={20} color={COLORS.accent} />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="lock-closed" size={20} color={COLORS.accent} />
              <Text style={styles.settingText}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="language" size={20} color={COLORS.accent} />
              <Text style={styles.settingText}>Language</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>English</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-circle" size={20} color={COLORS.accent} />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </Card>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            style={styles.logoutBtn}
            textStyle={{ color: COLORS.error }}
          />
        </View>

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
  profileCard: {
    margin: SPACING.lg,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  staffId: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.8,
    marginBottom: SPACING.xs,
  },
  profileMobile: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.8,
    marginBottom: SPACING.md,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    marginLeft: SPACING.xs,
  },
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
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: SPACING.sm,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
    textAlign: 'center',
  },
  satisfactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  satisfactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
    minWidth: 0,
  },
  satisfactionText: {
    fontSize: 13,
    color: COLORS.white,
    flexShrink: 1,
  },
  satisfactionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    gap: SPACING.lg,
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flexShrink: 0,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.white,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.accent,
    flexShrink: 1,
    textAlign: 'right',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  settingText: {
    fontSize: 14,
    color: COLORS.white,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  settingValue: {
    fontSize: 14,
    color: COLORS.gray,
  },
  logoutSection: {
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.xl,
  },
  logoutBtn: {
    borderColor: COLORS.error,
  },
  bottomPadding: {
    height: SPACING.xl,
  },
});

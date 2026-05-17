import React, { useState } from 'react';
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
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const vehicles = [
    {
      id: '1',
      number: 'KA01AB1234',
      brand: 'BMW',
      model: '3 Series',
      color: 'Black',
      parkingSlot: 'B-205',
    },
  ];

  const handleSave = async () => {
    await updateUser({ name, email });
    setEditing(false);
    Alert.alert('Success', 'Profile updated successfully');
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
        {/* Profile Info */}
        <Card variant="elevated" style={styles.section}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color={COLORS.accent} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name}</Text>
              <Text style={styles.profileMobile}>{user?.mobile}</Text>
            </View>
            <TouchableOpacity
              onPress={() => (editing ? handleSave() : setEditing(true))}
              style={styles.editBtn}
            >
              <Ionicons
                name={editing ? 'checkmark-circle' : 'create'}
                size={24}
                color={COLORS.accent}
              />
            </TouchableOpacity>
          </View>

          {editing ? (
            <View style={styles.editForm}>
              <Input label="Full Name" value={name} onChangeText={setName} />
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => setEditing(false)}
                style={styles.cancelBtn}
              />
            </View>
          ) : (
            <View style={styles.profileDetails}>
              <View style={styles.profileDetailRow}>
                <Ionicons name="mail" size={20} color={COLORS.gray} />
                <Text style={styles.profileDetailText}>{email || 'Not provided'}</Text>
              </View>
              <View style={styles.profileDetailRow}>
                <Ionicons name="location" size={20} color={COLORS.gray} />
                <Text style={styles.profileDetailText}>Prestige Lakeside, Bangalore</Text>
              </View>
            </View>
          )}
        </Card>

        {/* My Vehicles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Vehicles</Text>
            <TouchableOpacity>
              <Ionicons name="add-circle" size={24} color={COLORS.accent} />
            </TouchableOpacity>
          </View>
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} variant="elevated" style={styles.vehicleCard}>
              <View style={styles.vehicleHeader}>
                <Ionicons name="car-sport" size={32} color={COLORS.accent} />
                <View style={styles.vehicleInfo}>
                  <Text style={styles.vehicleNumber}>{vehicle.number}</Text>
                  <Text style={styles.vehicleModel}>
                    {vehicle.brand} {vehicle.model}
                  </Text>
                </View>
              </View>
              <View style={styles.vehicleDetails}>
                <View style={styles.vehicleDetailItem}>
                  <Text style={styles.vehicleDetailLabel}>Color</Text>
                  <Text style={styles.vehicleDetailValue}>{vehicle.color}</Text>
                </View>
                <View style={styles.vehicleDetailItem}>
                  <Text style={styles.vehicleDetailLabel}>Parking</Text>
                  <Text style={styles.vehicleDetailValue}>{vehicle.parkingSlot}</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>

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
              <Ionicons name="card" size={20} color={COLORS.accent} />
              <Text style={styles.settingText}>Payment Methods</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="shield-checkmark" size={20} color={COLORS.accent} />
              <Text style={styles.settingText}>Privacy & Security</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
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
  section: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  profileMobile: {
    fontSize: 14,
    color: COLORS.gray,
  },
  editBtn: {
    padding: SPACING.sm,
  },
  editForm: {
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  cancelBtn: {
    marginTop: SPACING.md,
  },
  profileDetails: {
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  profileDetailText: {
    fontSize: 14,
    color: COLORS.white,
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
    marginBottom: SPACING.md,
  },
  vehicleCard: {
    marginBottom: SPACING.md,
    padding: SPACING.lg,
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  vehicleModel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  vehicleDetails: {
    flexDirection: 'row',
    gap: SPACING.xl,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  vehicleDetailItem: {},
  vehicleDetailLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 4,
  },
  vehicleDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.accent,
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

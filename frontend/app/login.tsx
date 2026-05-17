import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

type Role = 'customer' | 'staff';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<Role>('customer');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [staffId, setStaffId] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    if (mobile.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }
    setShowOtp(true);
    Alert.alert('OTP Sent', 'Enter any 4-digit code to continue (Mock OTP)');
  };

  const handleLogin = async () => {
    if (otp.length !== 4) {
      Alert.alert('Error', 'Please enter a valid 4-digit OTP');
      return;
    }

    if (selectedRole === 'staff' && !staffId) {
      Alert.alert('Error', 'Please enter your Staff ID');
      return;
    }

    setLoading(true);
    try {
      await login(mobile, otp, selectedRole);
      
      // Navigate based on role
      if (selectedRole === 'customer') {
        router.replace('/customer/dashboard');
      } else {
        router.replace('/staff/dashboard');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.gradient}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>

            {/* Logo */}
            <View style={styles.logoContainer}>
              <Ionicons name="car-sport" size={80} color={COLORS.accent} />
              <Text style={styles.logoText}>CarsBuddy</Text>
              <Text style={styles.subtitle}>Premium Car Care Platform</Text>
            </View>

            {/* Role Selection */}
            <View style={styles.roleContainer}>
              <Text style={styles.roleTitle}>Select Your Role</Text>
              <View style={styles.roleCards}>
                <TouchableOpacity
                  style={[styles.roleCard, selectedRole === 'customer' && styles.roleCardActive]}
                  onPress={() => setSelectedRole('customer')}
                  activeOpacity={0.7}
                >
                  <Card variant="glass" style={styles.roleCardInner}>
                    <Ionicons
                      name="person"
                      size={40}
                      color={selectedRole === 'customer' ? COLORS.accent : COLORS.gray}
                    />
                    <Text
                      style={[
                        styles.roleText,
                        selectedRole === 'customer' && styles.roleTextActive,
                      ]}
                    >
                      Customer
                    </Text>
                    {selectedRole === 'customer' && (
                      <View style={styles.checkmark}>
                        <Ionicons name="checkmark-circle" size={24} color={COLORS.accent} />
                      </View>
                    )}
                  </Card>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.roleCard, selectedRole === 'staff' && styles.roleCardActive]}
                  onPress={() => setSelectedRole('staff')}
                  activeOpacity={0.7}
                >
                  <Card variant="glass" style={styles.roleCardInner}>
                    <Ionicons
                      name="briefcase"
                      size={40}
                      color={selectedRole === 'staff' ? COLORS.accent : COLORS.gray}
                    />
                    <Text
                      style={[styles.roleText, selectedRole === 'staff' && styles.roleTextActive]}
                    >
                      Staff / Cleaner
                    </Text>
                    {selectedRole === 'staff' && (
                      <View style={styles.checkmark}>
                        <Ionicons name="checkmark-circle" size={24} color={COLORS.accent} />
                      </View>
                    )}
                  </Card>
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Form */}
            <Card variant="elevated" style={styles.formCard}>
              <Text style={styles.formTitle}>
                {selectedRole === 'customer' ? 'Customer Login' : 'Staff Login'}
              </Text>

              <Input
                label="Mobile Number"
                placeholder="Enter 10-digit mobile number"
                keyboardType="phone-pad"
                maxLength={10}
                value={mobile}
                onChangeText={setMobile}
                icon={<Ionicons name="call" size={20} color={COLORS.accent} />}
                editable={!showOtp}
              />

              {selectedRole === 'staff' && (
                <Input
                  label="Staff ID"
                  placeholder="Enter your Staff ID"
                  value={staffId}
                  onChangeText={setStaffId}
                  icon={<Ionicons name="card" size={20} color={COLORS.accent} />}
                  editable={!showOtp}
                />
              )}

              {!showOtp ? (
                <Button
                  title="Send OTP"
                  onPress={handleSendOtp}
                  style={styles.button}
                />
              ) : (
                <>
                  <Input
                    label="Enter OTP"
                    placeholder="Enter 4-digit OTP"
                    keyboardType="number-pad"
                    maxLength={4}
                    value={otp}
                    onChangeText={setOtp}
                    icon={<Ionicons name="lock-closed" size={20} color={COLORS.accent} />}
                  />

                  <Button
                    title="Login"
                    onPress={handleLogin}
                    loading={loading}
                    style={styles.button}
                  />

                  <TouchableOpacity onPress={() => setShowOtp(false)}>
                    <Text style={styles.resendText}>Change Mobile Number</Text>
                  </TouchableOpacity>
                </>
              )}

              {showOtp && (
                <View style={styles.mockNote}>
                  <Ionicons name="information-circle" size={16} color={COLORS.warning} />
                  <Text style={styles.mockText}>Demo Mode: Enter any 4-digit code</Text>
                </View>
              )}
            </Card>

            {/* Info */}
            <View style={styles.infoContainer}>
              <Ionicons name="shield-checkmark" size={20} color={COLORS.success} />
              <Text style={styles.infoText}>Your data is secure and encrypted</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: 60,
    paddingBottom: SPACING.xl,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: SPACING.lg,
    zIndex: 10,
    padding: SPACING.sm,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginTop: SPACING.md,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.cream,
    marginTop: SPACING.xs,
  },
  roleContainer: {
    marginBottom: SPACING.xl,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.cream,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  roleCards: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  roleCard: {
    flex: 1,
  },
  roleCardActive: {
    transform: [{ scale: 1.02 }],
  },
  roleCardInner: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    position: 'relative',
  },
  roleText: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  roleTextActive: {
    color: COLORS.accent,
    fontWeight: '600',
  },
  checkmark: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
  },
  formCard: {
    marginBottom: SPACING.lg,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.cream,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  button: {
    marginTop: SPACING.md,
  },
  resendText: {
    fontSize: 14,
    color: COLORS.accent,
    textAlign: 'center',
    marginTop: SPACING.lg,
    textDecorationLine: 'underline',
  },
  mockNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.lg,
    gap: SPACING.sm,
  },
  mockText: {
    fontSize: 12,
    color: COLORS.warning,
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.lg,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.gray,
  },
});

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function WalletScreen() {
  const walletData = {
    creditsTotal: 60,
    creditsUsed: 23,
    creditsRemaining: 37,
  };

  const transactions = [
    { id: '1', type: 'debit', service: 'Exterior Wash', credits: 1, date: '22 Jan, 10:30 AM' },
    { id: '2', type: 'debit', service: 'Interior Cleaning', credits: 4, date: '20 Jan, 02:15 PM' },
    { id: '3', type: 'debit', service: 'Foam Wash', credits: 6, date: '18 Jan, 09:00 AM' },
    { id: '4', type: 'credit', service: 'Refund - Missed Service', credits: 1, date: '15 Jan, 06:00 PM' },
    { id: '5', type: 'debit', service: 'Exterior Wash', credits: 1, date: '15 Jan, 10:00 AM' },
    { id: '6', type: 'credit', service: 'Monthly Credit Added', credits: 60, date: '01 Jan, 12:00 AM' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.header}>
        <Text style={styles.headerTitle}>Credit Wallet</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <LinearGradient colors={[COLORS.accent, COLORS.accentDark]} style={styles.balanceCard}>
          <Ionicons name="diamond" size={48} color={COLORS.primary} />
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>{walletData.creditsRemaining}</Text>
          <Text style={styles.balanceSubtext}>Credits</Text>
          
          <View style={styles.balanceDetails}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceItemLabel}>Total</Text>
              <Text style={styles.balanceItemValue}>{walletData.creditsTotal}</Text>
            </View>
            <View style={styles.balanceDivider} />
            <View style={styles.balanceItem}>
              <Text style={styles.balanceItemLabel}>Used</Text>
              <Text style={styles.balanceItemValue}>{walletData.creditsUsed}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Usage Progress */}
        <Card variant="elevated" style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Usage</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={[COLORS.accent, COLORS.accentDark]}
                style={[
                  styles.progressFill,
                  { width: `${(walletData.creditsUsed / walletData.creditsTotal) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {walletData.creditsUsed} of {walletData.creditsTotal} credits used
            </Text>
          </View>
        </Card>

        {/* Credit Value Guide */}
        <Card variant="elevated" style={styles.section}>
          <Text style={styles.sectionTitle}>Credit Value Guide</Text>
          <View style={styles.valueGuide}>
            {[
              { service: 'Exterior Wash', credits: 1, icon: 'water' },
              { service: 'Interior Cleaning', credits: 4, icon: 'car' },
              { service: 'Foam Wash', credits: 6, icon: 'sparkles' },
              { service: 'Wax Polish', credits: 8, icon: 'star' },
              { service: 'Ceramic Coating', credits: 15, icon: 'shield' },
            ].map((item, idx) => (
              <View key={idx} style={styles.valueItem}>
                <View style={styles.valueItemLeft}>
                  <Ionicons name={item.icon as any} size={20} color={COLORS.accent} />
                  <Text style={styles.valueService}>{item.service}</Text>
                </View>
                <View style={styles.valueBadge}>
                  <Ionicons name="diamond" size={12} color={COLORS.accent} />
                  <Text style={styles.valueCredits}>{item.credits}</Text>
                </View>
              </View>
            ))}
          </View>
        </Card>

        {/* Transaction History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
          {transactions.map((transaction) => (
            <Card key={transaction.id} variant="glass" style={styles.transactionCard}>
              <View style={styles.transactionLeft}>
                <View
                  style={[
                    styles.transactionIcon,
                    { backgroundColor: transaction.type === 'credit' ? COLORS.success : COLORS.error },
                  ]}
                >
                  <Ionicons
                    name={transaction.type === 'credit' ? 'add' : 'remove'}
                    size={20}
                    color={COLORS.white}
                  />
                </View>
                <View>
                  <Text style={styles.transactionService}>{transaction.service}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.transactionCredits,
                  { color: transaction.type === 'credit' ? COLORS.success : COLORS.error },
                ]}
              >
                {transaction.type === 'credit' ? '+' : '-'}{transaction.credits}
              </Text>
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* Add Credits Button */}
      <View style={styles.footer}>
        <Button title="Add More Credits" onPress={() => {}} style={styles.addButton} />
      </View>
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
  balanceCard: {
    margin: SPACING.lg,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: SPACING.md,
    opacity: 0.8,
  },
  balanceAmount: {
    fontSize: 64,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },
  balanceSubtext: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: SPACING.xl,
  },
  balanceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(4, 28, 50, 0.2)',
    paddingTop: SPACING.lg,
    width: '100%',
    justifyContent: 'space-around',
  },
  balanceItem: {
    alignItems: 'center',
  },
  balanceItemLabel: {
    fontSize: 12,
    color: COLORS.primary,
    opacity: 0.7,
    marginBottom: 4,
  },
  balanceItemValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  balanceDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(4, 28, 50, 0.2)',
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
  progressContainer: {
    marginTop: SPACING.sm,
  },
  progressBar: {
    height: 12,
    backgroundColor: COLORS.darkGray,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.sm,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  valueGuide: {
    marginTop: SPACING.sm,
  },
  valueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  valueItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  valueService: {
    fontSize: 14,
    color: COLORS.white,
  },
  valueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    gap: 4,
  },
  valueCredits: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '600',
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flex: 1,
  },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionService: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  transactionDate: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  transactionCredits: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.secondary,
    borderTopWidth: 1,
    borderTopColor: COLORS.accent,
  },
  addButton: {},
});

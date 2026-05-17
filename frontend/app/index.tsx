import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { SERVICES, SUBSCRIPTION_PLANS, TESTIMONIALS, HOW_IT_WORKS } from '../constants/data';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const { width } = Dimensions.get('window');

export default function LandingPage() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: scrollY.interpolate({
              inputRange: [0, 100],
              outputRange: ['transparent', COLORS.secondary],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <Text style={styles.logo}>CarsBuddy</Text>
        <TouchableOpacity onPress={() => router.push('/login')} style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary, COLORS.primary]}
          style={styles.hero}
        >
          <View style={styles.heroContent}>
            <Animated.View
              style={{
                opacity: scrollY.interpolate({
                  inputRange: [0, 200],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                }),
              }}
            >
              <Ionicons name="car-sport" size={80} color={COLORS.accent} style={styles.heroIcon} />
              <Text style={styles.heroTitle}>India's Smartest</Text>
              <Text style={styles.heroTitle}>Subscription-Based</Text>
              <Text style={styles.heroTitleAccent}>Car Care Platform</Text>
              <Text style={styles.heroSubtitle}>
                Premium car cleaning, detailing & subscriptions with smart credit tracking
              </Text>
              
              <View style={styles.heroButtons}>
                <Button
                  title="Subscribe Now"
                  onPress={() => router.push('/login')}
                  style={styles.heroBtn}
                />
                <Button
                  title="Book Foam Wash"
                  onPress={() => router.push('/login')}
                  variant="outline"
                  style={styles.heroBtn}
                />
              </View>
            </Animated.View>
          </View>
        </LinearGradient>

        {/* Services Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Services</Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.servicesGrid}>
            {SERVICES.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => router.push('/login')}
                activeOpacity={0.8}
              >
                <Card variant="glass" style={styles.serviceCardInner}>
                  <Ionicons name={service.icon as any} size={40} color={COLORS.accent} />
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDesc}>{service.description}</Text>
                  <View style={styles.creditsTag}>
                    <Ionicons name="diamond" size={12} color={COLORS.accent} />
                    <Text style={styles.creditsText}>{service.credits} Credits</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* How It Works Section */}
        <View style={[styles.section, styles.darkSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>How It Works</Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.stepsContainer}>
            {HOW_IT_WORKS.map((step, index) => (
              <View key={step.step} style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{step.step}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Ionicons name={step.icon as any} size={32} color={COLORS.accent} />
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDesc}>{step.description}</Text>
                </View>
                {index < HOW_IT_WORKS.length - 1 && <View style={styles.stepConnector} />}
              </View>
            ))}
          </View>
        </View>

        {/* Subscription Plans Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Choose Your Plan</Text>
            <View style={styles.divider} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.plansScroll}>
            {SUBSCRIPTION_PLANS.map((plan) => (
              <View key={plan.id} style={styles.planCard}>
                <Card variant="elevated" style={styles.planCardInner}>
                  {plan.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>MOST POPULAR</Text>
                    </View>
                  )}
                  <Text style={styles.planName}>{plan.name}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.currency}>₹</Text>
                    <Text style={styles.price}>{plan.price}</Text>
                    <Text style={styles.period}>/month</Text>
                  </View>
                  <View style={styles.creditsHighlight}>
                    <Ionicons name="diamond" size={20} color={COLORS.accent} />
                    <Text style={styles.creditsLarge}>{plan.credits} Credits</Text>
                  </View>
                  <View style={styles.featuresContainer}>
                    {plan.features.map((feature, idx) => (
                      <View key={idx} style={styles.featureRow}>
                        <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                  <Button
                    title="Subscribe Now"
                    onPress={() => router.push('/login')}
                    variant={plan.popular ? 'primary' : 'outline'}
                    style={styles.planBtn}
                  />
                </Card>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Credit System Explanation */}
        <View style={[styles.section, styles.darkSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Smart Credit System</Text>
            <View style={styles.divider} />
          </View>
          <Card variant="glass" style={styles.creditExplainer}>
            <View style={styles.creditRow}>
              <Ionicons name="water" size={40} color={COLORS.accent} />
              <View style={styles.creditInfo}>
                <Text style={styles.creditService}>Exterior Wash</Text>
                <View style={styles.creditAmount}>
                  <Ionicons name="diamond" size={16} color={COLORS.accent} />
                  <Text style={styles.creditValue}>1 Credit</Text>
                </View>
              </View>
            </View>
            <View style={styles.creditRow}>
              <Ionicons name="car" size={40} color={COLORS.accent} />
              <View style={styles.creditInfo}>
                <Text style={styles.creditService}>Interior Cleaning</Text>
                <View style={styles.creditAmount}>
                  <Ionicons name="diamond" size={16} color={COLORS.accent} />
                  <Text style={styles.creditValue}>4 Credits</Text>
                </View>
              </View>
            </View>
            <View style={styles.creditRow}>
              <Ionicons name="sparkles" size={40} color={COLORS.accent} />
              <View style={styles.creditInfo}>
                <Text style={styles.creditService}>Foam Wash</Text>
                <View style={styles.creditAmount}>
                  <Ionicons name="diamond" size={16} color={COLORS.accent} />
                  <Text style={styles.creditValue}>6 Credits</Text>
                </View>
              </View>
            </View>
          </Card>
          <Text style={styles.creditNote}>
            Credits auto-deduct on service. Unused credits refunded if service missed!
          </Text>
        </View>

        {/* Testimonials Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>What Our Customers Say</Text>
            <View style={styles.divider} />
          </View>
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.id} variant="glass" style={styles.testimonialCard}>
              <View style={styles.testimonialHeader}>
                <Image source={{ uri: testimonial.avatar }} style={styles.avatar} />
                <View style={styles.testimonialInfo}>
                  <Text style={styles.testimonialName}>{testimonial.name}</Text>
                  <Text style={styles.testimonialLocation}>{testimonial.location}</Text>
                  <View style={styles.rating}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Ionicons key={i} name="star" size={14} color={COLORS.accent} />
                    ))}
                  </View>
                </View>
              </View>
              <Text style={styles.testimonialComment}>{testimonial.comment}</Text>
            </Card>
          ))}
        </View>

        {/* CTA Section */}
        <View style={[styles.section, styles.ctaSection]}>
          <LinearGradient
            colors={[COLORS.accent, COLORS.accentDark]}
            style={styles.ctaGradient}
          >
            <Ionicons name="car-sport" size={60} color={COLORS.primary} />
            <Text style={styles.ctaTitle}>Ready to Experience Premium Car Care?</Text>
            <Text style={styles.ctaSubtitle}>
              Join thousands of happy customers enjoying hassle-free car maintenance
            </Text>
            <Button
              title="Get Started Now"
              onPress={() => router.push('/login')}
              variant="secondary"
              style={styles.ctaBtn}
            />
          </LinearGradient>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>CarsBuddy</Text>
          <Text style={styles.footerTagline}>Premium Car Care at Your Doorstep</Text>
          <View style={styles.socialIcons}>
            <Ionicons name="logo-facebook" size={24} color={COLORS.gray} style={styles.socialIcon} />
            <Ionicons name="logo-instagram" size={24} color={COLORS.gray} style={styles.socialIcon} />
            <Ionicons name="logo-twitter" size={24} color={COLORS.gray} style={styles.socialIcon} />
            <Ionicons name="logo-linkedin" size={24} color={COLORS.gray} style={styles.socialIcon} />
          </View>
          <Text style={styles.footerCopy}>© 2025 CarsBuddy. All rights reserved.</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  loginBtn: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.accent,
  },
  loginText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  hero: {
    minHeight: 600,
    paddingTop: 100,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  heroContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIcon: {
    marginBottom: SPACING.lg,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: 40,
  },
  heroTitleAccent: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.accent,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  heroSubtitle: {
    fontSize: 16,
    color: COLORS.cream,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 24,
    paddingHorizontal: SPACING.lg,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  heroBtn: {
    minWidth: 150,
  },
  section: {
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  darkSection: {
    backgroundColor: COLORS.secondary,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.cream,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: COLORS.accent,
    borderRadius: 2,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  serviceCard: {
    width: (width - SPACING.lg * 2 - SPACING.md) / 2,
    marginBottom: SPACING.md,
  },
  serviceCardInner: {
    alignItems: 'center',
    minHeight: 180,
    justifyContent: 'center',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  serviceDesc: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  creditsTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    marginTop: SPACING.sm,
    gap: 4,
  },
  creditsText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '600',
  },
  stepsContainer: {
    paddingHorizontal: SPACING.md,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: SPACING.xl,
    position: 'relative',
  },
  stepNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  stepNumberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  stepContent: {
    flex: 1,
    paddingTop: SPACING.xs,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    marginTop: SPACING.sm,
  },
  stepDesc: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: SPACING.xs,
  },
  stepConnector: {
    position: 'absolute',
    left: 24,
    top: 60,
    width: 2,
    height: 40,
    backgroundColor: COLORS.accent,
    opacity: 0.3,
  },
  plansScroll: {
    marginHorizontal: -SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  planCard: {
    width: width * 0.8,
    marginRight: SPACING.md,
  },
  planCardInner: {
    padding: SPACING.xl,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderTopRightRadius: BORDER_RADIUS.lg,
    borderBottomLeftRadius: BORDER_RADIUS.md,
  },
  popularText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.cream,
    marginBottom: SPACING.md,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: SPACING.lg,
  },
  currency: {
    fontSize: 24,
    color: COLORS.accent,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 48,
    color: COLORS.accent,
    fontWeight: 'bold',
    lineHeight: 50,
  },
  period: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 8,
  },
  creditsHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  creditsLarge: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  featuresContainer: {
    marginBottom: SPACING.lg,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.white,
    flex: 1,
  },
  planBtn: {
    marginTop: SPACING.md,
  },
  creditExplainer: {
    marginBottom: SPACING.lg,
  },
  creditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    gap: SPACING.lg,
  },
  creditInfo: {
    flex: 1,
  },
  creditService: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  creditAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  creditValue: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
  },
  creditNote: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: SPACING.md,
  },
  testimonialCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
  },
  testimonialHeader: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.gray,
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  testimonialLocation: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  rating: {
    flexDirection: 'row',
    marginTop: SPACING.xs,
    gap: 2,
  },
  testimonialComment: {
    fontSize: 14,
    color: COLORS.cream,
    lineHeight: 20,
  },
  ctaSection: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  ctaGradient: {
    padding: SPACING.xxl,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.xl,
    marginHorizontal: SPACING.lg,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    opacity: 0.8,
  },
  ctaBtn: {
    minWidth: 200,
  },
  footer: {
    backgroundColor: COLORS.secondary,
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.accent,
  },
  footerBrand: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: SPACING.sm,
  },
  footerTagline: {
    fontSize: 14,
    color: COLORS.cream,
    marginBottom: SPACING.lg,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  socialIcon: {
    marginHorizontal: SPACING.xs,
  },
  footerCopy: {
    fontSize: 12,
    color: COLORS.gray,
  },
});

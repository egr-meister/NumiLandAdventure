import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useApp} from '../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';
import {SIZES, SHADOW} from '../theme/typography';

export default function PrivacyScreen({navigation}) {
  const {theme} = useApp();
  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: theme.background}]}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Privacy" emoji="🔒" theme={theme} onBack={() => navigation.goBack()} />
        <View style={[styles.card, SHADOW, {backgroundColor: theme.card}]}>
          <Text style={styles.icon}>🛡️</Text>
          <Text style={[styles.lead, {color: theme.text}]}>
            This app does not collect personal data from children.
          </Text>
          <Text style={[styles.body, {color: theme.textSoft}]}>
            NumiLand Adventure works fully offline. There are no accounts, no logins and no
            tracking. All progress is stored only on this device and never sent anywhere.
            {'\n\n'}
            There are no ads, no purchases and no external links inside the kids area.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  content: {padding: SIZES.paddingScreen, paddingBottom: 40},
  card: {borderRadius: SIZES.radius, padding: 24, alignItems: 'center'},
  icon: {fontSize: 60, marginBottom: 12},
  lead: {fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 14},
  body: {fontSize: 17, lineHeight: 26, textAlign: 'center'},
});

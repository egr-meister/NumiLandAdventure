import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useApp} from '../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';
import Mascot from '../components/Mascot';
import {SIZES, SHADOW} from '../theme/typography';
import {APP_INFO} from '../data/constants';

export default function AboutScreen({navigation}) {
  const {theme} = useApp();
  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: theme.background}]}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="About App" emoji="ℹ️" theme={theme} onBack={() => navigation.goBack()} />
        <View style={[styles.card, SHADOW, {backgroundColor: theme.card}]}>
          <Mascot size={70} />
          <Text style={[styles.name, {color: theme.text}]}>{APP_INFO.name}</Text>
          <Text style={[styles.version, {color: theme.textSoft}]}>Version {APP_INFO.version}</Text>
          <Text style={[styles.desc, {color: theme.textSoft}]}>{APP_INFO.description}</Text>
          <View style={[styles.badge, {backgroundColor: theme.tile3}]}>
            <Text style={[styles.badgeText, {color: theme.text}]}>
              Safe for kids • Offline • No ads • No data collection
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  content: {padding: SIZES.paddingScreen, paddingBottom: 40},
  card: {borderRadius: SIZES.radius, padding: 24, alignItems: 'center'},
  name: {fontSize: 26, fontWeight: '900', marginTop: 8},
  version: {fontSize: 16, fontWeight: '700', marginTop: 4},
  desc: {fontSize: 17, lineHeight: 26, textAlign: 'center', marginTop: 16},
  badge: {borderRadius: SIZES.radiusSmall, padding: 14, marginTop: 20},
  badgeText: {fontSize: 15, fontWeight: '700', textAlign: 'center'},
});

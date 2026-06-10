import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useApp} from '../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';
import OptionGroup from '../components/OptionPill';
import Toggle from '../components/Toggle';
import PressableScale from '../components/PressableScale';
import {SIZES, SHADOW} from '../theme/typography';
import {DIFFICULTIES, CALC_MODES} from '../data/constants';
import {THEMES} from '../theme/themes';

function Block({title, theme, children}) {
  return (
    <View style={[styles.block, SHADOW, {backgroundColor: theme.card}]}>
      <Text style={[styles.blockTitle, {color: theme.text}]}>{title}</Text>
      {children}
    </View>
  );
}

export default function SettingsScreen({navigation}) {
  const {theme, settings, updateSetting} = useApp();

  const themeOptions = Object.values(THEMES).map(t => ({key: t.key, label: t.label}));
  const languageOptions = [{key: 'en', label: 'English'}];

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: theme.background}]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Settings"
          emoji="⚙️"
          theme={theme}
          onBack={() => navigation.goBack()}
        />

        <Block title="Difficulty" theme={theme}>
          <OptionGroup
            options={DIFFICULTIES}
            value={settings.difficulty}
            onChange={v => updateSetting('difficulty', v)}
            theme={theme}
          />
        </Block>

        <Block title="Calculator Mode" theme={theme}>
          <OptionGroup
            options={CALC_MODES}
            value={settings.calcMode}
            onChange={v => updateSetting('calcMode', v)}
            theme={theme}
          />
        </Block>

        <Block title="Sound & Vibration" theme={theme}>
          <Toggle
            label="Sound"
            value={settings.sound}
            onValueChange={v => updateSetting('sound', v)}
            theme={theme}
          />
          <Toggle
            label="Vibration"
            value={settings.vibration}
            onValueChange={v => updateSetting('vibration', v)}
            theme={theme}
          />
        </Block>

        <Block title="Theme" theme={theme}>
          <OptionGroup
            options={themeOptions}
            value={settings.theme}
            onChange={v => updateSetting('theme', v)}
            theme={theme}
          />
        </Block>

        <Block title="Language" theme={theme}>
          <OptionGroup
            options={languageOptions}
            value={settings.language}
            onChange={v => updateSetting('language', v)}
            theme={theme}
          />
        </Block>

        <Block title="More" theme={theme}>
          <PressableScale
            onPress={() => navigation.navigate('Privacy')}
            accessibilityLabel="Privacy"
            style={[styles.link, {backgroundColor: theme.background}]}>
            <Text style={[styles.linkText, {color: theme.text}]}>🔒 Privacy</Text>
            <Text style={[styles.chevron, {color: theme.textSoft}]}>›</Text>
          </PressableScale>
          <PressableScale
            onPress={() => navigation.navigate('About')}
            accessibilityLabel="About App"
            style={[styles.link, {backgroundColor: theme.background}]}>
            <Text style={[styles.linkText, {color: theme.text}]}>ℹ️ About App</Text>
            <Text style={[styles.chevron, {color: theme.textSoft}]}>›</Text>
          </PressableScale>
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  content: {padding: SIZES.paddingScreen, paddingBottom: 40},
  block: {borderRadius: SIZES.radius, padding: 18, marginBottom: 16},
  blockTitle: {fontSize: 20, fontWeight: '800', marginBottom: 14},
  link: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: SIZES.radiusSmall,
    marginBottom: 10,
  },
  linkText: {fontSize: 18, fontWeight: '700'},
  chevron: {fontSize: 26, fontWeight: '800'},
});

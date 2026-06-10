import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useApp} from '../context/AppContext';
import Mascot from '../components/Mascot';
import SectionCard from '../components/SectionCard';
import {SIZES} from '../theme/typography';

export default function HomeScreen({navigation}) {
  const {theme} = useApp();

  const sections = [
    {title: 'Calculator', emoji: '🔢', color: theme.tile1, screen: 'Calculator'},
    {title: 'Math Games', emoji: '🎮', color: theme.tile2, screen: 'MathGames'},
    {title: 'Daily Challenge', emoji: '🗓️', color: theme.tile3, screen: 'DailyChallenge'},
    {title: 'Progress', emoji: '📈', color: theme.tile4, screen: 'Progress'},
    {title: 'Settings', emoji: '⚙️', color: theme.tile5, screen: 'Settings'},
  ];

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: theme.background}]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Mascot size={70} message="Welcome to NumiLand!" />
          <Text style={[styles.title, {color: theme.text}]}>NumiLand Adventure</Text>
          <Text style={[styles.subtitle, {color: theme.textSoft}]}>
            Let's play and learn with numbers!
          </Text>
        </View>

        <View style={styles.grid}>
          {sections.map(s => (
            <View key={s.screen} style={styles.cell}>
              <SectionCard
                title={s.title}
                emoji={s.emoji}
                color={s.color}
                textColor={theme.text}
                onPress={() => navigation.navigate(s.screen)}
              />
            </View>
          ))}
          <View style={styles.cell} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  content: {padding: SIZES.paddingScreen, paddingBottom: 40},
  header: {alignItems: 'center', marginBottom: 24},
  title: {fontSize: SIZES.title, fontWeight: '900', marginTop: 8},
  subtitle: {fontSize: SIZES.body, marginTop: 4, textAlign: 'center'},
  grid: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'},
  cell: {width: '48%', marginBottom: SIZES.gap},
});

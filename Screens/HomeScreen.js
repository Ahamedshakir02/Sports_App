import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';

const sportsData = require('./data.json').sports; // Import your JSON data

const MatchItem = ({ match }) => {
  return (
    <View style={styles.matchItem}>
      <View style={styles.matchHeader}>
        <Text style={styles.matchCompetition}>{match.competition}</Text>
        <TouchableOpacity>
          <Icon
            name={match.notification ? 'notifications' : 'notifications-off'}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.teams}>
        {match.teams.map((team, index) => (
          <View key={index} style={styles.team}>
            <Image source={{ uri: team.logo }} style={styles.logo} />
            <Text style={styles.teamName}>{team.name}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.matchTime}>{match.time}</Text>
    </View>
  );
};

const SportsScreen = ({ sport }) => {
  const [selectedDate, setSelectedDate] = useState('2024-08-24');

  const filteredMatches = sport.matches.filter(match => match.date === selectedDate);

  return (
    <ScrollView style={styles.sportScreen}>
      <ScrollView horizontal style={styles.dateSelector}>
        {['2024-08-23', '2024-08-24', '2024-08-25'].map(date => (
          <TouchableOpacity key={date} onPress={() => setSelectedDate(date)}>
            <Text style={[styles.dateText, date === selectedDate && styles.selectedDate]}>
              {new Date(date).toDateString().split(' ').slice(0, 3).join(' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {filteredMatches.map(match => (
        <MatchItem key={match.id} match={match} />
      ))}
    </ScrollView>
  );
};
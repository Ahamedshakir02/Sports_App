import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import WatchScreen from './Screens/WatchScreen';
import NewsScreen from './Screens/NewsScreen';
import FavouriteScreen from './Screens/FavouriteScreen';

const sportsData = require('./data.json').sports; // Import your JSON data

const TopTabs = createMaterialTopTabNavigator();
const BottomTabs = createBottomTabNavigator();

const MatchItem = ({ match }) => (
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

const SportsScreen = ({ sport }) => {
  const [selectedDate, setSelectedDate] = useState('2024-08-24');
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredMatches = sport.matches.filter(match => 
    match.date === selectedDate &&
    (match.teams.some(team => team.name.toLowerCase().includes(searchText.toLowerCase())) || 
    match.competition.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <ScrollView style={styles.sportScreen}>
      <View style={styles.searchContainer}>
        {isSearching ? (
          <TextInput
            style={styles.searchBox}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={true}
            onBlur={() => setIsSearching(false)}
          />
        ) : (
          <TouchableOpacity onPress={() => setIsSearching(true)}>
            <Icon name="search" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
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

const TopTabNavigator = () => (
  <TopTabs.Navigator
    screenOptions={{
      tabBarScrollEnabled: true,
      tabBarIndicatorStyle: styles.tabIndicator,
      tabBarLabelStyle: styles.tabLabel,
      tabBarStyle: styles.tabBar,
    }}>
    {sportsData.map(sport => (
      <TopTabs.Screen key={sport.id} name={sport.name}>
        {props => <SportsScreen {...props} sport={sport} />}
      </TopTabs.Screen>
    ))}
  </TopTabs.Navigator>
);

const BottomTabNavigator = () => (
  <BottomTabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Score') {
          iconName = 'stats-chart';
        } else if (route.name === 'Watch') {
          iconName = 'play-circle';
        } else if (route.name === 'News') {
          iconName = 'newspaper';
        } else if (route.name === 'Favorites') {
          iconName = 'heart';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007BFF',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: styles.bottomTabBar,
    })}>
    <BottomTabs.Screen name="Score" component={TopTabNavigator} />
    <BottomTabs.Screen name="Watch" component={WatchScreen} />
    <BottomTabs.Screen name="News" component={NewsScreen} />
    <BottomTabs.Screen name="Favorites" component={FavouriteScreen} />
  </BottomTabs.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sportScreen: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  matchItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  matchCompetition: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  teams: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  team: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '500',
  },
  matchTime: {
    fontSize: 12,
    color: '#888',
  },
  dateSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
    paddingVertical: 10,
    borderRadius: 10,
  },
  dateText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#666',
  },
  selectedDate: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBox: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0,
    elevation: 0,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  tabIndicator: {
    backgroundColor: '#007BFF',
    height: 3,
  },
  bottomTabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#DDD',
    borderTopWidth: 1,
  },
});

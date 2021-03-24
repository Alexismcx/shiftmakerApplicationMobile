import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LogBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Welcome from './components/Welcome';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import DashboardFavoris from './components/DashboardFavoris';
import DashboardNotes from './components/DashboardNotes';
import DashboardHistorique from './components/DashboardHistorique';
import Theorie from './components/Theorie';
import Activites from './components/Activites';
import Cadrage from './components/Cadrage';
import Atelier from './components/Atelier';
import Settings from './components/Settings';
import ChoixActivites from './components/ChoixActivites';
import MurStart from './components/MurStart';
import MurCoach from './components/MurCoach';
import MurParticipant from './components/MurParticipant';

import { Ionicons } from '@expo/vector-icons';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import idUser from './reducer/idUser';
import favorisList from './reducer/favoris';
import etapeSelected from  './reducer/builtAtelier';
import notesList from './reducer/notes';
import dataCadrage from './reducer/dataCadrage';
import activitiesDeclusion from "./reducer/addActivitiesToDeclusion";
import activitiesInclusion from "./reducer/addActivitiesToInclusion";
import activitiesEmergence from "./reducer/addActivitiesToEmergence";
import activitiesConvergence from "./reducer/addActivitiesToConvergence";
import codeSession from './reducer/codeSession';
import paramsMur from './reducer/paramsMur';
import nameUser from './reducer/nameUser';
import historiqueList from './reducer/historique';

const store = createStore(combineReducers({
  idUser,
  favorisList,
  notesList,
  dataCadrage,
  etapeSelected,
  activitiesDeclusion,
  activitiesInclusion,
  activitiesEmergence,
  activitiesConvergence,
  codeSession,
  paramsMur,
  nameUser,
  historiqueList
})
);


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name == 'Home') {
            iconName = 'ios-home-outline';
          } else if (route.name == 'Théorie') {
            iconName = 'ios-book';
          } else if (route.name == 'Dashboard') {
            iconName = 'ios-menu-outline';
          } else if (route.name == 'Activités') {
            iconName = 'ios-build-outline';
          } else if (route.name == 'Créer Atelier') {
            iconName = 'ios-create-outline';
          }

          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        style: {
          backgroundColor: '#ececec',
        }
      }}
    >
      <Tab.Screen name="Home" component={Welcome} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Théorie" component={Theorie} />
      <Tab.Screen name="Activités" component={Activites} />
      <Tab.Screen name="Créer Atelier" component={Cadrage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="DashboardFavoris" component={DashboardFavoris} />
          <Stack.Screen name="DashboardNotes" component={DashboardNotes} options={{ headerShown: false }} />
          <Stack.Screen name="DashboardHistorique" component={DashboardHistorique} options={{ headerShown: false }} />
          <Stack.Screen name="Atelier" component={Atelier} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="ChoixActivites" component={ChoixActivites} />
          <Stack.Screen name="MurStart" component={MurStart} />
          <Stack.Screen name="MurCoach" component={MurCoach} />
          <Stack.Screen name="MurParticipant" component={MurParticipant} />
        </Stack.Navigator>
      </NavigationContainer>

    </Provider>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

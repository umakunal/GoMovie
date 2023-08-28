import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import {MovieDetails, SeatBooking} from '../screens';
import {screenName} from '../Constants/screenName';
const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={screenName.tab}
        component={TabNavigator}
        options={{animation: 'default'}}
      />
      <Stack.Screen
        name={screenName.movieDetails}
        component={MovieDetails}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name={screenName.seatBooking}
        component={SeatBooking}
        options={{animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

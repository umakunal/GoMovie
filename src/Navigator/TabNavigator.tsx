import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Search, Ticket, UserAccount} from '../screens';
import {screenName} from '../Constants/screenName';
import {COLORS, FONTSIZE, FONTS, SPACING} from '../Theme/theme';
import customIcon from '../components/customIcon';
import {View, StyleSheet} from 'react-native';
import CustomIcon from '../components/customIcon';
const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={screenName.home}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.Black,
          borderTopWidth: 0,
          height: SPACING.space_10 * 10,
        },
      }}>
      <Tab.Screen
        name={screenName.home}
        component={Home}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? {backgroundColor: COLORS.Orange} : {},
                ]}>
                <CustomIcon
                  name="video"
                  size={FONTSIZE.size_30}
                  color={COLORS.White}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name={screenName.search}
        component={Search}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? {backgroundColor: COLORS.Orange} : {},
                ]}>
                <CustomIcon
                  name="search"
                  size={FONTSIZE.size_30}
                  color={COLORS.White}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name={screenName.ticket}
        component={Ticket}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? {backgroundColor: COLORS.Orange} : {},
                ]}>
                <CustomIcon
                  name="ticket"
                  size={FONTSIZE.size_30}
                  color={COLORS.White}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name={screenName.userAccount}
        component={UserAccount}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? {backgroundColor: COLORS.Orange} : {},
                ]}>
                <CustomIcon
                  name="user"
                  size={FONTSIZE.size_30}
                  color={COLORS.White}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  activeTabBackground: {
    backgroundColor: COLORS.Black,
    padding: SPACING.space_18,
    borderRadius: SPACING.space_18 * 10,
  },
});

export default TabNavigator;

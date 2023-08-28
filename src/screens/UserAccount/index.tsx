//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import {COLORS, FONTS, FONTSIZE, SPACING} from '../../Theme/theme';
import AppHeader from '../../components/AppHeader';
import SettingCard from '../../components/SettingCard';

// create a component
const UserAccount = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.HeaderContainer}>
        <AppHeader
          name="close"
          header="My Profile"
          action={() => navigation.goBack()}
        />
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/image/avatar.png')}
          style={styles.avatarImage}
        />
        <Text style={styles.avatarText}>Samrat Kunal</Text>
      </View>
      <View style={styles.profileContainer}>
        <SettingCard
          iconName="user"
          heading={'Account'}
          subHeading={'Edit Profile'}
          subText={'Change Password'}
        />
        <SettingCard
          iconName="setting"
          heading={'Account'}
          subHeading={'Edit Profile'}
          subText={'Change Password'}
        />
        <SettingCard
          iconName="dollar"
          heading={'Offers & Referrals'}
          subHeading={'Offers'}
          subText={'Referrals'}
        />
        <SettingCard
          iconName="info"
          heading={'About'}
          subHeading={'About Movies'}
          subText={'More'}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  HeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  profileContainer: {
    alignItems: 'center',
    padding: SPACING.space_28,
  },
  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  avatarText: {
    fontFamily: FONTS.poppins_medium,
    fontSize: FONTSIZE.size_16,
    marginTop: SPACING.space_16,
    color: COLORS.White,
  },
});

//make this component available to the app
export default UserAccount;

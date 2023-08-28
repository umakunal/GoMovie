//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS, FONTSIZE, SPACING} from '../Theme/theme';
import CustomIcon from './customIcon';

// create a component
const SettingCard = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <CustomIcon name={props?.iconName} style={styles.iconStyle} />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{props?.heading}</Text>
        <Text style={styles.subTitle}>{props?.subHeading}</Text>
        <Text style={styles.subTitle}>{props?.subText}</Text>
      </View>
      <View style={styles.iconBG}>
        <CustomIcon name="arrow-right" style={styles.iconStyle} />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: SPACING.space_8,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  settingContainer: {
    flex: 1,
  },
  iconStyle: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    paddingHorizontal: SPACING.space_20,
  },
  title: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTS.poppins_medium,
  },
  subTitle: {
    color: COLORS.WhiteRGBA32,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTS.poppins_medium,
  },
  iconBG: {
    justifyContent: 'center',
  },
});

//make this component available to the app
export default SettingCard;

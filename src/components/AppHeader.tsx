//import liraries
import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import CustomIcon from './customIcon';
import {BORDER_RADIUS, COLORS, FONTS, FONTSIZE, SPACING} from '../Theme/theme';

// create a component
const AppHeader = (props: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={props?.action}>
        <CustomIcon
          name={props?.name}
          size={FONTSIZE.size_24}
          color={COLORS.White}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props?.header}</Text>
      <View style={styles.emptyContainer} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    flex: 1,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTS.poppins_medium,
    color: COLORS.White,
    textAlign: 'center',
  },
  emptyContainer: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
  },
  backButton: {
    width: SPACING.space_28,
    height: SPACING.space_28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.radius_20,
    backgroundColor: COLORS.Orange,
  },
});

//make this component available to the app
export default AppHeader;

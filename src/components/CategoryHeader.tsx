//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS, FONTSIZE, SPACING} from '../Theme/theme';

// create a component
const CategoryHeader = (props: any) => {
  return <Text style={styles.title}>{props?.title}</Text>;
};

// define your styles
const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    paddingHorizontal: SPACING.space_36,
    paddingVertical: SPACING.space_28,
  },
});

//make this component available to the app
export default CategoryHeader;

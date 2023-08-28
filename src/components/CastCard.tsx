//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {BORDER_RADIUS, COLORS, FONTS, FONTSIZE, SPACING} from '../Theme/theme';

// create a component
const CastCard = (props: any) => {
  return (
    <View
      style={[
        styles.container,
        props?.shouldMarginateAtEnd
          ? props?.isFirst
            ? {marginLeft: SPACING.space_24}
            : props?.isLast
            ? {marginRight: SPACING.space_24}
            : {}
          : {maxWidth: props?.cardWidth},
      ]}>
      <Image
        source={{uri: props?.imagePath}}
        style={[styles.cardImage, {width: props?.cardWidth}]}
      />
      <Text numberOfLines={1} style={styles.title}>
        {props?.title}
      </Text>
      <Text numberOfLines={1} style={styles.subTitle}>
        {props?.subTitle}
      </Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 100,
  },
  cardImage: {
    borderRadius: BORDER_RADIUS.radius_25 * 4,
    aspectRatio: 1920 / 2880,
    alignSelf: 'center',
    marginBottom: SPACING.space_12,
  },
  title: {
    alignSelf: 'center',
    fontFamily: FONTS.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  subTitle: {
    alignSelf: 'center',
    fontFamily: FONTS.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.White,
  },
});

//make this component available to the app
export default CastCard;

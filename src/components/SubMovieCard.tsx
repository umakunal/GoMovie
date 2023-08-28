//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {BORDER_RADIUS, COLORS, FONTS, FONTSIZE, SPACING} from '../Theme/theme';

// create a component
const SubMovieCard = (props: any) => {
  return (
    <TouchableOpacity onPress={props?.cardFunction}>
      <View
        style={[
          styles.container,
          props?.shouldMarginateAtEnd
            ? props?.isFirst
              ? {marginLeft: SPACING.space_36}
              : props?.isLast
              ? {marginRight: SPACING.space_36}
              : {}
            : {},
          props?.shouldMarginateAround ? {margin: SPACING.space_12} : {},
          {maxWidth: props?.cardWidth},
        ]}>
        <Image
          source={{uri: props?.imagePath}}
          style={[styles.cardImage, {width: props?.cardWidth}]}
        />
        <Text numberOfLines={1} style={styles.movieTitle}>
          {props?.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDER_RADIUS.radius_20,
  },
  movieTitle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTS.poppins_regular,
    textAlign: 'center',
    paddingVertical: SPACING.space_10,
  },
});

//make this component available to the app
export default SubMovieCard;

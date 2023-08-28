//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {BORDER_RADIUS, COLORS, FONTS, FONTSIZE, SPACING} from '../Theme/theme';
import CustomIcon from './customIcon';

const genre_List: any = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
  10759: 'Action & Adventure',
  10762: 'Kids',
  10763: 'News',
  10764: 'Reality',
};
// create a component
const MovieCard = (props: any) => {
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
        <View style={styles.movieInfo}>
          <View>
            <View style={styles.rateContainer}>
              <CustomIcon
                name="star"
                size={FONTSIZE.size_12}
                color={COLORS.Yellow}
              />
              <Text style={styles.vote}>
                {props?.vote_average}({props?.vote_count})
              </Text>
            </View>
          </View>
          <Text numberOfLines={1} style={styles.movieTitle}>
            {props?.title}
          </Text>
          <View style={styles.genreContainer}>
            {props?.genre.map((item: any) => (
              <View style={styles.genreBox} key={item}>
                <Text style={styles.genre} key={item}>
                  {genre_List[item]}
                </Text>
              </View>
            ))}
          </View>
        </View>
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
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTS.poppins_regular,
    textAlign: 'center',
    paddingVertical: SPACING.space_10,
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.space_10,
    marginTop: SPACING.space_10,
  },
  vote: {
    fontFamily: FONTS.poppins_medium,
    color: COLORS.White,
    fontSize: FONTSIZE.size_14,
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDER_RADIUS.radius_25,
  },
  genre: {
    color: COLORS.WhiteRGBA75,
    fontSize: FONTSIZE.size_10,
    fontFamily: FONTS.poppins_regular,
  },
  movieInfo: {
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
});

//make this component available to the app
export default MovieCard;

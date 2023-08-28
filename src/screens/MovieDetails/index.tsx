//import liraries
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  movieDetailsRequest,
  movieCastRequest,
} from '../../Redux/Reducers/MovieReducer';
import {
  BORDER_RADIUS,
  COLORS,
  FONTS,
  FONTSIZE,
  SPACING,
} from '../../Theme/theme';
import AppHeader from '../../components/AppHeader';
import {baseImagePath} from '../../api/apicalls';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../../components/customIcon';
import CategoryHeader from '../../components/CategoryHeader';
import CastCard from '../../components/CastCard';
import {screenName} from '../../Constants/screenName';

// create a component
const MovieDetails = ({navigation, route}: any) => {
  const {movieId} = route.params;
  const dispatch = useDispatch();
  const {movieDetails, movieCast, loading} = useSelector(
    (state: any) => state.movies,
  );
  useEffect(() => {
    dispatch(movieDetailsRequest({movieId}));
    dispatch(movieCastRequest({movieId}));
  }, []);
  if (loading == true) {
    return (
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
        style={styles.container}>
        <StatusBar hidden backgroundColor={COLORS.Black} />
        <View style={styles.HeaderContainer}>
          <AppHeader
            name="close"
            header=""
            action={() => navigation.goBack()}
          />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView bounces={false} style={styles.container}>
      <StatusBar hidden backgroundColor={COLORS.Black} />
      <View>
        <ImageBackground
          style={styles.imageBG}
          source={{
            uri: baseImagePath('w780', movieDetails?.backdrop_path),
          }}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.HeaderContainer}>
              <AppHeader
                name="close"
                header={movieDetails?.original_title}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.imageBG}>
          <Image
            source={{uri: baseImagePath('w780', movieDetails?.poster_path)}}
            style={styles.cardImage}
          />
        </View>
      </View>
      <View style={styles.timeContainer}>
        <CustomIcon
          name="clock"
          size={FONTSIZE.size_20}
          color={COLORS.WhiteRGBA50}
        />
        <Text style={styles.runTimeText}>
          {Math.floor(movieDetails?.runtime / 60)}h {movieDetails?.runtime % 60}{' '}
          min
        </Text>
      </View>
      <View>
        <Text style={styles.title}>{movieDetails?.title}</Text>
        <View style={styles.genreContainer}>
          {movieDetails?.genres.map((genre: any) => {
            return (
              <View key={genre.id} style={styles.genreBox}>
                <Text key={genre.id} style={styles.genreText}>
                  {genre.name}
                </Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.tagline}> {movieDetails?.tagline}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
          <CustomIcon
            name="star"
            size={FONTSIZE.size_20}
            color={COLORS.Yellow}
          />
          <Text style={styles.runTimeText}>
            {' '}
            {movieDetails?.vote_average.toFixed(1)}({movieDetails?.vote_count})
          </Text>
          <Text style={styles.runTimeText}>
            {' '}
            {movieDetails?.release_date.substring(8, 10)}{' '}
            {new Date(movieDetails?.release_date).toLocaleString('default', {
              month: 'long',
            })}{' '}
            {new Date(movieDetails?.release_date).getFullYear()}
          </Text>
        </View>
        <Text style={styles.description}>{movieDetails?.overview}</Text>
      </View>
      <View>
        <CategoryHeader title="Top Cast" />
        <FlatList
          data={movieCast?.cast}
          keyExtractor={(item: any) => item.id}
          horizontal
          contentContainerStyle={styles.containerGap24}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}: any) => {
            return (
              <CastCard
                shouldMarginateAtEnd={true}
                cardWidth={80}
                isFirst={index == 0 ? true : false}
                isLast={index == movieCast.length - 1 ? true : false}
                key={item.id}
                title={item?.original_name}
                imagePath={baseImagePath('w185', item?.profile_path)}
                subTitle={item?.character}
              />
            );
          }}
        />
        <View>
          <TouchableOpacity
            style={styles.buttonBG}
            onPress={() => {
              navigation.navigate(screenName.seatBooking, {
                BgImage: baseImagePath('w780', movieDetails?.backdrop_path),
                PosterImage: baseImagePath(
                  'original',
                  movieDetails?.poster_path,
                ),
              });
            }}>
            <Text style={styles.buttonText}>Select Seats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  HeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    borderRadius: BORDER_RADIUS.radius_20,
  },
  linearGradient: {
    height: '100%',
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_15,
  },
  runTimeText: {
    color: COLORS.White,
    marginLeft: SPACING.space_10,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTS.poppins_medium,
  },
  title: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTS.poppins_regular,
    marginVertical: SPACING.space_15,
    marginHorizontal: SPACING.space_36,
    textAlign: 'center',
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.space_20,
    alignItems: 'center',
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.radius_25,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
  },
  genreText: {
    color: COLORS.WhiteRGBA75,
    fontSize: FONTSIZE.size_10,
    fontFamily: FONTS.poppins_regular,
  },
  tagline: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTS.poppins_thin,
    fontStyle: 'italic',
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  infoContainer: {
    marginHorizontal: SPACING.space_24,
  },
  rateContainer: {
    flexDirection: 'row',
    // gap: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  description: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTS.poppins_thin,
    marginTop: SPACING.space_10,
  },
  containerGap24: {
    gap: SPACING.space_15,
  },
  buttonBG: {
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  buttonText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTS.poppins_medium,
    borderRadius: BORDER_RADIUS.radius_25 * 2,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.Orange,
  },
});

//make this component available to the app
export default MovieDetails;

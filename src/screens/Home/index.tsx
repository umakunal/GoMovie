//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {screenName} from '../../Constants/screenName';
import {COLORS, SPACING} from '../../Theme/theme';
import InputHeader from '../../components/InputHeader';
import {
  nowPlayingMovieListRequest,
  upcomingMovieListRequest,
  popularMovieListRequest,
} from '../../Redux/Reducers/MovieReducer';
import {useDispatch, useSelector} from 'react-redux';
import CategoryHeader from '../../components/CategoryHeader';
import SubMovieCard from '../../components/SubMovieCard';
import {baseImagePath} from '../../api/apicalls';
import MovieCard from '../../components/MovieCard';

const {height, width} = Dimensions.get('window');
// create a component
const Home = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [nowPlayingMoviesArray, setNowPlayingMoviesArray] = useState<any>([]);
  // const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);
  // const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);

  const {nowPlayingMoviesList, upcomingMoviesList, popularMoviesList, loading} =
    useSelector((state: any) => state.movies);
  // useEffect
  useEffect(() => {
    dispatch(nowPlayingMovieListRequest({}));
    dispatch(upcomingMovieListRequest({}));
    dispatch(popularMovieListRequest({}));
  }, []);

  const searchFunction = (text: string) => {
    navigation.navigate(screenName.search, {
      movieName: text,
    });
  };

  if (loading) {
    return (
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.container}
        style={styles.container}>
        <StatusBar hidden backgroundColor={COLORS.Black} />
        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchFunction} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      bounces={false}
      style={styles.container}>
      <StatusBar hidden backgroundColor={COLORS.Black} />
      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={searchFunction} />
      </View>
      <CategoryHeader title="Now Playing" />
      <FlatList
        data={nowPlayingMoviesList}
        horizontal
        bounces={false}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.containerGap36}
        decelerationRate={0}
        snapToInterval={width * 0.7 + SPACING.space_36}
        renderItem={({item, index}: any) => {
          return (
            <MovieCard
              shouldMarginateAtEnd={true}
              cardFunction={() => {
                navigation.navigate(screenName.movieDetails, {
                  movieId: item?.id,
                });
              }}
              cardWidth={width * 0.7}
              isFirst={index == 0 ? true : false}
              isLast={index == nowPlayingMoviesList.length - 1 ? true : false}
              imagePath={baseImagePath('w780', item?.poster_path)}
              title={item?.original_title}
              genre={item?.genre_ids.slice(1, 4)}
              vote_average={item?.vote_average}
              vote_count={item?.vote_count}
            />
          );
        }}
      />
      <CategoryHeader title="Popular" />
      <FlatList
        data={popularMoviesList}
        horizontal
        bounces={false}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}: any) => (
          <SubMovieCard
            shouldMarginateAtEnd={true}
            cardFunction={() => {
              navigation.navigate(screenName.movieDetails, {
                movieId: item?.id,
              });
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == popularMoviesList.length - 1 ? true : false}
            imagePath={baseImagePath('w342', item?.poster_path)}
            title={item?.original_title}
          />
        )}
      />
      <CategoryHeader title="Upcoming" />
      <FlatList
        data={upcomingMoviesList}
        horizontal
        bounces={false}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}: any) => (
          <SubMovieCard
            shouldMarginateAtEnd={true}
            cardFunction={() => {
              navigation.navigate(screenName.movieDetails, {
                movieId: item?.id,
              });
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList.length - 1 ? true : false}
            imagePath={baseImagePath('w342', item?.poster_path)}
            title={item?.original_title}
          />
        )}
      />
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});

//make this component available to the app
export default Home;

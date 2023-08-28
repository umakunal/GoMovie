//import liraries
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {COLORS, SPACING} from '../../Theme/theme';
import {useDispatch, useSelector} from 'react-redux';
import {searchedMovieListRequest} from '../../Redux/Reducers/MovieReducer';
import {baseImagePath} from '../../api/apicalls';
import SubMovieCard from '../../components/SubMovieCard';
import {screenName} from '../../Constants/screenName';
import InputHeader from '../../components/InputHeader';

const {height, width} = Dimensions.get('screen');
// create a component
const Search = ({navigation, route}: any) => {
  const movieName = route.params?.movieName;
  const dispatch = useDispatch();
  const {SearchedMovieList, loading} = useSelector(
    (state: any) => state.movies,
  );
  useEffect(() => {
    if (movieName == undefined || movieName == '') {
      return;
    } else {
      dispatch(searchedMovieListRequest({movieName}));
    }
  }, []);

  const searchFunction = (text: string) => {
    dispatch(searchedMovieListRequest({movieName: text}));
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar hidden backgroundColor={COLORS.Black} />
        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchFunction} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.Orange} />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
        <FlatList
          data={SearchedMovieList}
          // horizontal
          numColumns={2}
          bounces={false}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={styles.centerContainer}
          ListHeaderComponent={() => (
            <InputHeader searchFunction={searchFunction} />
          )}
          renderItem={({item, index}: any) => (
            <SubMovieCard
              shouldMarginateAtEnd={false}
              shouldMarginateAround={true}
              cardFunction={() => {
                navigation.navigate(screenName.movieDetails, {
                  movieId: item?.id,
                });
              }}
              cardWidth={width / 2 - SPACING.space_12 * 2}
              imagePath={baseImagePath('w342', item?.poster_path)}
              title={item?.original_title}
            />
          )}
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
    width,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
  },
  InputHeaderContainer: {
    display: 'flex',
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },
  centerContainer: {
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

//make this component available to the app
export default Search;

//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Alert,
  ToastAndroid,
} from 'react-native';
import {
  BORDER_RADIUS,
  COLORS,
  FONTS,
  FONTSIZE,
  SPACING,
} from '../../Theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../../components/AppHeader';
import CustomIcon from '../../components/customIcon';
import EncryptedStorage from 'react-native-encrypted-storage';
import {screenName} from '../../Constants/screenName';

const timeArray: string[] = [
  '10:30',
  '12:30',
  '14:30',
  '15:30',
  '19:30',
  '21:30',
];
const generateDate = () => {
  const date = new Date();
  const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekDays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekDay[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekDays.push(tempDate);
  }

  return weekDays;
};

const generateSeats = () => {
  let numberRows = 8;
  let numberColumns = 3;
  let rowArray = [];
  let start = 0;
  let reachNine = false;
  for (let i = 0; i < numberRows; i++) {
    let columnArray = [];
    for (let j = 0; j < numberColumns; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObject);
      start++;
    }
    if (i == 3) {
      numberColumns += 2;
    }
    if (numberColumns < 9 && !reachNine) {
      numberColumns += 2;
    } else {
      reachNine = true;
      numberColumns -= 2;
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};
// create a component
const SeatBooking = ({navigation, route}: any) => {
  const [DateArray, setDateArray] = useState<any[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState<any[]>([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

  const selectSeat = (index: number, seatIndex: number, seatNumber: number) => {
    if (!twoDSeatArray[index][seatIndex].taken) {
      let array: any = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][seatIndex].selected = !temp[index][seatIndex].selected;
      if (!array.includes(seatNumber)) {
        array.push(seatNumber);
        setSelectedSeatArray(array);
      } else {
        const tempIndex = array.indexOf(seatNumber);
        if (tempIndex > -1) {
          array.splice(tempIndex, 1);
          setSelectedSeatArray(array);
        }
      }
      let tempPrice = array.length * 5.0;
      console.log('tempPrice--------->', tempPrice);
      setPrice(tempPrice);
      setTwoDSeatArray(temp);
    }
  };

  const BookSeats = async () => {
    if (
      selectedSeatArray.length !== 0 &&
      timeArray[selectedTimeIndex] !== undefined &&
      DateArray[selectedDateIndex] !== undefined
    ) {
      try {
        await EncryptedStorage.setItem(
          'ticket',
          JSON.stringify({
            seatArray: selectedSeatArray,
            time: timeArray[selectedTimeIndex],
            date: DateArray[selectedDateIndex],
            price: price,
            ticketImage: route?.params?.PosterImage,
          }),
        );
      } catch (error) {
        console.log('Something went wrong while saving the ticket', error);
      }
      navigation.navigate(screenName.ticket, {
        seatArray: selectedSeatArray,
        time: timeArray[selectedTimeIndex],
        date: DateArray[selectedDateIndex],
        price: price,
        ticketImage: route?.params?.PosterImage,
      });
    } else {
      ToastAndroid.showWithGravity(
        'Please Select Seats, Date and Time Of The Show',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <StatusBar hidden backgroundColor={COLORS.Black} />
      <View>
        <ImageBackground
          source={{uri: route?.params?.BgImage}}
          style={styles.imageBG}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.HeaderContainer}>
              <AppHeader
                name="close"
                header=""
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.screenText}>Screen This side</Text>
        <View style={styles.seatContainer}>
          <View style={styles.containerGap20}>
            {twoDSeatArray.map((item, index) => {
              return (
                <View key={index} style={styles.seatRow}>
                  {item.map((seat, seatIndex) => {
                    return (
                      <TouchableOpacity
                        disabled={seat.taken}
                        key={seat.number}
                        onPress={() => {
                          selectSeat(index, seatIndex, seat.number);
                        }}>
                        <CustomIcon
                          name="seat"
                          style={[
                            styles.seatIcon,
                            seat.taken ? {color: COLORS.Grey} : {},
                            seat.selected ? {color: COLORS.Orange} : {},
                          ]}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.seatRadioContainer}>
          <View style={styles.radioContainer}>
            <CustomIcon
              name="radio"
              size={FONTSIZE.size_20}
              color={COLORS.White}
            />
            <Text style={styles.radioText}>Available</Text>
          </View>
          <View style={styles.radioContainer}>
            <CustomIcon
              name="radio"
              size={FONTSIZE.size_20}
              color={COLORS.Grey}
            />
            <Text style={styles.radioText}>Taken</Text>
          </View>
          <View style={styles.radioContainer}>
            <CustomIcon
              name="radio"
              size={FONTSIZE.size_20}
              color={COLORS.Orange}
            />
            <Text style={styles.radioText}>Selected</Text>
          </View>
        </View>
      </View>

      <View>
        <FlatList
          data={DateArray}
          keyExtractor={(item, index) => item?.date}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}: any) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedDateIndex(index);
                }}>
                <View
                  style={[
                    styles.dateContainer,
                    index == 0
                      ? {marginLeft: SPACING.space_24}
                      : index == DateArray.length - 1
                      ? {marginRight: SPACING.space_24}
                      : {},
                    index == selectedDateIndex
                      ? {backgroundColor: COLORS.Orange}
                      : {},
                  ]}>
                  <Text style={styles.dateText}>{item?.date}</Text>
                  <Text style={styles.dayText}>{item?.day}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.outerContainer}>
        <FlatList
          data={timeArray}
          keyExtractor={(item, index) => item}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}: any) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTimeIndex(index);
                }}>
                <View
                  style={[
                    styles.timeContainer,
                    index == 0
                      ? {marginLeft: SPACING.space_24}
                      : index == DateArray.length - 1
                      ? {marginRight: SPACING.space_24}
                      : {},
                    index == selectedTimeIndex
                      ? {backgroundColor: COLORS.Orange}
                      : {},
                  ]}>
                  <Text style={styles.timeText}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.totalContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>Total Price</Text>
          <Text style={styles.price}>${price}.00</Text>
        </View>
        <TouchableOpacity onPress={BookSeats}>
          <Text style={styles.buttonText}>Buy Tickets</Text>
        </TouchableOpacity>
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
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  HeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  screenText: {
    color: COLORS.WhiteRGBA15,
    fontSize: FONTSIZE.size_10,
    fontFamily: FONTS.poppins_regular,
    textAlign: 'center',
    marginTop: SPACING.space_28,
  },
  seatContainer: {
    marginVertical: SPACING.space_20,
  },
  containerGap20: {
    gap: SPACING.space_20,
  },
  seatRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.space_12,
  },
  seatIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  seatRadioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: SPACING.space_20,
    marginBottom: SPACING.space_15,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_10,
  },
  radioText: {
    fontFamily: FONTS.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  dateContainer: {
    width: SPACING.space_10 * 7,
    height: SPACING.space_10 * 10,
    borderRadius: BORDER_RADIUS.radius_10 * 10,
    backgroundColor: COLORS.DarkGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: FONTS.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  dayText: {
    fontFamily: FONTS.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  timeContainer: {
    paddingVertical: SPACING.space_4,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.radius_25,
    borderColor: COLORS.WhiteRGBA50,
    paddingHorizontal: SPACING.space_20,
    backgroundColor: COLORS.DarkGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: FONTS.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  outerContainer: {
    marginVertical: SPACING.space_24,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  priceText: {
    fontFamily: FONTS.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  price: {
    fontFamily: FONTS.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  buttonText: {
    borderRadius: BORDER_RADIUS.radius_25,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    fontFamily: FONTS.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    backgroundColor: COLORS.Orange,
  },
});

//make this component available to the app
export default SeatBooking;

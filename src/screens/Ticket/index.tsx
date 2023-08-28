//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import AppHeader from '../../components/AppHeader';
import {
  BORDER_RADIUS,
  COLORS,
  FONTS,
  FONTSIZE,
  SPACING,
} from '../../Theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../../components/customIcon';

// create a component
const Ticket = ({navigation, route}: any) => {
  const [ticketData, setTicketData] = useState<any>(route?.params);

  useEffect(() => {
    (async () => {
      try {
        const ticket = await EncryptedStorage.getItem('ticket');
        if (ticket !== undefined && ticket !== null) {
          setTicketData(JSON.parse(ticket));
        }
      } catch (error) {
        console.log(' Something went wrong while getting the ticket', error);
      }
    })();
  }, []);
  if (ticketData !== route?.params && route?.params != undefined) {
    setTicketData(route?.params);
  }
  if (ticketData == undefined || ticketData == null) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.HeaderContainer}>
          <AppHeader
            name="close"
            header=""
            action={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.HeaderContainer}>
        <AppHeader
          name="close"
          header="My Tickets"
          action={() => navigation.goBack()}
        />
      </View>
      <View style={styles.ticketContainer}>
        <ImageBackground
          source={{uri: ticketData?.ticketImage}}
          style={styles.ticketBGImage}>
          <LinearGradient
            colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
            style={styles.linearGradient}>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, left: -40},
              ]}
            />
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, right: -40},
              ]}
            />
          </LinearGradient>
        </ImageBackground>
        <View style={styles.linear}></View>
        <View style={styles.ticketFooter}>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, left: -40},
            ]}
          />
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, right: -40},
            ]}
          />
          <View style={styles.ticketDateContainer}>
            <View style={styles.subTitleContainer}>
              <Text style={styles.dateText}>{ticketData?.date?.date}</Text>
              <Text style={styles.dayText}>{ticketData?.date?.day}</Text>
            </View>
            <View style={styles.subTitleContainer}>
              <CustomIcon name="clock" style={styles.clockIcon} />
              <Text style={styles.timeText}>{ticketData?.time}</Text>
            </View>
          </View>
          <View style={styles.seatsContainer}>
            <View style={styles.subTitleContainer}>
              <Text style={styles.subHeading}>Hall</Text>
              <Text style={styles.subTitle}>02</Text>
            </View>
            <View style={styles.subTitleContainer}>
              <Text style={styles.subHeading}>Row</Text>
              <Text style={styles.subTitle}>04</Text>
            </View>
            <View style={styles.subTitleContainer}>
              <Text style={styles.subHeading}>Seats</Text>
              <Text style={styles.subTitle}>
                {ticketData?.seatArray
                  .slice(0, 3)
                  .map((item: any, index: number, arr: any) => {
                    return item + (index == arr.length - 1 ? '' : ', ');
                  })}
              </Text>
            </View>
          </View>
          <Image
            source={require('../../assets/image/barcode.png')}
            style={styles.barcodeImage}
          />
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  HeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ticketBGImage: {
    alignSelf: 'center',
    width: 220,
    aspectRatio: 200 / 300,
    borderTopLeftRadius: BORDER_RADIUS.radius_25,
    borderTopRightRadius: BORDER_RADIUS.radius_25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    height: '70%',
  },
  linear: {
    borderTopColor: COLORS.Black,
    borderTopWidth: 3,
    width: 220,
    alignSelf: 'center',
    backgroundColor: COLORS.Orange,
    borderStyle: 'dashed',
  },
  ticketFooter: {
    backgroundColor: COLORS.Orange,
    width: 220,
    alignItems: 'center',
    paddingBottom: SPACING.space_36,
    alignSelf: 'center',
    borderBottomLeftRadius: BORDER_RADIUS.radius_25,
    borderBottomRightRadius: BORDER_RADIUS.radius_25,
  },
  ticketDateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  seatsContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  dateText: {
    fontFamily: FONTS.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  dayText: {
    fontFamily: FONTS.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  timeText: {
    fontFamily: FONTS.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  subTitleContainer: {
    alignItems: 'center',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    paddingBottom: SPACING.space_10,
    paddingTop: SPACING.space_8,
  },
  subTitle: {
    fontFamily: FONTS.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  subHeading: {
    fontFamily: FONTS.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  barcodeImage: {
    height: 50,
    aspectRatio: 158 / 52,
  },
  blackCircle: {
    height: 70,
    width: 70,
    borderRadius: 80,
    backgroundColor: COLORS.Black,
  },
});

//make this component available to the app
export default Ticket;

//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {BORDER_RADIUS, COLORS, FONTS, FONTSIZE, SPACING} from '../Theme/theme';
import CustomIcon from './customIcon';

// create a component
const InputHeader = (props: any) => {
  const [searchText, setSearchText] = useState<string>('');
  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.textInput}
        placeholder="Search your Movies..."
        placeholderTextColor={COLORS.WhiteRGBA32}
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <TouchableOpacity onPress={() => props.searchFunction(searchText)}>
        <CustomIcon
          name="search"
          size={FONTSIZE.size_20}
          color={COLORS.Orange}
        />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  inputBox: {
    display: 'flex',
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_24,
    borderRadius: BORDER_RADIUS.radius_25,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    fontFamily: FONTS.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
});

//make this component available to the app
export default InputHeader;

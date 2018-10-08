import React from 'react';
import { Text, View } from 'react-native';

//make the component

const Header = props => {
  const { viewStyle, textStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

//Styling the header
const styles = {
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  viewStyle: {
    backgroundColor: '#0101DF',
    justifyContent: 'center',
    //alignItems:'center',
    height: 80,
    paddingLeft: 15,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    elevation: 2,
    position: 'relative'
  }
};

//make the component avavilable for other components
export default Header;

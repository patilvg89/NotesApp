/* eslint-disable */

import React from 'react';
import { TouchableOpacity, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const NavigationBarButton = ( { onPress, imageName, style } ) => {
    return(
        <TouchableOpacity style={style} onPress={onPress}>
        {Platform.os === "ios" 
        ?<Image source={{uri: imageName}} style={{width: 40, height: 40}} /> 
        :<Icon name="plus" size={30} color="#000" />}
       </TouchableOpacity>
    );
}

export default NavigationBarButton


/* 
   
static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: <NavigationBarButton style={styles.navigationRightButton} onPress={() => navigation.state.params.handleIconTouch()} imageName='add' />
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({
      handleIconTouch:
        this.handleIconTouch
    });

  }

  handleIconTouch = () => {
    console.log('Touched!');
  }
  
*/
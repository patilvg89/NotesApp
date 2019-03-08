/* eslint-disable */

import React, { Component } from "react";
import { StyleSheet, TouchableIcon, Image } from "react-native";
import { Button, Text, View } from "native-base";
import NavigationBarButton from '../Common/NavigationBarButton';
import ActionSheetView from '../Common/ActionSheetView';
import ImagePicker from 'react-native-image-picker';
import { pickerItems } from '../constants/constants'

const ImagePickerOption = {
  CAMERA: 0,
  PHOTO_GALLERY: 1
}

export default class StartScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      // headerRight: <NavigationBarButton style={styles.navigationRightButton} onPress={() => navigation.state.params.handleIconTouch()} imageName='add' />
    };
  };


  componentWillMount() {
    this.props.navigation.setParams({
      handleIconTouch:
        this.handleIconTouch
    });
  }

  onPressActionSheet(index) {

    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    switch (index) {

      case ImagePickerOption.CAMERA:
        ImagePicker.launchCamera(options, (response) => {
          // Same code as in above section!
          console.log('Response = ', response);
          this.showImage(response)
        });
        break
      case ImagePickerOption.PHOTO_GALLERY:
        ImagePicker.launchImageLibrary(options, (response) => {
          // Same code as in above section!
          console.log('Response = ', response);
          this.showImage(response)
        });
        break
    }

    console.log('Action sheet! ', index);
  }

  showImage(response) {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: response.uri };

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.setState({
        avatarSource: source,
      });
    }
  }

  handleIconTouch = () => {
    let data = { item: { title: '', description: '' }, pickerItemsArray: [...pickerItems] }
    this.props.navigation.navigate("NoteDetailScreen", data)
  }


  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("HomeScreen");
          }}
        >
          <Text>Home Screen</Text>
        </Button>

        <ActionSheetView
          onPress={(index) => this.onPressActionSheet(index)}
          title='Select Your Option'
          options={['Camera', 'Photo Gallery', 'Cancel']}
          cancelButtonIndex={2}
          ref={o => this.ActionSheetView = o}
        />
        <Button
          style={styles.button}
          onPress={() => this.ActionSheetView.showActionSheet()}
        >
          <Text>Action Sheet</Text>
        </Button>
          
        <Button
          style={styles.button}
          onPress={() => this.props.navigation.navigate("AddCategoryScreen")}
        >
          <Text>Add Category</Text>
        </Button>
        <Image source={this.state.avatarSource} style={styles.image} />

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#F5FCFF",
  },
  button: {
    marginTop: 10,
    alignSelf: 'center',
  },
  navigationRightButton: {
    paddingRight: 10,
  },

  image: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 10
  }
});

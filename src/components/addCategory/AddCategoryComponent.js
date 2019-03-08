/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { Button, Text, View } from 'native-base';
import { connect } from 'react-redux';
import { TextInput, StyleSheet } from 'react-native';
import ColorPicker from '../color-picker/ColorPicker';
import { saveCategory } from '../../redux/actions';

class AddCategoryComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: 'Enter your category',
      colorName: null
    };
    this.submitData = this.submitData.bind(this);
  }

  submitData = () => {
    const { categoryName, colorName } = this.state;
    this.props.saveCategory(categoryName, colorName);
    this.props.navigation.pop();
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.title}> Category Name</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={text => this.setState({ categoryName: text })}
        />
        <Text style={styles.title}>Choose Color</Text>
        <ColorPicker
          onChange={colorCode => this.setState({ colorName: colorCode })}
        />
        <Button style={styles.button} onPress={this.submitData}>
          <Text>Submit</Text>
        </Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    marginTop: 220,
    alignSelf: 'center'
  },
  containerStyle: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: 'normal',
    color: '#323232'
  },
  inputBox: {
    // height: 30,
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1
  }
});

const mapDispatchToProps = dispatch => ({
  saveCategory: (categoryName, colorName) => {
    dispatch(saveCategory(categoryName, colorName));
  }
});

export default connect(null, mapDispatchToProps)(AddCategoryComponent);

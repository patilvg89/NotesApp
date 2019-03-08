import React, { PureComponent } from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default class SettingsScreen extends PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.mainContainer}>
        <Button
          title='Add Category'
          onPress={() => {
            navigation.navigate('AddCategoryScreen');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
  }
});
SettingsScreen.navigationOptions = ({ navigation }) => {
  return { title: 'Settings' };
};

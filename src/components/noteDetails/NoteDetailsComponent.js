/* eslint-disable object-curly-newline */
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import {
  Item,
  Input,
  Label,
  Icon,
  Textarea,
  Picker
} from 'native-base';

const NoteDetailsComponent = ({
  title,
  description,
  selectedCategory,
  pickerItems,
  categories,
  onPickerValueChange,
  onSaveClick,
  onTitleValueChange,
  onContentValueChange
}) => {
  const pickerItemsView = pickerItems.map((item, index) => (
    <Picker.Item key={index} value={item} label={item} />
  ));

  return (
    <View style={styles.container}>
      <Item stackedLabel>
        <Label>Title</Label>
        <Input value={title} onChangeText={item => onTitleValueChange(item)} />
      </Item>

      <Label>Body</Label>
      <Textarea
        style={styles.contentContainer}
        rowSpan={5}
        bordered
        placeholder="Enter text here"
        value={description}
        onChangeText={item => onContentValueChange(item)}
      />

      <Item>
        <View style={styles.pickerContainer}>
          <Label>Category</Label>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            placeholder="Select Category"
            placeholderStyle={{ color: '#bfc6ea' }}
            placeholderIconColor="#007aff"
            selectedValue={selectedCategory}
            onValueChange={(item, index) => {
              onPickerValueChange(item, index, categories);
            }}
          >
            {pickerItemsView}
          </Picker>
        </View>
      </Item>

      <Button
        style={styles.saveButton}
        onPress={() => {
          onSaveClick();
        }}
        title="Save"
      />
    </View>
  );
};

NoteDetailsComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  pickerItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  onPickerValueChange: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onTitleValueChange: PropTypes.func.isRequired,
  onContentValueChange: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  pickerContainer: {
    flex: 1
  },
  contentContainer: {
    // flex: 1
  },
  saveButton: {
    marginTop: 20,
    flex: 1,
    alignSelf: 'center',
    width: 200,
    justifyContent: 'center'
  }
});

export default NoteDetailsComponent;

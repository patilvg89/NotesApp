/* eslint-disable camelcase */
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Card, Text } from 'native-base';
import PropTypes from 'prop-types';

const moment = require('moment');

const NoteItem = ({ data, onItemClick }) => {
  const { title, category, description, colorCode, updated } = data;
  return (
    <TouchableOpacity onPress={() => onItemClick(data)}>
      <Card style={styles.cardView}>
        <View style={{ width: 10, backgroundColor: colorCode }} />
        <View style={styles.CardInnerView}>
          {/* <Text style={styles.title}>{title.toString()}</Text> */}
          <Text style={styles.subtitle} numberOfLines={1}>{description.toString()}</Text>
          <Text style={styles.category}>Category : {category.toString()}</Text>
          <Text style={styles.dateTime}>{moment(new Date(updated.toString())).format('DD-MM-YYYY, HH:mm A') }</Text>
        </View>
        {/* <Image source={{ uri: 'https://www.jquery-az.com/html/images/banana.jpg' }} style={styles.image} /> */}
      </Card>
    </TouchableOpacity>
  );
};

NoteItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  onItemClick: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  cardView: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10
  },
  CardInnerView: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1
  },
  title: {
    fontSize: 15,
    fontStyle: 'normal',
    color: '#323232'
  },
  subtitle: {
    fontSize: 15,
    fontStyle: 'normal',
    color: '#323232'
  },
  category: {
    fontSize: 12,
    fontStyle: 'normal',
    color: '#323232'
  },
  dateTime: {
    fontSize: 12,
    flex: 1,
    fontStyle: 'normal',
    marginRight: 10,
    color: '#d3d3d3',
    alignSelf: 'flex-end',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    alignSelf: 'center',
    justifyContent: 'flex-end'
  }
});

export default NoteItem;

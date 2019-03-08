/*eslint-disable */
import React, { Component } from 'react';
import { View, Text, Fab } from 'native-base';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import NoteItem from '../components/notes/NoteItem';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { pickerItems } from '../constants/constants';
import { fetchNotes } from '../redux/actions';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.onPressItem = this.onPressItem.bind(this);
    this.renderCurrentItem = this.renderCurrentItem.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
  }

  componentDidMount() {
    this.props.getAllNotes();
  }
  
  onPressItem = item => {
    this.props.navigation.navigate('NoteDetailScreen', {
      item: { ...item, isNewNote: false },
      pickerItemsArray: [...pickerItems]
    });
  };

  renderCurrentItem = ({ item }) => (
    <NoteItem data={item} onItemClick={this.onPressItem} />
  );

  keyExtractor = (item, index) => item.id.toString();

  render() {
    const { notes, loading, error } = this.props
    return (
      <View style={{ flex: 1 }}>
        { notes.length > 0 ? (
          <FlatList
            data={notes}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCurrentItem}
          />
        ) : (
          <View style={styles.emptyView}>
            <Text style={{ alignSelf: 'center' }}>Note list is empty.</Text>
          </View>
        )}
        <Fab
          active={true}
          containerStyle={{}}
          style={{ backgroundColor: '#000' }}
          position="bottomRight"
          onPress={() => {
            let data = {
              item: { title: '', description: '', isNewNote: true },
              pickerItemsArray: [...pickerItems]
            };
            this.props.navigation.navigate('NoteDetailScreen', data);
          }}>
          <Icon name="edit" />
        </Fab>
      </View>
    );
  }
}

HomeScreen.navigationOptions = ({ navigation }) => {
  const { state } = navigation;
  return {
    title: 'Home Screen',
    headerRight: (
      <TouchableOpacity
        style={styles.navigationRightButton}
        onPress={() => {
          navigation.navigate('SettingsScreen');
        }}
      >
        <Icon name='cog' size={30} color='#000' />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  navigationRightButton: {
    paddingRight: 10
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#d3d3d3'
  }
});

const mapStateToProps = state => ({
  loading: state.noteReducer.loading,
  error: state.noteReducer.error,
  notes: state.noteReducer.notes
});

const mapDispatchToProps = dispatch => {
  return {
    getAllNotes: () => {
      dispatch(fetchNotes());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)( HomeScreen );

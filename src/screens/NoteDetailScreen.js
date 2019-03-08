/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import NoteDetailsComponent from '../components/noteDetails/NoteDetailsComponent';
import { addNote, updateNote, deleteNote, getAllCategory } from '../redux/actions';

// eslint-disable-next-line react/prefer-stateless-function
class NoteDetailScreen extends Component {
  isNewNote = true;

  constructor(props) {
    super(props);
    const {
      item,
      pickerItemsArray
    } = props.navigation.state.params;
    const { id, title, description, category, colorCode, created, imageUrl, isNewNote } = item;
    this.pickerItems = [];

    this.isNewNote = isNewNote;
    this.category = category;
    this.colorCode = colorCode;

    if (this.isNewNote) {
      this.category = pickerItemsArray[0].category;
      this.colorCode = pickerItemsArray[0].colorCode;
    }
    this.state = {
      id,
      title,
      description,
      category: this.category,
      colorCode: this.colorCode,
      pickerItemsArray,
      created,
      imageUrl
    };
    this.onPickerValueChange = this.onPickerValueChange.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onTitleValueChange = this.onTitleValueChange.bind(this);
    this.onContentValueChange = this.onContentValueChange.bind(this);
  }

  componentWillMount() {
    const { setParams } = this.props.navigation;
    setParams({
      isNewNote: this.isNewNote,
      props: this.props
    });
  }

  componentDidMount = () => {
    const { pickerItemsArray } = this.state;
    this.props.getAllCategory(pickerItemsArray);

    this.category = pickerItemsArray[0].category;
    this.colorCode = pickerItemsArray[0].colorCode;
  };

  onPickerValueChange = (value, index, pickerItemsArray) => {
    const obj = pickerItemsArray[index];
    this.setState({ category: value, colorCode: obj.colorCode });
  };

  onSaveClick = () => {
    const {
      id,
      title,
      description,
      category,
      colorCode,
      created,
      imageUrl
    } = this.state;

    if (title.trim().length === 0 && description.trim().length === 0) {
      alert('All fields are mandatory');
    } else {
      try {
        if (this.isNewNote) {
          this.props.addNote(title, description, category, colorCode, [null]);
        } else {
          this.props.updateNote(id, title, description, category, colorCode, imageUrl, created)
        }
      } catch (error) {
        console.log('error save', error);
      }

      // go to previous screen
      this.props.navigation.pop();
    }
  };

  onTitleValueChange = (value) => {
    this.setState({ title: value });
  };

  onContentValueChange = (value) => {
    this.setState({ description: value });
  };

  render() {
    const { title, description, category } = this.state;
    const { categories, pickerItems = [] } = this.props;
    return (
      <NoteDetailsComponent
        title={title}
        description={description}
        selectedCategory={category === undefined ? '' : category}
        pickerItems={pickerItems}
        categories={categories}
        onPickerValueChange={this.onPickerValueChange}
        onSaveClick={this.onSaveClick}
        onTitleValueChange={this.onTitleValueChange}
        onContentValueChange={this.onContentValueChange}
      />
    );
  }
}

NoteDetailScreen.navigationOptions = ({ navigation }) => {
  const { state } = navigation;
  return {
    title: 'Detail Screen',
    headerRight:
      state.params.isNewNote === true ||
      state.params.isNewNote === undefined ? null : (
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          onPress={() => {
            state.params.props.deleteNote(state.params.item.id);
            navigation.pop();
          }}
        >
          <Icon name='trash' size={30} color='#000' />
        </TouchableOpacity>
        )
  };
};

const mapStateToProps = state => ({
  loading: state.noteReducer.loading,
  error: state.noteReducer.error,
  notes: state.noteReducer.notes,
  categories: state.noteReducer.categories,
  pickerItems: state.noteReducer.pickerItems,
});

const mapDispatchToProps = dispatch => ({
  getAllCategory: (pickerItemsArray) => {
    dispatch(getAllCategory(pickerItemsArray));
  },
  addNote: (title, description, category, colorCode, images) => {
    dispatch(addNote(title, description, category, colorCode, images));
  },
  updateNote: (id, title, description, category, colorCode, imageUrl, created) => {
    dispatch(updateNote(id, title, description, category, colorCode, imageUrl, created));
  },
  deleteNote: (id) => {
    dispatch(deleteNote(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetailScreen);

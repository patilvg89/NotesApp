import { types } from './types';
import {
    getAllNotes,
    saveNotes,
    updateNoteToDB,
    deleteNoteFromDB,
    getAllCategoryFromDB,
    saveCategoryToDB
} from '../../Common/DatabaseManager';

export const fetchNotes = () => async (dispatch) => {
  dispatch({ type: types.FETCH_NOTES_LOADING });

  await getAllNotes((values) => {
    dispatch({ type: types.FETCH_NOTES_RESPONSE, payload: values });
  });
};

export const addNote = (
  title,
  description,
  category,
  colorCode,
  images
) => async (dispatch) => {
  await saveNotes(title, description, category, colorCode, images);
  await getAllNotes((values) => {
    dispatch({ type: types.ADD_NOTE, payload: values });
  });
};

export const updateNote = (
  id,
  title,
  description,
  category,
  colorCode,
  imageUrl,
  created
) => async (dispatch) => {
  await updateNoteToDB(
    id,
    title,
    description,
    category,
    colorCode,
    imageUrl,
    created
  );
  await getAllNotes((values) => {
    dispatch({ type: types.UPDATE_NOTE, payload: values });
  });
};

export const deleteNote = id => async (dispatch) => {
  await deleteNoteFromDB(id);
  await getAllNotes((values) => {
    dispatch({ type: types.DELETE_NOTE, payload: values });
  });
};

export const saveCategory = (categoryName, colorName) => async (dispatch) => {
  await saveCategoryToDB(categoryName, colorName);
  dispatch({ type: types.ADD_CATEGORY });
};

export const getAllCategory = pickerItemDefaultArray => async (dispatch) => {
  let newArray = [];
  await getAllCategoryFromDB((values) => {
    if (values.length > 0) {
      newArray = [...pickerItemDefaultArray, ...values];
    } else {
      newArray = pickerItemDefaultArray;
    }
    dispatch({ type: types.FETCH_CATEGORY, payload: newArray });
  });
};

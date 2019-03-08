/*eslint-disable */

import Utils from '../Common/Utils';

const Realm = require('realm');
console.log('REALM PATH', Realm.defaultPath);

const NotesSchema = {
  name: 'Notes',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    description: 'string',
    category: 'string',
    colorCode: 'string',
    imageUrl: 'string?[]',
    created: 'date',
    updated: 'date'
  }
};

const CategorySchema = {
  name: 'Category',
  primaryKey: 'category',
  properties: {
    category: 'string',
    colorCode: 'string?'
  }
};

let DatabaseManager = {
  realmInstance: function getRealmInstance(callback) {
    Realm.open({ schema: [NotesSchema, CategorySchema] })
      .then(realm => {
        callback(realm);
      })
      .catch(error => {
        console.log(error);
        callback(null);
      });
  },

  getAllNotes: async function(callback) {
    let realm = null;
    await DatabaseManager.realmInstance(value => {
      realm = value;
    });
    let notes = Array.from(realm.objects('Notes'));
    callback(notes);
  },

  saveNotes: async function(title, description, category, colorCode, imageUrl) {
    let realm = null;
    await DatabaseManager.realmInstance(value => {
      realm = value;
    });

    realm.write(() => {
      realm.create('Notes', {
        id: Utils.guid(),
        title,
        description,
        category,
        colorCode,
        imageUrl,
        created: new Date(),
        updated: new Date()
      });
    });
  },

  updateNoteToDB: async function(
    id,
    title,
    description,
    category,
    colorCode,
    imageUrl,
    created
  ) {
    let realm = null;
    await DatabaseManager.realmInstance(value => {
      realm = value;
    });
    realm.write(() => {
      realm.create(
        'Notes',
        {
          id,
          title,
          description,
          category,
          colorCode,
          imageUrl,
          created,
          updated: new Date()
        },
        true
      );
    });
  },

  saveCategoryToDB: async function(category, colorCode) {
    let realm = null;
    await DatabaseManager.realmInstance(value => {
      realm = value;
    });
    realm.write(() => {
      realm.create('Category', {
        category,
        colorCode
      });
    });
  },

  getAllCategoryFromDB: async function(callback) {
    let realm = null;
    await DatabaseManager.realmInstance(value => {
      realm = value;
    });
    let categories = Array.from(realm.objects('Category'));
    callback(categories);
  },

  deleteNoteFromDB: async function(id) {
    let realm = null;
    await DatabaseManager.realmInstance(value => {
      realm = value;
    });
    let noteObject = realm.objectForPrimaryKey('Notes', id);
    realm.beginTransaction();
    realm.delete(noteObject);
    realm.commitTransaction();
  }
};

module.exports = DatabaseManager;

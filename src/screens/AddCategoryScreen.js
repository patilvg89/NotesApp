/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import AddCategoryComponent from '../components/addCategory/AddCategoryComponent';

class AddCategoryScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <AddCategoryComponent {...this.props} />;
  }
}

AddCategoryScreen.navigationOptions = ({ navigation }) => {
  return { title: 'Add Category' };
}

export default AddCategoryScreen;

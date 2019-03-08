/* eslint-disable */

import ActionSheet from 'react-native-actionsheet'
import React, { Component } from 'react'
import { View } from 'react-native' 

class ActionSheetView extends Component {
    showActionSheet = () => {
        this.ActionSheet.show()
    }
    render() {
    return (
        <View>
            <ActionSheet
                ref={o => this.ActionSheet = o}
                title={this.props.title}
                options={this.props.options}
                cancelButtonIndex={this.props.cancelButtonIndex}
                onPress={(index) => { this.props.onPress(index) }}
            />
        </View>
    )
}
}

export default ActionSheetView


/* 
     Use this in your render method

      <ActionSheetView 
          onPress= {(index) => this.onPressActionSheet(index)}
          title='Select Your Option' 
          options={['Camera', 'Photo Gallery', 'Cancel']} 
          cancelButtonIndex={2}
          ref={o => this.ActionSheetView = o} 
        />
     <Button title='Show Action Sheet' onPress={() => this.ActionSheetView.showActionSheet()} />

     onPressActionSheet(index) {
        console.log('Action sheet! ',index);
    }
*/
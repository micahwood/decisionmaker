/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class InputScreen extends Component {

  state = {
    options: ['']
  }

  inputs = {};

  updateOptions(option, index) {
    const options = this.state.options.slice();
    options[index] = option;

    if (!options.includes('')) {
      options.push('');
    }

    this.setState({options});
  }

  focusNextField(id) {
    const input = this.inputs[id];

    if (!input) {
      return;
    }

    this.inputs[id].focus();
  }

  openWheel() {
    this.props.navigator.showModal({
      screen: 'decision.WheelScreen',
      title: 'The Wheel of Decision',
      passProps: {
        options: this.state.options.filter((option) => option !== '')
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Make a decision" onPress={() => this.openWheel()} />
        {this.state.options.map((option, i) =>
          <TextInput
            style={styles.input}
            key={i}
            placeholder={`Option ${i + 1}`}
            blurOnSubmit={ false }
            returnKeyType="next"
            ref={(input) => this.inputs['option' + i] = input}
            onChangeText={(text) => this.updateOptions(text, i)}
            onSubmitEditing={() => this.focusNextField('option' + (i + 1))}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    width: 300,
    height: 40
  }
});

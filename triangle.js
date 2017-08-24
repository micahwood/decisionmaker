import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

export class Triangle extends Component {
  render() {
    return (
      <View style={[styles.triangle, this.props.style]} />
    )
  }
}


export class TriangleDown extends Component {
  render() {
    return (
      <Triangle style={styles.triangleDown} />
    )
  }
}

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    elevation: 100
  },
  triangleDown: {
    transform: [
      {rotate: '180deg'},
      {translateY: -6}
    ]
  }
});

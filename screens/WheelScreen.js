/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Animated,
  Button,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import Canvas from 'react-native-canvas';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

require('gsap');
require('gsap-react-plugin');

import { TriangleDown } from '../triangle';
import Winwheel from '../winwheel';

export default class InputScreen extends Component {

  state = {
    rotateAnim: new Animated.Value(0),
    previousValue: 0,
    wheel: null,
    selected: ''
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  handleCanvas(canvas) {
    if (this.state.wheel) {
      return;
    }

    canvas.height = 320;
    canvas.width = 320;

    this.setState({wheel: new Winwheel(canvas, {
        numSegments: this.props.options.length,
        segments: this.props.options.map((option) => ({ fillStyle: this.getRandomColor(), text: option }))
      })
    });
  }

  randomSpin(velocity) {
    const min = Math.abs(velocity) * 50;
    const max = Math.abs(velocity) * 500;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  spinWheel(velocity, counterClockwise) {
    let rotation = this.randomSpin(velocity);
    if (counterClockwise) {
      rotation = -rotation;
    }
    rotation += this.state.previousValue;
    this.state.rotateAnim.setValue(this.state.previousValue);
    this.setState({previousValue: rotation % 360});

    Animated.timing(
      this.state.rotateAnim,
      { toValue: rotation, duration: 1000, easing: Easing.bezier(.25,.1,.25,1) }
    ).start(() => {
      const sectionDegs = 360 / this.props.options.length;
      // When rotating clockwise we need to subtract 360 from the rotation value
      // if it is counter clockwise then it is not needed
      let selected = Math.floor((360 - this.state.previousValue) / sectionDegs);
      if (counterClockwise) {
        selected = Math.floor(-this.state.previousValue / sectionDegs);
      }
      this.setState({selected: this.props.options[selected]});
    });
  }

  onSwipeRight(gesture) {
    this.spinWheel(gesture.vx);
  }

  onSwipeLeft(gesture) {
    this.spinWheel(gesture.vx, true);
  }

  render() {
    let { rotateAnim, selected } = this.state;
    let interpolateAnim = rotateAnim.interpolate({
      inputRange: [-1440, 1440],
      outputRange: ['-1440deg', '1440deg']
    });

    return (
      <GestureRecognizer style={styles.container}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}>
        <TriangleDown/>
        <Animated.View style={{transform: [{rotate: interpolateAnim}]}}>
          <Canvas ref={this.handleCanvas.bind(this)} />
        </Animated.View>
        <Text>{selected}</Text>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

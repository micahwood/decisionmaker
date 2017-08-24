'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';


class TweenableImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      top: 150,
      left: 20,
      opacity: 0,
      rotation: 0
    };
  }

  getTween(property, finalValue,  duration, options) {
    if (!options) {
      options = {};
    }
    var finalState = {};
    finalState[property] = finalValue;
    return TweenMax.to(this, duration, Object.assign({}, { state: finalState }, options));
  }

  render() {
    var animatableStyles = {
      top: this.state.top,
      left: this.state.left,
      opacity: this.state.opacity,
      transform: [{
        rotate: `${this.state.rotation}deg`
      }]
    };

    return (
      <View style={[{width: 200, height: 200, position: 'absolute'}, animatableStyles]}>
        <Image {...this.props} style={{ width: 200, height: 200 }}/>
      </View>
    );
  }
}

export default class GSAPDemo extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.startAnimation();
    }, 500);
  }

  startAnimation() {

    var timeline = new TimelineMax({
      repeat: -1
    });

    timeline.add(this.refs.image1.getTween('opacity', 1, 3));

    timeline.add(this.refs.image1.getTween('top', '+=100', 2.5, { easing: Power4.easeIn }));

    timeline.add(this.refs.image1.getTween('opacity', .5, 1));

    timeline.add(this.refs.image1.getTween('left', '+=75', .5, { easing: Expo.easeInOut }));

    timeline.add(this.refs.image1.getTween('rotation', 360, 1, { easing: Power2.easeInOut }));

    timeline.add(this.refs.image1.getTween('left', '+=75', .5, { easing: Expo.easeInOut }));

    timeline.add(this.refs.image1.getTween('top', '-=100', 2.5, { easing: Expo.easeInOut }));

    timeline.add([
      this.refs.image1.getTween('left', '-=150', 1.5, { easing: Expo.easeInOut }),
      this.refs.image1.getTween('opacity', 0, 1.5, { easing: Expo.easeInOut })
    ], '+=0', 'start');
  }

  render() {
    return (
      <View style={styles.container}>
        <TweenableImage ref="image1" source={require('./react.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedPieChart = ({
  percentage = 75,
  radius = 80,
  strokeWidth = 8,
  startColor = '#BAB8B8',
  endColor = '#5CD748',
  fullNumber = 100,
}) => {
  const CIRCUMFERENCE = 2 * Math.PI * radius;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, fullNumber],
    outputRange: [
      CIRCUMFERENCE,
      CIRCUMFERENCE - (CIRCUMFERENCE * percentage) / fullNumber,
    ],
  });

  return (
    <View style={[styles.container, {width: radius * 2, height: radius * 2}]}>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        <G rotation="-90" origin={`${radius}, ${radius}`}>
          <Circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            stroke={startColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <AnimatedCircle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            stroke={endColor}
            strokeWidth={strokeWidth}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </G>
      </Svg>
      <View style={styles.textContainer}>
        <Text style={[styles.label, {fontSize: 24}]}>{`${percentage}`}</Text>
        <Text style={[styles.label, {fontSize: 18}]}>of</Text>
        <Text style={[styles.label, {fontSize: 24}]}>{`${fullNumber}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  textContainer: {
    flexDirection: 'column',
    position: 'absolute',
  },
});

export default AnimatedPieChart;

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

const Message = () => {
  return <SafeAreaView style={styles.mainContainer}></SafeAreaView>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
});

export default Message;

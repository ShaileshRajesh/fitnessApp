import React, {ReactNode} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

export type CardProps = {
  children?: ReactNode;
  cardStyle?: object;
  childrenStyle?: object;
  isWidth?: boolean;
};

const Card = ({children, isWidth}: CardProps) => {
  return (
    <View
      style={[
        styles.cardContainer,
        isWidth ? {minWidth: Dimensions.get('window').width * 0.85} : {},
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#000000',
    borderRadius: 8,
    marginHorizontal: '1%',
    padding: '5%',
    height: '35%',
    flex: 1,
  },
});
export default Card;

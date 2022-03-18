/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {brown300} from '../../common/colors';
import TeamTouchable from '../../common/components/TeamTouchable';
import TextView from '../../common/components/TextView';
import {deviceWidth} from '../../utils/utils';

const Product: React.FC<any> = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../assets/images/bean-medium.jpeg')}
      />
      <View style={styles.bottom}>
        <View style={styles.description}>
          <TextView> Roasted Bean </TextView>
          <TextView
            small
            style={{
              color: brown300,
            }}>
            {' '}
            $18.50 / 1lb
          </TextView>
        </View>

        <TeamTouchable
          style={styles.cardContainer}
          onPress={() => console.log('item added')}>
          <TextView>sags</TextView>
        </TeamTouchable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: deviceWidth * 0.46,
    marginVertical: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bottom: {
    flexDirection: 'row',
  },
  cardContainer: {
    padding: 5,
    alignItems: 'flex-end',
    width: '30%',
  },
  image: {
    width: '100%',
    borderRadius: 10,
    height: 80,
    marginBottom: 5,
  },
  description: {
    width: '70%',
  },
});

export default Product;

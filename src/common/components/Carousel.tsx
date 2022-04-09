/* eslint-disable react-native/no-inline-styles */
import Carousel from 'react-native-snap-carousel';
import { View } from 'react-native';
import TextView from './TextView';
import { TCarousel } from '../types';

const MyCarousel: React.FC<TCarousel> = ({ text, data }: TCarousel) => {
  const renderItem = (text: string) => {
    return (
      <View
        style={{
          backgroundColor: 'floralwhite',
          borderRadius: 5,
          height: 250,
          padding: 50,
          marginLeft: 25,
          marginRight: 25,
        }}>
        <TextView style={{ fontSize: 30 }}>{text}</TextView>
      </View>
    );
  };

  return (
    <Carousel
      ref={c => {
        this._carousel = c;
      }}
      data={this.state.entries}
      renderItem={text}
      itemWidth={itemWidth}
    />
  );
};

export default MyCarousel;

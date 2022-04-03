/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton } from 'react-native-gesture-handler';
import { deviceWidth } from '../utils';
import Loader from './Loader';
import images from '../../../assets/images/index';
import { IImageView } from '../types';

const staticPlaceholder = images.productPlaceholder;

function ImageView({
  containerStyle,
  style,
  resizeMode,
  onErrorComponent,
  uri,
  onPress,
  onLoadEvent,
  placeHolder,
  touchRef,
}: IImageView) {
  const [isError, setError] = useState(false);

  const [isMount, setMount] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [intialHeight, setInitialHeight] = useState(0);

  useEffect(() => {
    setMount(true);
  }, []);

  const getSource = () => {
    if (isLoading) {
      return placeHolder || staticPlaceholder;
    }
    if (uri === null || uri === undefined || uri === '') {
      return placeHolder || staticPlaceholder;
    }

    return {
      uri: uri,
    };
  };

  const { width, height, borderRadius } = style;

  const imageWidth = (width ? width : deviceWidth) as any;

  const imageHeight = (height ? height : intialHeight) as any;

  const renderImage = useCallback(() => {
    return (
      <FastImage
        source={isError ? placeHolder || staticPlaceholder : getSource()}
        resizeMode={resizeMode}
        style={[
          { backgroundColor: 'transparent' },
          style,
          {
            width: imageWidth,
            height: imageHeight,
          },
        ]}
        onError={() => {
          isMount && setError(true);
          isMount && setLoading(false);
        }}
        onLoadEnd={() => {
          isMount && setLoading(false);
        }}
        onLoad={(event: any) => {
          event.persist();
          isMount &&
            setInitialHeight(
              Math.round(
                (event.nativeEvent.height / event.nativeEvent.width) *
                  imageWidth,
              ),
            );
          onLoadEvent && onLoadEvent(event);
        }}
      />
    );
  }, [imageHeight, getSource]);

  return (
    <View style={[styles.container, containerStyle]}>
      <RectButton
        ref={touchRef}
        style={{ borderRadius: borderRadius }}
        onPress={!isLoading ? onPress : undefined}>
        <View>
          {renderImage()}
          <View style={styles.childrenStyle}>
            {isError && onErrorComponent}
            {!isError && isLoading && (
              <Loader backgroundColor="transparent" isLottie={false} />
            )}
          </View>
        </View>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  childrenStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    top: 0,
  },
  loaderStyle: {
    height: 30,
    width: 30,
  },
});

export default memo(ImageView);

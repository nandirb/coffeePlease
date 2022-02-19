/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
import {Text, Animated, SafeAreaView, StyleSheet} from 'react-native';
import {
  DURATION_INFINITY,
  DURATION_LONG,
  DURATION_MEDIUM,
  DURATION_SHORT,
} from '../constants';

import {TAction} from '../../provider/types';
import {View} from 'react-native';

type TSnackbar = {
  type?: string;
  visible: boolean;
  action?: TAction;
  duration: number | typeof DURATION_MEDIUM;
  onDismiss: () => void;
  children: any;
  backgroundColor?: string;
};

function Snackbar({
  type,
  visible,
  action,
  duration,
  onDismiss,
  children,
  backgroundColor,
}: TSnackbar) {
  const {current: opacity} = useRef(new Animated.Value(0.0));
  const [hidden, setHidden] = useState<boolean>(!visible);
  const hideTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (visible) {
      // show
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
      setHidden(false);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          const isInfinity =
            duration === Number.POSITIVE_INFINITY ||
            duration === Number.NEGATIVE_INFINITY;

          if (finished && !isInfinity) {
            hideTimeout.current = setTimeout(onDismiss, duration);
          }
        }
      });
    } else {
      // hide
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          setHidden(true);
        }
      });
    }
  }, [visible, duration, opacity, onDismiss]);

  if (hidden || !type) {
    return null;
  }

  return (
    <View>
      <Text>Ene bol alert</Text>
    </View>
  );
}

Snackbar.DURATION_SHORT = DURATION_SHORT;
Snackbar.DURATION_MEDIUM = DURATION_MEDIUM;
Snackbar.DURATION_LONG = DURATION_LONG;
Snackbar.DURATION_INFINITY = DURATION_INFINITY;

export default Snackbar;

/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { Text, Animated } from 'react-native';
import {
  DURATION_INFINITY,
  DURATION_LONG,
  DURATION_MEDIUM,
  DURATION_SHORT,
} from '../constants';

import { TAction } from '../../provider/types';
import { View } from 'react-native';
import { black, red300, white } from '../colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextView from './TextView';

type TSnackbar = {
  type?: string;
  visible: boolean;
  action?: TAction;
  duration: number | typeof DURATION_MEDIUM;
  onDismiss: () => void;
  children: any;
  backgroundColor?: string;
};

const Snackbar = ({
  type,
  visible,
  duration,
  onDismiss,
  children,
  backgroundColor,
}: TSnackbar) => {
  const { current: opacity } = useRef(new Animated.Value(0.0));
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
      }).start(({ finished }) => {
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
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(({ finished }) => {
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
    <SafeAreaView
      style={{
        height: 80,
        zIndex: 10,
        elevation: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        position: 'absolute',
        top: 0,
        width: '100%',
      }}>
      <TextView color={white}>{children}</TextView>
    </SafeAreaView>
  );
};

Snackbar.DURATION_SHORT = DURATION_SHORT;
Snackbar.DURATION_MEDIUM = DURATION_MEDIUM;
Snackbar.DURATION_LONG = DURATION_LONG;
Snackbar.DURATION_INFINITY = DURATION_INFINITY;

export default Snackbar;

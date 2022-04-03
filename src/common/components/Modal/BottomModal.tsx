/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ios } from '../../utils';
import { white } from '../../colors';
import { TBottomModal } from '../../types';

const BottomModal: React.FC<any> = ({
  onHide,
  isVisible,
  onVisible,
  children,
  style,
  cancelable = true,
  animationType,
  bgColor,
}: TBottomModal) => {
  const onHideComplete = () => {
    if (cancelable) {
      onHide && onHide();
      onVisible && onVisible(false);
    }
  };
  return (
    <Modal
      visible={isVisible}
      animationType={animationType}
      transparent
      onRequestClose={() => {
        onHideComplete();
      }}>
      <View
        style={[
          {
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
          },
          style,
        ]}>
        <TouchableOpacity
          style={[
            styles.dialogContainer,
            { backgroundColor: bgColor ? bgColor : white },
          ]}
          activeOpacity={1}
          onPressOut={() => {
            onHideComplete();
          }}
        />

        <KeyboardAvoidingView
          style={{
            backgroundColor: white,
          }}
          behavior={ios ? 'padding' : undefined}>
          {children}
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: white,
  },
});

export default BottomModal;

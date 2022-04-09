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
import { grey700, transparent, white } from '../../colors';
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
            { backgroundColor: bgColor ? bgColor : transparent },
          ]}
          activeOpacity={1}
          onPressOut={() => {
            onHideComplete();
          }}
        />

        <KeyboardAvoidingView
          style={{
            backgroundColor: white,
            borderRadius: 10,
            padding: 15,
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            marginBottom: 10,
            shadowColor: grey700,
            shadowOffset: { width: -1, height: -1 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            borderColor: transparent,
            borderWidth: 1,
            minHeight: 600,
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
  },
});

export default BottomModal;

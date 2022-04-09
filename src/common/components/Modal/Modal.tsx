import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { grey700, transparent, white } from '../../colors';
import { TMainModal } from '../../types';

const MyModal: React.FC<any> = ({
  onHide,
  isVisible,
  onVisible,
  children,
  style,
  cancelable = true,
  withoutTouch = false,
}: TMainModal) => {
  const onHideComplete = () => {
    if (cancelable) {
      onHide && onHide();
      onVisible(false);
    }
  };
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onRequestClose={() => {
        onHideComplete();
      }}>
      {withoutTouch ? (
        <View style={styles.dialogContainer}>
          <View style={[styles.view, style]}>{children}</View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.dialogContainer}
          activeOpacity={1}
          onPressOut={() => {
            onHideComplete();
          }}>
          <View style={[styles.view, style]}>
            <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  view: {
    width: '90%',
    backgroundColor: white,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 10,
    shadowColor: grey700,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderColor: transparent,
    borderWidth: 1,
  },
});

export default MyModal;

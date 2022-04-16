/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Modal, StyleSheet, View, Pressable } from 'react-native';
import { black, grey500 } from '../colors';
import { TMainModal } from '../types';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyModal: React.FC<any> = ({
  isVisible,
  onVisible,
  children,
  style,
  isBottom = false,
  shadowRadius,
  width,
  cancelable = true,
}: TMainModal) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType={isBottom ? 'slide' : 'fade'}
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          onVisible(!isVisible);
        }}>
        <View style={isBottom ? styles.bottomView : styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                width: isBottom ? '100%' : width ? width : '90%',
                shadowRadius: shadowRadius,
                minHeight: isBottom ? 150 : 50,
              },
              style,
            ]}>
            <Pressable style={styles.xbutton} onPress={() => onVisible(false)}>
              <Ionicons name="close-outline" size={15} color={grey500} />
            </Pressable>
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 5,
  },
  xbutton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
  },
});

export default MyModal;

/* eslint-disable react-native/no-inline-styles */
import Color from 'color';
import React, { SetStateAction } from 'react';
import {
  Pressable,
  TouchableWithoutFeedback,
  Modal as RNModal,
  ModalProps as RNModalProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps as RNViewProps,
  ViewStyle,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Colors, ScreenUtils, TextView } from 'react-native-erxes-ui';

export type ModalProps = RNModalProps &
  RNViewProps & {
    onHide?: () => void;
    isVisible: boolean;
    onVisible: SetStateAction<any>;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle> | {};
    containerStyle?: StyleProp<ViewStyle> | {};
    cancelable?: boolean;
    bottom?: boolean;
    withHeader?: boolean;
    headerText?: string;
    withoutTouch?: boolean;
    animationType?: 'fade' | 'none' | 'slide' | undefined;
    presentationStyle?:
      | 'fullScreen'
      | 'pageSheet'
      | 'formSheet'
      | 'overFullScreen';
    bgColor?: string;
    modalHeader?: JSX.Element;
  };

const Modal: React.FC<ModalProps> = ({
  onHide,
  isVisible,
  onVisible,
  children,
  style,
  containerStyle,
  cancelable = true,
  animationType,
  bottom = false,
  modalHeader,
  withHeader,
  headerText,
  withoutTouch,
  presentationStyle = 'fullScreen',
  ...rest
}) => {
  const onHideComplete = () => {
    if (cancelable) {
      onHide && onHide();
      onVisible && onVisible(false);
    }
  };

  return (
    <RNModal
      visible={isVisible}
      animationType={
        animationType
          ? animationType
          : presentationStyle === 'formSheet' && ScreenUtils.isIOS
          ? 'slide'
          : 'fade'
      }
      transparent={presentationStyle === 'pageSheet' ? false : true}
      onRequestClose={() => {
        onHideComplete();
      }}>
      {withoutTouch ? (
        <View
          style={[
            {
              backgroundColor:
                presentationStyle === 'formSheet' && ScreenUtils.isIOS
                  ? 'transparent'
                  : Color('#000').alpha(0.5).rgb().string(),
              flex: 1,
              width: '100%',
            },
            containerStyle,
          ]}>
          <View
            style={[
              {
                flex: 1,
                width: '100%',
              },
            ]}>
            {children}
          </View>
        </View>
      ) : (
        <View
          style={[
            {
              flex: 1,
              width: '100%',
              justifyContent: 'flex-end',
              backgroundColor:
                presentationStyle === 'formSheet' && ScreenUtils.isIOS
                  ? 'transparent'
                  : Color('#000').alpha(0.5).rgb().string(),
            },
            containerStyle,
          ]}>
          <TouchableOpacity
            style={styles.dialogContainer}
            activeOpacity={1}
            onPressOut={() => {
              onHideComplete();
            }}>
            {bottom ? (
              <View style={[{ flex: 1, justifyContent: 'flex-end' }]}>
                <TouchableWithoutFeedback>
                  <KeyboardAvoidingView
                    style={[
                      styles.modalView,
                      {
                        height:
                          presentationStyle === 'formSheet' && ScreenUtils.isIOS
                            ? ScreenUtils.screenHeight * 0.9
                            : undefined,
                        paddingBottom: ScreenUtils.isIphoneWithNotch()
                          ? 30
                          : 10,
                        backgroundColor: rest?.bgColor
                          ? rest?.bgColor
                          : Colors.white,
                      },
                      style,
                    ]}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    {children}
                  </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
              </View>
            ) : (
              <View style={[styles.centeredView, style]}>
                <TouchableWithoutFeedback>
                  <View
                    style={[
                      styles.modalView,
                      {
                        width: '90%',
                        minHeight: 50,
                      },
                      style,
                    ]}>
                    {withHeader && (
                      <View
                        style={{
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                          backgroundColor: Colors.grey100,
                        }}>
                        <TextView style={styles.popoverHeader}>
                          {headerText}
                        </TextView>
                      </View>
                    )}
                    {cancelable && (
                      <Pressable
                        style={styles.xbutton}
                        onPress={() => onVisible(false)}
                      />
                    )}
                    {modalHeader}
                    {children}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </RNModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
  xbutton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 20,
  },
  popoverHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: Colors.grey500,
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.grey500,
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: '500',
    height: 50,
    backgroundColor: 'red',
  },
  dialogContainer: {
    flex: 1,
    width: '100%',
  },
});

export default Modal;

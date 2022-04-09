import { Dimensions, Platform } from 'react-native';

const ios = Platform.OS === 'ios';

const setNavigationHome = ({ navigation, headerLeft, headerRight }: any) => {
  navigation.setOptions({
    headerLeft: () => headerLeft,
    headerRight: () => headerRight,
    headerTitle: () => null,
  });
};

const isIphoneWithNotch = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
};

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const getNameUser = (item: any) => {
  return (
    item?.userDetail?.details?.fullName ||
    item?.details?.fullName ||
    item?.username ||
    item?.email ||
    'Unknown'
  );
};

const isEmpty = (str: string) => {
  return (
    str === undefined ||
    str === 'undefined' ||
    str === null ||
    str === 'null' ||
    str.trim() === ''
  );
};
const truncate = (str: string) => {
  if (str.length > 15) {
    return str.substring(0, 14) + '...';
  }
  return str;
};

const getModifableArray = (array: any) => {
  return JSON.parse(JSON.stringify(array));
};

const numberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export {
  isEmpty,
  setNavigationHome,
  ios,
  deviceHeight,
  deviceWidth,
  isIphoneWithNotch,
  getNameUser,
  getModifableArray,
  numberWithCommas,
  truncate,
};

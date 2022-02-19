//Main colors
import color from 'color';

const colorBlack = '#000000';
const colorWhite = '#FFFFFF';
const colorLightGray = '#AAA';

// Core colors
const colorPrimary = '#5629B6';
const colorSecondary = '#fda50f';
const colorPrimaryDark = '#673FBD';
const colorPrimaryLight = '#EA475D';

const colorCoreRed = '#EA475D';
const colorCoreYellow = '#y';
const colorCoreOrange = '#FF6600';
const colorCoreGreen = '#3CCC38';
const colorCoreBlue = '#3B85F4';

const colorCoreTeal = '#63D2D6';
const colorCoreDarkBlue = '#0a1e41';
const colorCoreBlack = '#393C40';
const colorCoreGray = '#888';
const colorCoreLightGray = '#AAAEB3';
const colorCoreMediumGray = '#6a818c';
const colorCoreDarkGray = '#373737';

const colorPrimary1 = rgba(colorPrimary, 0.8);

const colorPrimaryDark1 = darken(colorPrimaryDark, 12);
const colorPrimaryDark2 = darken(colorPrimaryDark, 28);
const colorPrimaryDark3 = darken(colorPrimaryDark, 40);

const colorPrimaryLight1 = rgba(colorPrimaryLight, 0.12);
const colorPrimaryLight2 = rgba(colorPrimaryLight, 0.28);
const colorPrimaryLight3 = rgba(colorPrimaryLight, 0.4);

const colorSecondaryDark1 = darken(colorSecondary, 12);
const colorSecondaryDark2 = darken(colorSecondary, 28);
const colorSecondaryDark3 = darken(colorSecondary, 40);

const colorSecondaryLight1 = lighten(colorSecondary, 12);
const colorSecondaryLight2 = lighten(colorSecondary, 28);
const colorSecondaryLight3 = lighten(colorSecondary, 40);

const colorOnSurfaceHigh = '#000000';
const colorOnSurfaceMedium = 'rgba(0, 0, 0, 0.62)';
const colorOnSurfaceLow = 'rgba(0, 0, 0, 0.34)';
const colorOnSurfaceLowest = 'rgba(0, 0, 0, 0.14)';

const colorOnPrimaryHigh = '#FFFFFF';
const colorOnPrimaryMedium = 'rgba(255, 255, 255, 0.7)';
const colorOnPrimaryLow = 'rgba(255, 255, 255, 0.4)';

const colorError = '#FF4949';
const colorWarn = '#FFC82C';
const colorSuccess = '#13CE66';

const colorSurfaceGray = '#F5F5F5';
const colorSurfaceGrayDarker = '#EBEDF0';
const colorSurfaceSoft = rgba(colorPrimary, 0.12);
const colorSurfaceSoftGreen = rgba(colorCoreGreen, 0.12);

const colorStrokeBlackPrimary = rgba(colorPrimary, 0.12);
const colorStrokeBlackSecondary = rgba(colorPrimary, 0.08);

const colorStrokeBrandPrimary = rgba(colorPrimary, 0.35);
const colorStrokeBrandSecondary = rgba(colorPrimary, 0.5);

const bgMain = 'rgba(0,0,0,0.04)';
const bgTransparent = 'transparent';
const bgPrimary = rgba(colorPrimary, 0.6);
const bgPrimaryDark = rgba(colorPrimary, 0.9);
const bgDialog = 'rgba(0, 0, 0, 0.5)';
const bgDialogDark = 'rgba(0, 0, 0, 0.7)';
const bgGray = '#e6e6e6';
const bgLight = '#FAFAFA';
const bgUnread = '#ededfb';
const bgInternal = '#fff0b2';
const bgInvisible = '#0000';
const bgActive = '#F0F0F0';
const bgLightPurple = '#F7F8FC';
const bgDark = rgba(colorBlack, 0.95);
const bgStage = '#e5e8ec';

const linkPrimary = '#1785FC';
const linkPrimaryHover = rgba(linkPrimary, 0.7);

const textPrimary = '#252437';
const textSecondary = '#616E7C';

const borderPrimary = rgba(colorBlack, 0.16);
const borderDarker = '#DEE4E7';

const buttonColorArray = [colorPrimary, colorSecondary];

function rgb(hex: any) {
  return color(hex).alpha(1).toString();
}

// Return an rgba string value for CSS
function rgba(hex: any, opacity: number) {
  return color(hex).alpha(opacity).toString();
}

// Sass's darken function
function darken(hex: any, amount: number) {
  return color(hex)
    .darken(amount / 100)
    .toString();
}

// Sass's lighten function
function lighten(hex: any, amount: number) {
  return color(hex)
    .lighten(amount / 100)
    .toString();
}

export {rgb, rgba, darken, lighten};

export default {
  colorPrimary,
  colorPrimary1,
  colorPrimaryDark,
  colorPrimaryDark1,
  colorPrimaryDark2,
  colorPrimaryDark3,
  colorPrimaryLight1,
  colorPrimaryLight2,
  colorPrimaryLight3,
  colorSecondary,
  colorSecondaryDark1,
  colorSecondaryDark2,
  colorSecondaryDark3,
  colorSecondaryLight1,
  colorSecondaryLight2,
  colorSecondaryLight3,
  colorOnSurfaceHigh,
  colorOnSurfaceMedium,
  colorOnSurfaceLow,
  colorOnPrimaryHigh,
  colorOnPrimaryMedium,
  colorOnPrimaryLow,
  colorError,
  colorWarn,
  colorSuccess,
  colorSurfaceGray,
  colorSurfaceSoft,
  colorSurfaceSoftGreen,
  colorStrokeBlackPrimary,
  colorStrokeBlackSecondary,
  colorStrokeBrandPrimary,
  colorStrokeBrandSecondary,
  colorCoreRed,
  colorCoreTeal,
  colorCoreYellow,
  colorCoreOrange,
  colorCoreBlue,
  colorCoreGreen,
  colorCoreBlack,
  colorCoreGray,
  colorCoreLightGray,
  colorCoreDarkGray,
  colorWhite,
  colorBlack,
  colorLightGray,
  colorCoreDarkBlue,
  colorCoreMediumGray,
  colorSurfaceGrayDarker,
  colorOnSurfaceLowest,
  colorPrimaryLight,

  bgMain,
  bgTransparent,
  bgPrimary,
  bgPrimaryDark,
  bgDialog,
  bgDialogDark,
  bgGray,
  bgLight,
  bgDark,
  bgStage,
  bgActive,
  bgUnread,
  bgInternal,
  bgInvisible,
  bgLightPurple,

  textPrimary,
  textSecondary,

  linkPrimary,
  linkPrimaryHover,

  borderPrimary,
  borderDarker,

  buttonColorArray,
};

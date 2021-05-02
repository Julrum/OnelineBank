const colors = {
  white: '#ffffff',
  black: '#191919',
  grey_0: '#f8f8fa', // BG color
  grey_1: '#f1f1f5', // BG color
  grey_3: '#999999', // font color
  grey_4: '#767676', // font color
  grey_5: '#ededed', // line color
  grey_6: '#dbdbdb', // line color
  grey: '#e5e7e9',
  danger: '#ff3120',
  primary: '#1277cb',
  secondary: '#54BEEC',
  warningLighten: '#fff3c7',
  warning: '#fed12f',
};

export const theme = {
  background: colors.grey_0,
  text: colors.black,
  errorText: colors.danger,

  imageBackground: colors.grey_1,
  imageButtonBackground: colors.grey_3,
  imageButtonIcon: colors.white,

  label: colors.grey_4,
  inputPlaceholder: colors.grey_3,
  inputBorder: colors.grey_6,
  inputDisabledBackground: colors.grey_1,
  buttonBackground: colors.primary,
  buttonTitle: colors.white,
  buttonUnfilledTitle: colors.primary,
  buttonLogout: colors.danger,

  headerTintColor: colors.black,
  tabActiveColor: colors.primary,
  tabInactiveColor: colors.grey_3,

  spinnerBackground: colors.black,
  spinnerIndicator: colors.white,

  sendButtonActivate: colors.white,
  sendButtonInactivate: colors.grey3,
  sendButtonBG: colors.secondary,
  sendButtonBGInactivate: colors.grey,

  inputBorderColor: colors.grey_6,

  listBorder: colors.grey_5,
  listTime: colors.grey_3,
  listAccount: colors.grey_3,
  listIcon: colors.black,

  botBubbleBorder: colors.warning,
  botBubbleBG: colors.warningLighten,
  bubbleBG: colors.secondary,
  bubbleColor: colors.white,
};

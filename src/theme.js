const colors = {
  white: '#ffffff',
  black: '#191919',
  grey_0: '#f8f8fa', // BG color
  grey_1: '#f1f1f5', // BG color
  grey_3: '#999999', // font color
  grey_4: '#767676', // font color
  grey_5: '#ededed', // line color
  grey_6: '#dbdbdb', // line color
  red: '#ff3120',
  blue: '#1277cb',
};

export const theme = {
  background: colors.grey_0,
  text: colors.black,
  errorText: colors.red,

  imageBackground: colors.grey_1,
  imageButtonBackground: colors.grey_3,
  imageButtonIcon: colors.white,

  label: colors.grey_4,
  inputPlaceholder: colors.grey_3,
  inputBorder: colors.grey_6,
  buttonBackground: colors.blue,
  buttonTitle: colors.white,
  buttonUnfilledTitle: colors.blue,
  buttonLogout: colors.red,

  headerTintColor: colors.black,
  tabActiveColor: colors.blue,
  tabInactiveColor: colors.grey_3,

  spinnerBackground: colors.black,
  spinnerIndicator: colors.white,
};

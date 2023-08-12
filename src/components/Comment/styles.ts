import {StyleSheet} from 'react-native';
import colors from '../../theme/color';
import fonts from '../../theme/fonts';

export default StyleSheet.create({
  middleColumn: {
    flex: 1,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentText: {
    color: colors.black,
    lineHeight: 18,
  },
  bold: {
    fontWeight: fonts.weight.bold,
  },
  icon: {
    marginHorizontal: 5,
  },
  userAvatar: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 5,
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5,
  },
  footerText: {
    marginRight: 10,
    color: colors.grey,
  },
});

import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "../utils/scaling";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(15),
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  footer: {
    padding: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
    borderWidth: 1,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(150),
    flex: 1,
  },
  inputStyle: {
    flex: 1,
    paddingHorizontal: scale(10),
    fontFamily: 'PlusJakartaSans-Regular',
    height: verticalScale(30),
  },
  imageContainer: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(35),
    justifyContent: "center",
    alignItems: "center",
  },
  sendContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(135),
    justifyContent: "center",
    alignItems: "center",
  },
  sendImage: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  micOn: {
    width: moderateScale(40),
    height: moderateScale(40),
  },
  messageWrapper: {
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(5),
  },
  alignEnd: {
    justifyContent: "flex-end",
    flexDirection: "row",
    gap: scale(5),
  },
  alignStart: {
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: scale(5),
  },
  senderMessageContainer: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    maxWidth: "80%",
    borderRadius: moderateScale(10),
    borderTopEndRadius: 0,
    elevation: 1,
    backgroundColor: "#0d045c",
  },
  receiverMessageContainer: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    maxWidth: "85%",
    borderRadius: moderateScale(10),
    borderTopStartRadius: 0,
    elevation: 1,
    backgroundColor: "#f1f0f0",
  },
  messageText: {
    fontSize: moderateScale(12),
    fontWeight: "500",
    // fontFamily: 'PlusJakartaSans-Regular',
  },
  avatar: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(20),
  },
  avatarContainer: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  avatarContainerText: {
    fontSize: moderateScale(12),
    fontWeight: "600",
  },
  currentDateAbsoluteContainer: {
    position: "absolute",
    zIndex: 9,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  currentDateContainer: {
    backgroundColor: "red",
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(10),
    top: verticalScale(4),
  },
  currentDateText: {
    fontSize: moderateScale(12),
    fontWeight: "600",
  },
});
export default styles;

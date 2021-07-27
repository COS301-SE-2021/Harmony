import Toast from "react-native-root-toast";
export const AppToast = {
  ToastDisplay: (message) => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      textColor: "#FFF",
      backgroundColor: "#696969",
      opacity: 1,
      position: -65, //Above the bottom tab bar
    });
    return;
  },
};

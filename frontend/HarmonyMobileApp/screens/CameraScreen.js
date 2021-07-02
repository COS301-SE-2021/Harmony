import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  Platform,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { Icon } from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import { useIsFocused } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CameraScreen() {
  const cameraRef = useRef();
  const [isPreview, setIsPreview] = useState(false);
  const [isGalleryImage, setisGalleryImage] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const [image, setImage] = useState(null);
  const isFocused = useIsFocused();
  const [flashMode, setFlashMode] = React.useState("off");
  const [flashIcon, setFlashIcon] = useState("flash-off-outline");

  // Screen Ratio and image padding
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState("4:3"); // default is 4:3
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    onHandlePermission();
  }, []);

  const onHandlePermission = async () => {
    const { cameraStatus } = await Camera.requestPermissionsAsync();
    if (cameraStatus) {
      setHasCameraPermission(cameraStatus.status === "granted");
    }

    const { galleryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus) {
      setHasGalleryPermission(galleryStatus.status === "granted");
    }
  };

  const onCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }

    setIsCameraReady(true);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //We could also do videos in the future
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      setIsPreview(true);
      setisGalleryImage(true);
    }
  };

  const onCapture = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;

      if (source) {
        // await cameraRef.current.pausePreview();
        setImage(data.uri);
        setIsPreview(true);
        setisGalleryImage(false);

        // let base64Img = `data:image/jpg;base64,${source}`;
        // let apiUrl =
        //   "https://api.aws.s3.com";//WAITING ON API URL FROM BACKEND

        // let data = {
        //   file: base64Img,
        //   upload_preset: "<your-upload-preset>",
        // };

        // fetch(apiUrl, {
        //   body: JSON.stringify(data),
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   method: "POST",
        // })
        //   .then(async (response) => {
        //     let data = await response.json();
        //     if (data.secure_url) {
        //       alert("Upload successful");
        //     }
        //   })
        //   .catch((err) => {
        //     alert("Cannot upload");
        //   });
      }
    }
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  const handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
      setFlashIcon("flash-off-outline");
    } else if (flashMode === "off") {
      setFlashMode("on");
      setFlashIcon("flash-outline");
    } else {
      setFlashMode("auto");
    }
  };

  // set the camera ratio and padding.
  // this code assumes a portrait mode screen
  const prepareRatio = async () => {
    let desiredRatio = "4:3"; // Start with the system default
    // This issue only affects Android
    if (Platform.OS === "android") {
      const ratios = await cameraRef.current.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      // set the preview padding and preview ratio
      setImagePadding(remainder / 2);
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isFocused && (
        <Camera
          ref={cameraRef}
          flashMode={flashMode}
          // style={styles.container}
          style={[
            styles.cameraPreview,
            // { marginTop: 22, marginBottom: 22 },
            // { marginTop: imagePadding, marginBottom: imagePadding },
            // { width: width, height: height },
          ]}
          type={Camera.Constants.Type.back}
          onCameraReady={onCameraReady}
          useCamera2Api={true}
          autoFocus={Camera.Constants.AutoFocus.on}
          zoom={0}
          // ratio={"16:9"}
          ratio={ratio}
        />
      )}
      <View style={styles.container}>
        {isPreview && (
          // <View style={styles.container}>
          <View
            style={[
              styles.cameraPreview,
              // { marginTop: imagePadding, marginBottom: imagePadding },
              styles.cameraPreview,
              {
                backgroundColor: "black", //Simulates blinking effect, also reduces noticeability of camera distortion
                // borderWidth: 5,//To show a slight screen flash, indicating an image being taken
                // borderColor: "#fff",
                // borderRadius: 6,
              }, // { marginTop: 22, marginBottom: 22 },
              // { width: width, height: height },
            ]}
          >
            {/* {isGalleryImage && ( */}
            <Image source={{ uri: image }} style={styles.container}></Image>
            {/* )} */}
            <View style={styles.previewButtonsContainer}>
              <TouchableOpacity onPress={cancelPreview}>
                <Icon
                  style={styles.icon}
                  fill="#fff"
                  name="close-circle-outline"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={cancelPreview}>
                <Icon
                  style={styles.icon}
                  fill="#fff"
                  name="checkmark-circle-2-outline"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {!isPreview && (
          <View style={styles.container}>
            <View style={styles.container}>
              <ImageBackground
                style={{
                  width: windowWidth,
                  height: windowHeight,
                }}
                source={require("../assets/Grid-Transparent-3.png")}
              >
                <TouchableOpacity style={styles.toolbarContainer}>
                  <Icon
                    style={styles.toolbarIcon}
                    fill="#fff"
                    name="flash-outline"
                    // name= {flashMode === 'off' ? '#000' : '#fff}
                    name={flashIcon}
                    onPress={handleFlashMode}
                    disabled={!isCameraReady}
                  />
                  <Icon
                    style={styles.toolbarIcon}
                    fill="#fff"
                    name="grid-outline"
                    onPress={handleFlashMode} //Change to handleGridMode
                    disabled={!isCameraReady}
                  />
                  <Icon
                    style={styles.toolbarIcon}
                    fill="#fff"
                    name="search-outline"
                    onPress={handleFlashMode} //Change to handleBarcode
                    disabled={!isCameraReady}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>

            <View style={styles.bottomButtonsContainer}>
              <TouchableOpacity
                style={styles.gallery}
                disabled={!isCameraReady}
                onPress={pickImage}
              >
                <Icon style={styles.icon} fill="#fff" name="image-outline" />
              </TouchableOpacity>

              <TouchableOpacity
                disabled={!isCameraReady}
                onPress={onCapture}
                style={styles.capture}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    color: "#fff",
  },
  bottomButtonsContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 15,
    width: "100%",
  },

  previewButtonsContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 15,
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    left: "100%",
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  gallery: {
    left: 20,
    width: 70,
    height: 70,
  },
  icon: {
    width: 80,
    height: 80,
  },
  toolbarContainer: {
    flex: 1,
    flexWrap: "nowrap",
    flexDirection: "column",
    justifyContent: "center",
  },
  toolbarIcon: {
    paddingTop: 80,
    width: 40,
    height: 40,
  },
  cameraPreview: {
    flex: 1,
  },
  grid: {},
});

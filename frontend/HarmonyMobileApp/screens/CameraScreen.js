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
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

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
  // const [flashIcon, setFlashIcon] = useState("flash-off-outline");
  const [flashIcon, setFlashIcon] = useState("flash-off");

  const [isGridMode, setGridMode] = React.useState(false);
  const [gridIcon, setGridIcon] = useState("grid-off");

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
    if (flashMode === "auto") {
      setFlashMode("off");
      // setFlashIcon("flash-off-outline");
      setFlashIcon("flash-off");
    } else if (flashMode === "off") {
      setFlashMode("on");
      // setFlashIcon("flash-outline");
      setFlashIcon("flash-on");
    } else if (flashMode === "on") {
      setFlashMode("auto");
      setFlashIcon("flash-auto");
    }
  };

  const handleGridMode = () => {
    if (isGridMode === true) {
      setGridMode(false);
      setGridIcon("grid-off");
    } else if (isGridMode === false) {
      setGridMode(true);
      setGridIcon("grid-on");
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
              {isGridMode && (
                <ImageBackground
                  style={{
                    width: windowWidth,
                    height: windowHeight,
                  }}
                  // name= {flashMode === 'off' ? '#000' : '#fff}

                  source={require("../assets/Grid-Transparent-3.png")}
                >
                  <TouchableOpacity style={styles.toolbarContainer}>
                    <MaterialIcons
                      name={flashIcon}
                      size={40}
                      style={styles.toolbarIcon}
                      onPress={handleFlashMode}
                      disabled={!isCameraReady}
                    />

                    <MaterialIcons
                      name={gridIcon}
                      size={40}
                      style={styles.toolbarIcon}
                      onPress={handleGridMode}
                      disabled={!isCameraReady}
                    />

                    <MaterialCommunityIcons
                      name="barcode-scan"
                      size={40}
                      // onPress={handleGridMode} //Change to handleBarcode
                      disabled={!isCameraReady}
                      style={styles.toolbarIcon}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              )}
              {!isGridMode && (
                <TouchableOpacity style={styles.toolbarContainer}>
                  <MaterialIcons
                    name={flashIcon}
                    size={40}
                    style={styles.toolbarIcon}
                    onPress={handleFlashMode}
                    disabled={!isCameraReady}
                  />

                  <MaterialIcons
                    name={gridIcon}
                    size={40}
                    style={styles.toolbarIcon}
                    onPress={handleGridMode}
                    disabled={!isCameraReady}
                  />

                  <MaterialCommunityIcons
                    name="barcode-scan"
                    size={40}
                    // onPress={handleGridMode} //Change to handleBarcode
                    disabled={!isCameraReady}
                    style={styles.toolbarIcon}
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.bottomButtonsContainer}>
              <TouchableOpacity
                style={styles.gallery}
                disabled={!isCameraReady}
                onPress={pickImage}
              >
                {/* <Icon style={styles.icon} fill="#fff" name="image-outline" /> */}
                <MaterialCommunityIcons
                  name="image-multiple-outline"
                  size={60}
                  color="#fff"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.capture}
                disabled={!isCameraReady}
                onPress={onCapture}
                // style={styles.capture}
              >
                <MaterialCommunityIcons
                  name="circle-outline"
                  size={80}
                  color="#fff"
                />
              </TouchableOpacity>
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
  },
  gallery: {
    left: 5,
    width: 60,
    height: 60,
    top: "2.5%",
  },
  icon: {
    width: 80,
    height: 80,
  },
  toolbarContainer: {
    position: "absolute",
    top: 180,
    left: 5,
  },
  toolbarIcon: {
    paddingTop: 40,
    color: "#fff",
  },
  cameraPreview: {
    flex: 1,
  },
  hidden: {
    width: 0,
    height: 0,
  },
});

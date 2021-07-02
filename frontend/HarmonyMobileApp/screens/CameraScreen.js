import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { Icon } from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import { useIsFocused } from "@react-navigation/native";

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

  const onCameraReady = () => {
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
          style={styles.container}
          type={Camera.Constants.Type.back}
          onCameraReady={onCameraReady}
          useCamera2Api={true}
          autoFocus={Camera.Constants.AutoFocus.on}
          zoom={0}
          ratio={"16:9"}
        />
      )}
      <View style={styles.container}>
        {isPreview && (
          <View style={styles.container}>
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
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  position: "absolute",
                  left: "5%",
                  top: "10%",
                }}
              >
                <Icon
                  style={styles.icon}
                  fill="#fff"
                  name="flash-outline"
                  // name= {flashMode === 'off' ? '#000' : '#fff}
                  name={flashIcon}
                  onPress={handleFlashMode}
                  disabled={!isCameraReady}
                />
              </TouchableOpacity>
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
});

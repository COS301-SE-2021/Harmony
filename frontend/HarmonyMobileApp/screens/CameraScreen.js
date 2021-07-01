import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { Icon } from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import { useIsFocused } from "@react-navigation/native";

export default function CameraScreen() {
  const cameraRef = useRef();
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const [image, setImage] = useState(null);
  const isFocused = useIsFocused();

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
    }
  };

  const onCapture = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;

      if (source) {
        // await cameraRef.current.pausePreview();
        setImage(data.uri);
        setIsPreview(true);
      }
    }
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
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
          style={styles.container}
          type={Camera.Constants.Type.back}
          onCameraReady={onCameraReady}
          useCamera2Api={true}
        />
      )}
      <View style={styles.container}>
        {isPreview && (
          <View style={styles.container}>
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%" }}
            ></Image>
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

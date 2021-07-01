import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { Icon } from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";

export default function CameraScreen() {
  const cameraRef = useRef();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

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
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;

      if (source) {
        await cameraRef.current.pausePreview();
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

      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        onCameraReady={onCameraReady}
        useCamera2Api={true}
      />
      <View style={styles.container}>
        {isPreview && (
          <TouchableOpacity
            onPress={cancelPreview}
            style={styles.closeButton}
            activeOpacity={0.7}
          >
            <Icon style={styles.icon} fill="#fff" name="close-outline" />
          </TouchableOpacity>
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
              activeOpacity={0.7}
              disabled={!isCameraReady}
              onPress={onSnap}
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
  closeButton: {
    position: "absolute",
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7,
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
    width: 45,
    height: 45,
  },
});

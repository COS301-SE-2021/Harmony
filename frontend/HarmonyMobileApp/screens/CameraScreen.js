import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Text, Button } from "@ui-kitten/components";
import HomeScreen from "./HomeScreen.js";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default function CameraScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      const { cameraStatus } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const { galleryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri); //Saved as a temp picture in our phone and this is the URI
      setImage(data.uri);
      HomeScreen();
    }
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

  function CameraCaptureScreen() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.cameraContainer}>
          {isFocused && (
            <Camera
              //   ref={(ref) => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
              // ratio={"1:1"}
            />
          )}
        </View>

        <Button title="Take Picture" onPress={() => takePicture()}>
          Take picture
        </Button>
        <Button title="Pick image from gallery" onPress={() => pickImage()}>
          Pick from gallery
        </Button>

        {/* {image && <Image source={{ uri: image }} style={{ flex: 1 }} />} */}
      </SafeAreaView>
    );
  }

  function CameraPreviewScreen() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Camera Preview Screen</Text>
      </View>
    );
  }

  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera or gallery</Text>;
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Capture Screen" component={CameraCaptureScreen} />
      <Stack.Screen name="Preview Screen" component={CameraPreviewScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
  },
});

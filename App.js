import { StyleSheet, Text, View, Button, Image } from "react-native";
import React, { useState, useEffect } from "react";
import * as MediaPicker from "expo-image-picker";

export default function App() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    _accessStatusGalleryPermission();
  }, []);

  async function _accessStatusGalleryPermission() {
    const galleryStatus =
      await MediaPicker.requestMediaLibraryPermissionsAsync();

    setHasGalleryPermission(galleryStatus.status === "granted");
  }

  async function _pickImage() {
    let resultImagePicker = await MediaPicker.launchImageLibraryAsync({
      mediaTypes: MediaPicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(resultImagePicker);

    if (!resultImagePicker.cancelled) {
      setImage(resultImagePicker.uri);
    }

    if (hasGalleryPermission === false) {
      return <Text>No access to open image</Text>;
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title="Pick Image From Gallery"
        onPress={() => {
          _pickImage();
        }}
      />

      {image && <Image source={{ uri: image }} style={{ flex: 1 / 2 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

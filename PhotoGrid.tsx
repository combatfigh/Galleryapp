import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  Pressable,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const spacing = 8;
const imageSize = (screenWidth - spacing * 3) / 2;



type Props = {
  data: any[];
  isFavorite?: (id: string) => boolean;
  toggleFavorite?: (id: string) => void;
};

export default function PhotoGrid({ data, isFavorite, toggleFavorite }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ uri: string; title: string } | null>(null);

  const handlePress = (item: any) => {
    setSelectedImage({ uri: item.url, title: item.title });
    setModalVisible(true);
  };

  return (
    <>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Pressable onPress={() => handlePress(item)}>
              <Image source={{ uri: item.url }} style={styles.image} />
            </Pressable>

            {isFavorite && toggleFavorite && (
              <TouchableOpacity
                style={styles.heartIcon}
                onPress={() => toggleFavorite(item.id)}
              >
                <Ionicons
                  name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                  size={22}
                  color={isFavorite(item.id) ? 'red' : 'gray'}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedImage && (
              <>
                <Image source={{ uri: selectedImage.uri }} style={styles.fullImage} />
                <Text style={styles.caption}>{selectedImage.title}</Text>
              </>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={{ color: 'white' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: spacing, paddingTop: spacing },
  row: { justifyContent: 'space-between', marginBottom: spacing },
imageWrapper: {
  width: imageSize,
  height: imageSize,
  // optionally:
  borderRadius: 12,
  overflow: 'hidden',
  backgroundColor: '#e9e9e9',
},

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 4,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  caption: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 8,
  },
});

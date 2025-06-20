import React, { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Text,
  RefreshControl,
} from 'react-native';
import { getRecentImages } from '../lib/flickrApi';
import PhotoGrid from '../ui/PhotoGrid';
import NetInfo from '@react-native-community/netinfo';
import { MaterialIcons } from '@expo/vector-icons';

export const screenOptions = {
  title: 'Home',
  drawerLabel: 'Home',
  drawerIcon: ({ color, size }: { color: string; size: number }) => (
    <MaterialIcons name="home" size={size} color={color} />
  ),
};

export default function HomeScreen() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsub = NetInfo.addEventListener(state =>
      setIsConnected(state.isConnected ?? true)
    );
    loadImages(1);
    return () => unsub();
  }, []);

  const loadImages = async (pg: number) => {
    if (pg > 3) return;
    const newImages = await getRecentImages(pg);
    setImages(prev => (pg === 1 ? newImages : [...prev, ...newImages]));
    setPage(pg);
    setLoading(false);
    setLoadingMore(false);
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      loadImages(page + 1);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadImages(1);
  };

  if (loading && images.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {!isConnected && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            You're offline — showing cached images
          </Text>
        </View>
      )}

      <FlatList
        data={images}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <PhotoGrid data={[item]} />
          </View>
        )}
        onEndReached={handleLoadMore}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imageContainer: { flex: 1 },
  banner: {
    backgroundColor: '#ff4444',
    paddingVertical: 6,
  },
  bannerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
  },
});

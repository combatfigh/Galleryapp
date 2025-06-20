import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator, Text } from 'react-native';
import PhotoGrid from '../ui/PhotoGrid';
import { searchImages } from '../lib/flickrApi';
import { Snackbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export const screenOptions = {
  title: 'Search',
  drawerLabel: 'Search',
  drawerIcon: ({ color, size }: { color: string; size: number }) => (
    <MaterialIcons name="search" size={size} color={color} />
  ),
};



export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const images = await searchImages(query);
      setResults(images);
    } catch (err) {
      setErrorVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search (e.g. cat, dog)"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />

      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
      {!loading && results.length > 0 && <PhotoGrid data={results} />}
      {!loading && results.length === 0 && query !== '' && (
        <Text style={styles.noResults}>No results found</Text>
      )}

      <Snackbar
        visible={errorVisible}
        onDismiss={() => setErrorVisible(false)}
        action={{ label: 'Retry', onPress: handleSearch }}>
        Network error. Please try again.
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  noResults: { textAlign: 'center', marginTop: 20 },
});

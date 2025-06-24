import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [isFullScreen, setIsFullScreen] = useState(true);
  const [uploadVisibility, setUploadVisibility] = useState<'public' | 'private'>('public');
  const [quality, setQuality] = useState<'standard' | 'high'>('standard');

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f0f0f0' }]}>
     

      {/* Dark Mode */}
      <View style={styles.row}>
        <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Dark Mode</Text>
        <Switch value={isDark} onValueChange={toggleTheme} thumbColor={isDark ? '#fff' : '#000'} />
      </View>

      {/* Full-Screen Preview */}
      <View style={styles.row}>
        <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Full-Screen Preview</Text>
        <Switch value={isFullScreen} onValueChange={setIsFullScreen} />
      </View>

      {/* Upload Visibility */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>Default Upload Visibility</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              uploadVisibility === 'public' && styles.optionSelected,
            ]}
            onPress={() => setUploadVisibility('public')}
          >
            <Text style={styles.optionText}>Public</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              uploadVisibility === 'private' && styles.optionSelected,
            ]}
            onPress={() => setUploadVisibility('private')}
          >
            <Text style={styles.optionText}>Private</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Image Quality */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>Image Quality</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              quality === 'standard' && styles.optionSelected,
            ]}
            onPress={() => setQuality('standard')}
          >
            <Text style={styles.optionText}>Standard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              quality === 'high' && styles.optionSelected,
            ]}
            onPress={() => setQuality('high')}
          >
            <Text style={styles.optionText}>High-Res</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: { fontSize: 16 },
  optionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  optionSelected: {
    backgroundColor: '#4c9ef1',
  },
  optionText: {
    color: '#fff',
    fontWeight: '600',
  },
});

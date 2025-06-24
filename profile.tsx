import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const samplePosts = Array.from({ length: 9 }, (_, i) => ({
  id: `post-${i}`,
  uri: `https://source.unsplash.com/random?sig=${i + 1}`,
}));

const sampleFavorites = Array.from({ length: 6 }, (_, i) => ({
  id: `fav-${i}`,
  uri: `https://source.unsplash.com/random?sig=${i + 100}`,
}));




export default function Profile() {
  const [username, setUsername] = useState('Krishna');
  const [bio, setBio] = useState('Gallery enthusiast ✨');
  const [avatar, setAvatar] = useState('https://i.pravatar.cc/300?img=15');
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState<'posts' | 'favorites'>('posts');

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const renderGrid = (data: { id: string; uri: string }[]) => (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={3}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <Image source={{ uri: item.uri }} style={styles.gridImage} />
      )}
      contentContainerStyle={{ marginTop: 10 }}
    />
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Avatar + Edit */}
   <View style={styles.banner}>
  <TouchableOpacity onPress={pickAvatar} style={styles.avatarWrapper}>
    <Image source={{ uri: avatar }} style={styles.avatar} />
    <Text style={styles.username}>{username}</Text>

    {samplePosts.length > 50 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>TOP CONTRIBUTOR</Text>
      </View>
    )}

    

    <TouchableOpacity onPress={() => setEditing(true)} style={styles.editButton}>
      <MaterialIcons name="edit" size={20} color="#000" />
      <Text style={styles.editText}>Edit Profile</Text>
    </TouchableOpacity>
  </TouchableOpacity>
</View>

<Text style={styles.bio}>{bio}</Text>


      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{samplePosts.length}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{sampleFavorites.length}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
      </View>

      {/* Toggle Tabs */}
   <View style={styles.toggleTabs}>
  <TouchableOpacity
    onPress={() => setTab('posts')}
    style={[styles.tabButton, tab === 'posts' && styles.tabButtonActive]}>
    <MaterialIcons name="grid-on" size={22} color={tab === 'posts' ? '#000' : '#999'} />
    <Text style={styles.tabLabel}>Uploads</Text>
  </TouchableOpacity>
  <TouchableOpacity
    onPress={() => setTab('favorites')}
    style={[styles.tabButton, tab === 'favorites' && styles.tabButtonActive]}>
    <Ionicons name="heart" size={22} color={tab === 'favorites' ? '#000' : '#999'} />
    <Text style={styles.tabLabel}>Favorites</Text>
  </TouchableOpacity>
</View>


      {/* Grid */}
      {tab === 'posts' ? renderGrid(samplePosts) : renderGrid(sampleFavorites)}
{samplePosts.length > 50 && (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>TOP CONTRIBUTOR</Text>
  </View>
)}

      {/* Edit Modal */}
      <Modal visible={editing} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              style={styles.input}
            />
            <TextInput
              value={bio}
              onChangeText={setBio}
              placeholder="Bio"
              style={[styles.input, { height: 60 }]}
              multiline
            />
            <TouchableOpacity onPress={pickAvatar} style={styles.pickAvatarButton}>
              <Text style={styles.pickAvatarText}>Change Avatar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditing(false)} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.history}>
  <Text style={styles.sectionTitle}>History</Text>
  <Text style={styles.historyItem}>• Uploaded {samplePosts.length} images this month</Text>
  <Text style={styles.historyItem}>• Favorited {sampleFavorites.length} images</Text>
  <Text style={styles.historyItem}>• Member since May 2024</Text>
</View>

    </ScrollView>
  );
}
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

banner: {
  width: '100%',
  height: 220, // ⬅️ increase from 140 to 220 or more
  backgroundColor: '#3f51b5',
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingBottom: 12,
  marginBottom: 8,
},

badge: {
  backgroundColor: '#ffdd57',
  paddingHorizontal: 12,
  paddingVertical: 4,
  borderRadius: 20,
  marginTop: 6,
},
badgeText: {
  fontSize: 12,
  fontWeight: 'bold',
  color: '#333',
},
history: {
  width: '100%',
  paddingHorizontal: 20,
  marginTop: 30,
  marginBottom: 40,
},
tabLabel: {
  fontSize: 12,
  textAlign: 'center',
  marginTop: 4,
  color: '#333',
},

sectionTitle: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 10,
},
historyItem: {
  fontSize: 14,
  color: '#555',
  marginBottom: 6,
},


  container: {
    paddingVertical: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#ccc',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bio: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  editText: {
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 16,
  },
  statCard: {
   backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 80,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3, // Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
   color: 'gray',
    marginTop: 4,
  },
  toggleTabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 10,
  },
  tabButton: {
    padding: 10,
  },
  tabButtonActive: {
    backgroundColor: '#e5e5e5',
    borderRadius: 6,
  },
  gridImage: {
    width: screenWidth / 3,
    height: screenWidth / 3,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 30,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  pickAvatarButton: {
    marginBottom: 12,
  },
  pickAvatarText: {
    color: '#007bff',
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

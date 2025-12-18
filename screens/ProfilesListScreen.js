import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { api } from '../api/client';

export default function ProfilesListScreen({ navigation }) {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProfiles = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await api.get(`/profiles?page=${page}&limit=10`);
      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setProfiles(prev => [...prev, ...res.data]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfiles(); }, []);

  const renderItem = ({ item }) => (
    <Pressable 
      style={styles.card} 
      onPress={() => navigation.navigate('ProfileDetail', { id: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={fetchProfiles}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator size="large" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: 'white', padding: 16, margin: 8, borderRadius: 8, elevation: 3 },
  name: { fontSize: 18, fontWeight: 'bold' },
  email: { color: '#666' }
});
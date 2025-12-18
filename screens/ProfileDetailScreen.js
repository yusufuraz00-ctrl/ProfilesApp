import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { api } from '../api/client';

export default function ProfileDetailScreen({ route }) {
  const { id } = route.params;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/profiles/${id}`);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={{flex:1}} />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{profile?.name}</Text>
        <Text>Email: {profile?.email}</Text>
        <Text>Age: {profile?.age}</Text>
        <Text>Phone: {profile?.phone}</Text>
        <Text style={styles.bio}>{profile?.bio}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  bio: { marginTop: 15, fontStyle: 'italic' }
});
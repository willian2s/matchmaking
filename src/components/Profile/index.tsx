import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { Avatar } from '../Avatar';
import { styles } from './styles';
import phrases from '../../assets/phrases.json';

export function Profile() {
  const { user } = useAuth();
  const randomPhrasesIndex = Math.floor(Math.random() * phrases.length);
  const phrase = phrases[randomPhrasesIndex];

  return (
    <View style={styles.container}>
      <Avatar urlImage={user.avatar} />
      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Ola,</Text>
          <Text style={styles.username}>{user.firstName}</Text>
        </View>
        <Text style={styles.message}>{phrase}</Text>
      </View>
    </View>
  );
}

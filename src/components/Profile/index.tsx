import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';
import { Avatar } from '../Avatar';
import { ModalView } from '../ModalView';
import { Logout } from '../../screens/Logout';

import { styles } from './styles';
import phrases from '../../assets/phrases.json';

export function Profile() {
  const { user } = useAuth();
  const [phrase, setPhrase] = useState<string>('');
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  function handleOpenLogout() {
    setOpenLogoutModal(true);
  }

  function handleCloseLogout() {
    setOpenLogoutModal(false);
  }

  useEffect(() => {
    const randomPhrasesIndex = Math.floor(Math.random() * phrases.length);
    const phrase = phrases[randomPhrasesIndex];
    setPhrase(phrase);
  }, []);

  return (
    <View style={styles.container}>
      <RectButton onPress={handleOpenLogout}>
        <Avatar urlImage={user.avatar} />
      </RectButton>
      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Ola,</Text>
          <Text style={styles.username}>{user.firstName}</Text>
        </View>
        <Text style={styles.message}>{phrase}</Text>
      </View>
      <ModalView
        visible={openLogoutModal}
        closeModal={handleCloseLogout}
        marginTop={700}>
        <Logout onClose={handleCloseLogout} />
      </ModalView>
    </View>
  );
}

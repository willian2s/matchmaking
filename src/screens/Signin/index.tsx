import React from 'react';
import { ActivityIndicator, Alert, Image, Text, View } from 'react-native';

import { useAuth } from '../../hooks/auth';
import { Background } from '../../components/Background';
import { Button } from '../../components/Button';
import IllustrationImg from '../../assets/illustration.png';

import DiscordSvg from '../../assets/discord.svg';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export function SignIn() {
  const { loading, signIn } = useAuth();

  async function handleSignIn() {
    try {
      await signIn();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={IllustrationImg}
          style={styles.image}
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {'\n'}e organize suas {'\n'}
            jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {'\n'}
            favoritos com seus amigos {'\n'}
            ou aquela call marota
          </Text>

          {loading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <Button
              title="Entrar com Discord"
              onPress={handleSignIn}
              Icon={DiscordSvg}
            />
          )}
        </View>
      </View>
    </Background>
  );
}

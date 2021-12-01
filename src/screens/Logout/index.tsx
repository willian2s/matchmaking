import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props = {
  onClose: () => void;
};

export function Logout({ onClose }: Props) {
  const { signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Deseja sair do Match<Text style={styles.highlight}>Making</Text>?
      </Text>
      <View style={styles.buttonWrapper}>
        <RectButton
          style={[styles.actionButton, { backgroundColor: theme.colors.off }]}
          onPress={onClose}>
          <Text style={styles.title}>Não</Text>
        </RectButton>
        <TouchableOpacity style={styles.actionButton} onPress={signOut}>
          <Text style={styles.title}>Sim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { deleteAppointment } from '../../services/appointmentDetail.service';
import { AppointmentCreateScreenNavigationProp } from '../AppointmentCreate';

type Props = {
  onClose: () => void;
  id: string;
};

export function AppointmentDelete({ onClose, id }: Props) {
  const navigation = useNavigation<AppointmentCreateScreenNavigationProp>();

  async function handleDelete() {
    try {
      await deleteAppointment(id);
      navigation.navigate('Home');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esta ação é irreversivel?</Text>
      <View style={styles.buttonWrapper}>
        <RectButton
          style={[styles.actionButton, { backgroundColor: theme.colors.off }]}
          onPress={onClose}>
          <Text style={styles.title}>Não</Text>
        </RectButton>
        <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
          <Text style={styles.title}>Sim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

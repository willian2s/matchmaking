import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { AppointmentProps } from '../components/Appointment';
import { COLLECTION_APPOINTMENT } from '../config/storage';
import { GuildWidget } from '../screens/AppointmentDetails';
import { api } from './api';

export async function getGuildInfo(guildId: string) {
  try {
    const response = await api.get<GuildWidget>(
      `/guilds/${guildId}/widget.json`,
    );
    return response.data;
  } catch (error) {
    Alert.alert(
      'Não foi possivel acessar os detalhes do servidor',
      'Verifique com o administrador se o Widget do servidor está habilitado',
    );
  }
}

export async function deleteAppointment(appointmentId: string) {
  try {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);
    const appointments: AppointmentProps[] = response
      ? JSON.parse(response)
      : [];
    const newAppointments = appointments.filter(
      (item) => item.id !== appointmentId,
    );
    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENT,
      JSON.stringify(newAppointments),
    );
  } catch (error) {
    console.log(error);
  }
}

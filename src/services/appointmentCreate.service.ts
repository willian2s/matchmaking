import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { GuildProps } from '../components/Guild';

import { COLLECTION_APPOINTMENT } from '../config/storage';

type AppointmentCreate = {
  guild: GuildProps;
  category: string;
  date: string;
  description: string;
  oppointmentNotificationHour: Date;
};

export async function newAppointment({
  guild,
  category,
  date,
  description,
  oppointmentNotificationHour,
}: AppointmentCreate) {
  try {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date,
      description,
      oppointmentNotificationHour,
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENT,
      JSON.stringify([...appointments, newAppointment]),
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

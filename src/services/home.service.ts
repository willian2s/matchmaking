import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppointmentProps } from '../components/Appointment';
import { COLLECTION_APPOINTMENT } from '../config/storage';

export async function getAppointments() {
  try {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);
    const appointments: AppointmentProps[] = storage ? JSON.parse(storage) : [];

    return appointments.sort(function compare(a, b) {
      if (a.oppointmentNotificationHour < b.oppointmentNotificationHour)
        return -1;
      if (a.oppointmentNotificationHour > b.oppointmentNotificationHour)
        return 1;
      return 0;
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

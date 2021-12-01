import React, { useCallback, useState } from 'react';
import { View, FlatList } from 'react-native';
import {
  CompositeNavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { Background } from '../../components/Background';
import { CategorySelect } from '../../components/CategorySelect';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Profile } from '../../components/Profile';
import { Loading } from '../../components/Loading';

import { styles } from './styles';
import { getAppointments } from '../../services/home.service';

type HomeScreenNavigationProp = CompositeNavigationProp<any, any>;

export function Home() {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  function handleAppointmentDetails(appointmentSelected: AppointmentProps) {
    navigation.navigate('AppointmentDetails', { appointmentSelected });
  }

  useFocusEffect(
    useCallback(() => {
      getAppointments()
        .then((res) => {
          if (res) {
            if (category) {
              setAppointments(res.filter((item) => item.category === category));
            } else {
              setAppointments(res);
            }
            setLoading(false);
          }
        })
        .catch((error) => console.error(error));
    }, [category]),
  );

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      {loading ? (
        <Loading />
      ) : (
        <>
          <ListHeader
            title="Partidas agendadas"
            subtitle={`Total ${appointments.length}`}
          />
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Appointment
                data={item}
                onPress={() => handleAppointmentDetails(item)}
              />
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            contentContainerStyle={{ paddingBottom: 69 }}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </Background>
  );
}

import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { Button } from '../../components/Button';
import { TextArea } from '../../components/TextArea';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { GuildProps } from '../../components/Guild';
import { newAppointment } from '../../services/appointmentCreate.service';

export type AppointmentCreateScreenNavigationProp = CompositeNavigationProp<
  any,
  any
>;

export function AppointmentCreate() {
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  const [date, setDate] = useState(new Date());
  const [myMode, setMyMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  const navigation = useNavigation<AppointmentCreateScreenNavigationProp>();

  async function handleSave() {
    try {
      if (
        !guild ||
        !category ||
        !description ||
        !day ||
        !month ||
        !hour ||
        !minute
      ) {
        Alert.alert('Dados inválidos!', 'Revise os dados do agendamento.');
        throw new Error('invalid_params');
      }
      await newAppointment({
        guild,
        category,
        description,
        date: `${day}/${month} - ${hour}:${minute}h`,
        oppointmentNotificationHour: date,
      });
      navigation.navigate('Home');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  function handleOpenGuild() {
    setOpenGuildsModal(true);
  }

  function handleCloseGuild() {
    setOpenGuildsModal(false);
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect);
    setOpenGuildsModal(false);
  }

  const onChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    setDay(currentDate.getDate().toString());
    setMonth((currentDate.getMonth() + 1).toString());

    setHour(currentDate.getHours().toString());
    setMinute(currentDate.getMinutes().toString());
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMyMode(currentMode === 'date' ? 'date' : 'time');
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Background>
        <ScrollView>
          <Header title="Agendar partida" />
          <Text
            style={[
              styles.label,
              { marginLeft: 24, marginTop: 36, marginBottom: 18 },
            ]}>
            Categoria
          </Text>
          <CategorySelect
            hasCheckbox
            categorySelected={category}
            setCategory={handleCategorySelect}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuild}>
              <View style={styles.select}>
                {guild.icon ? (
                  <GuildIcon guildId={guild.id} iconId={guild.icon} />
                ) : (
                  <View style={styles.image} />
                )}
                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : 'Selecione um servidor'}
                  </Text>
                </View>

                <Feather
                  name="chevron-right"
                  size={18}
                  color={theme.colors.heading}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <RectButton onPress={showDatepicker}>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Dia e mês
                  </Text>
                  <View style={styles.column}>
                    <SmallInput
                      maxLength={2}
                      value={day}
                      onChangeText={setDay}
                      editable={false}
                    />
                    <Text style={styles.divider}>/</Text>
                    <SmallInput
                      maxLength={2}
                      value={month}
                      onChangeText={setMonth}
                    />
                  </View>
                </RectButton>
              </View>

              <View>
                <RectButton onPress={showTimepicker}>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Hora e minuto
                  </Text>

                  <View style={styles.column}>
                    <SmallInput
                      maxLength={2}
                      value={hour}
                      onChangeText={setHour}
                    />
                    <Text style={styles.divider}>:</Text>
                    <SmallInput
                      maxLength={2}
                      value={minute}
                      onChangeText={setMinute}
                    />
                  </View>
                </RectButton>
              </View>
            </View>
            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
            </View>
            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
            />

            <View style={styles.footer}>
              <Button title="Agendar" onPress={handleSave} />
            </View>

            <View />
          </View>
        </ScrollView>
      </Background>
      <ModalView
        visible={openGuildsModal}
        closeModal={handleCloseGuild}
        marginTop={100}>
        <Guilds handleGuildSelected={handleGuildSelect} />
      </ModalView>
      <View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={myMode}
            is24Hour={true}
            minimumDate={new Date()}
            display="default"
            onChange={(event: Event, date?: Date) => onChange(event, date)}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

import React, { useState } from 'react';
import {
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

  const navigation = useNavigation<AppointmentCreateScreenNavigationProp>();

  async function handleSave() {
    try {
      await newAppointment({
        guild,
        category,
        description,
        date: `${day}/${month} - ${hour}:${minute}h`,
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
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Dia e mês
                </Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setDay} />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput maxLength={2} onChangeText={setMonth} />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setHour} />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput maxLength={2} onChangeText={setMinute} />
                </View>
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
    </KeyboardAvoidingView>
  );
}

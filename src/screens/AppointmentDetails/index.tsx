import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  Platform,
  Share,
  Text,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { Button } from '../../components/Button';
import { AppointmentProps } from '../../components/Appointment';
import { Loading } from '../../components/Loading';
import { ModalView } from '../../components/ModalView';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import BannerImg from '../../assets/banner.png';
import DiscordSvg from '../../assets/discord.svg';
import { getGuildInfo } from '../../services/appointmentDetail.service';
import { AppointmentDelete } from '../AppointmentDelete';

type Params = {
  appointmentSelected: AppointmentProps;
};

export type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;
};

export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>();
  const [loading, setLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  function handleOpenDelete() {
    setOpenDeleteModal(true);
  }

  function handleCloseDelete() {
    setOpenDeleteModal(false);
  }

  const route = useRoute();
  const { appointmentSelected } = route.params as Params;

  async function handleShareInvite() {
    const message =
      Platform.OS === 'ios'
        ? `Junte-se a ${appointmentSelected.guild.name}`
        : widget?.instant_invite;

    await Share.share({
      message,
      url: widget?.instant_invite as string,
    });
  }

  async function handleOpenGuild() {
    await Linking.openURL(widget?.instant_invite as string | '');
  }

  useEffect(() => {
    getGuildInfo(appointmentSelected.guild.id)
      .then((res) => {
        if (res) {
          setWidget(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [appointmentSelected.guild.id]);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          widget?.instant_invite && (
            <BorderlessButton onPress={handleShareInvite}>
              <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
          )
        }
      />
      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{appointmentSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{appointmentSelected.description}</Text>
        </View>
      </ImageBackground>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${widget ? widget?.members.length : 0}`}
          />
          <FlatList
            data={widget?.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            style={styles.members}
          />
        </>
      )}
      <View style={styles.footer}>
        <Button
          title="Entrar na partida"
          onPress={handleOpenGuild}
          onDelete={handleOpenDelete}
          Icon={DiscordSvg}
        />
      </View>
      <ModalView
        visible={openDeleteModal}
        closeModal={handleCloseDelete}
        marginTop={700}>
        <AppointmentDelete
          id={appointmentSelected.id}
          onClose={handleCloseDelete}
        />
      </ModalView>
    </Background>
  );
}

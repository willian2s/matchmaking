import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Loading } from '../../components/Loading';
import { fetchGuilds } from '../../services/guilds.service';

import { styles } from './styles';

type Props = {
  handleGuildSelected: (guild: GuildProps) => void;
};

export function Guilds({ handleGuildSelected }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuilds()
      .then((res) => {
        setGuilds(res);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={guilds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Guild data={item} onPress={() => handleGuildSelected(item)} />
          )}
          ListHeaderComponent={() => <ListDivider isCentered />}
          ItemSeparatorComponent={() => <ListDivider />}
          showsVerticalScrollIndicator={false}
          style={styles.guilds}
          contentContainerStyle={{ paddingBottom: 68, paddingTop: 40 }}
        />
      )}
    </View>
  );
}

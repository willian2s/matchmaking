import React from "react";
import { View, FlatList } from "react-native";
import { Guild, GuildProps } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";

import { styles } from "./styles";

type Props = {
  hangleGuildSelected: (guild: GuildProps) => void;
};

export function Guilds({ hangleGuildSelected }: Props) {
  const guilds = [
    {
      id: "1",
      name: "Lendarios",
      icon: "image.png",
      owner: true,
    },
    {
      id: "2",
      name: "GAMERS",
      icon: "image.png",
      owner: true,
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Guild data={item} onPress={() => hangleGuildSelected(item)} />
        )}
        ItemSeparatorComponent={() => <ListDivider />}
        showsVerticalScrollIndicator={false}
        style={styles.guilds}
      />
    </View>
  );
}

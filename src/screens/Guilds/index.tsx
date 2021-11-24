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
    {
      id: "3",
      name: "GAMERS",
      icon: "image.png",
      owner: true,
    },
    {
      id: "4",
      name: "GAMERS",
      icon: "image.png",
      owner: true,
    },
    {
      id: "5",
      name: "GAMERS",
      icon: "image.png",
      owner: true,
    },
    {
      id: "6",
      name: "GAMERS",
      icon: "image.png",
      owner: true,
    },
    {
      id: "7",
      name: "GAMERS",
      icon: "image.png",
      owner: true,
    },
    {
      id: "8",
      name: "GAMERS",
      icon: "image.png",
      owner: true,
    },
    {
      id: "9",
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
        ListHeaderComponent={() => <ListDivider isCentered />}
        ItemSeparatorComponent={() => <ListDivider />}
        showsVerticalScrollIndicator={false}
        style={styles.guilds}
        contentContainerStyle={{ paddingBottom: 68, paddingTop: 104 }}
      />
    </View>
  );
}

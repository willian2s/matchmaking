import React from "react";
import { Image, Text, View } from "react-native";
import { ButtonIcon } from "../../components/ButtonIcon";
import { styles } from "./styles";

import Illustration from "../../assets/illustration.png";

export function SignIn() {
  return (
    <View style={styles.container}>
      <Image source={Illustration} style={styles.image} resizeMode="stretch" />

      <View style={styles.content}>
        <Text style={styles.title}>
          Conecte-se {"\n"}e organize suas{"\n"}
          jogatinas{"\n"}
        </Text>

        <Text style={styles.subtitle}>
          Crie grupos para jogar seus games{`\n`}
          favoritos com seus amigos
        </Text>

        <ButtonIcon title="Entrar com Discord" activeOpacity={0.8} />
      </View>
    </View>
  );
}

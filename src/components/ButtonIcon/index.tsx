import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import { styles } from './styles';

import DiscordSvg from '../../assets/discord.svg';

type Props = RectButtonProps & {
  title: string;
};

export function ButtonIcon({ title, ...rest }: Props) {
  return (
    <RectButton style={styles.container} {...rest}>
      <View style={styles.iconWrapper}>
        <DiscordSvg width={24} height={18} />
      </View>

      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
}

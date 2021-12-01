import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { SvgProps } from 'react-native-svg';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = RectButtonProps & {
  title: string;
  Icon?: React.FC<SvgProps>;
  onDelete?: () => void;
};

export function Button({ title, Icon, onDelete, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <RectButton
        style={[styles.actionButton, onDelete && { width: '78%' }]}
        {...rest}>
        {Icon && (
          <View style={styles.iconWrapper}>
            <Icon width={24} height={18} />
          </View>
        )}

        <Text style={styles.title}>{title}</Text>
      </RectButton>
      {onDelete && (
        <RectButton
          onPress={onDelete}
          style={[
            styles.actionButton,
            {
              alignItems: 'center',
              width: '18%',
              justifyContent: 'center',
              backgroundColor: theme.colors.off,
            },
          ]}>
          <Fontisto name="trash" size={24} color={theme.colors.heading} />
        </RectButton>
      )}
    </View>
  );
}

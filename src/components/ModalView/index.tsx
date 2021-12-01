import React, { ReactNode } from 'react';
import {
  Modal,
  ModalProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { styles } from './styles';

import { Background } from '../Background';

type Props = ModalProps & {
  children: ReactNode;
  marginTop: number;
  closeModal: () => void;
};

export function ModalView({ children, closeModal, marginTop, ...rest }: Props) {
  return (
    <Modal transparent animationType="fade" statusBarTranslucent {...rest}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={[styles.container, { marginTop }]}>
            <Background>
              <View style={styles.bar} />
              {children}
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

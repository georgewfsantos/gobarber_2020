import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

const SuccessScreen: React.FC = () => {
  const { reset } = useNavigation();

  const handleOkButtonPress = useCallback(() => {
    reset({
      routes: [
        {
          name: 'Dashboard',
        },
      ],
      index: 0,
    });
  }, [reset]);
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <Container>
        <Icon name="check" size={80} color="#04d361" />

        <Title>Agendamento concluído</Title>
        <Description>Terça, dia 14 de março de 2020 às 12:00 h</Description>

        <OkButton onPress={handleOkButtonPress}>
          <OkButtonText>Ok</OkButtonText>
        </OkButton>
      </Container>
    </>
  );
};

export default SuccessScreen;

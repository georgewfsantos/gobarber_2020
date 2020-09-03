import React, {useCallback, useMemo} from 'react';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import {format} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {Container, Title, Description, OkButton, OkButtonText} from './styles';

interface RouteParams {
  date: number;
}

const SuccessScreen: React.FC = () => {
  const {reset} = useNavigation();
  const {params} = useRoute();

  const routeParams = params as RouteParams;

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

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy ', às' HH:mm'h'",
      {locale: ptBR},
    );
  }, [routeParams.date]);
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <Container>
        <Icon name="check" size={80} color="#04d361" />

        <Title>Agendamento concluído</Title>
        <Description>{formattedDate}</Description>

        <OkButton onPress={handleOkButtonPress}>
          <OkButtonText>Ok</OkButtonText>
        </OkButton>
      </Container>
    </>
  );
};

export default SuccessScreen;

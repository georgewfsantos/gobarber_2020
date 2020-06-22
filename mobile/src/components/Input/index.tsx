import React from 'react';
import {TextInputProps} from 'react-native';


import { Container, CustomInput, InputIcon } from './styles';

interface InputProps  extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest}) => {
  return (
    <Container>
      <InputIcon name={icon} size={20} color="#666360"/>
      <CustomInput keyboardAppearance="dark"{...rest} placeholderTextColor="#666360"/>
    </Container>
  );
}

export default Input;

import React, {useCallback, useRef} from 'react';
import { Image, ScrollView, View, KeyboardAvoidingView,TextInput, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.png';

import { Container, Title, BackToSigIn, BackToSigInText } from './styles';


const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef= useRef<TextInput>(null);
  const passwordInputRef= useRef<TextInput>(null);

  const handleSignIn = useCallback((data: object)=>{
    console.log(data);
  },[])

  return (
    <>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1}} enabled>

      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1}}>
    <Container>
      <Image source={logo}/>
      <View>
      <Title>Crie sua conta</Title>
      </View>

      <Form ref={formRef} onSubmit={handleSignIn} >
      <Input
      name="name"
      icon="user"
      placeholder="Nome"
      autoCapitalize="words"
      returnKeyType="next"
      onSubmitEditing={()=> {
        emailInputRef.current?.focus()
      }}
      />

      <Input
      name="email"
      icon="mail"
      placeholder="E-mail"
      keyboardType="email-address"
      autoCorrect={false}
      autoCapitalize="none"
      returnKeyType="next"
      ref={emailInputRef}
      onSubmitEditing={()=> {
        passwordInputRef.current?.focus()
      }}
      />

      <Input
      name="password"
      icon="lock"
      placeholder="Senha"
      secureTextEntry
      textContentType="newPassword"
      returnKeyType="send"
      ref={passwordInputRef}
      onSubmitEditing={() =>{formRef.current?.submitForm()}}
      />

      <Button onPress={() =>{formRef.current?.submitForm()}}>Entrar</Button>
      </Form>



    </Container>
    </ScrollView>

    </KeyboardAvoidingView>
    <BackToSigIn onPress={()=> navigation.goBack()}>
    <Icon name="arrow-left" size={20} color="#fff"/>

      <BackToSigInText>
        Voltar para login
      </BackToSigInText>
    </BackToSigIn>
    </>
  );
}

export default SignUp;

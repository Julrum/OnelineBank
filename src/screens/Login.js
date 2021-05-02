import React, { useState, useRef, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProgressContext, UserContext } from '../contexts';
import { Image, Input, Button } from '../components';
import { images } from '../utils/images';
import { validateEmail, removeWhitespace } from '../utils/common';
import { login } from '../utils/firebase';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const passwordRef = useRef();
  const insets = useSafeAreaInsets();
  const { spinner } = useContext(ProgressContext);
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  const _handleEmailChange = email => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? '' : '이메일 형식을 확인해주세요.'
    );
  };
  const _handlePasswordChange = password => {
    setPassword(removeWhitespace(password));
  };

  const _handleLoginButtonPress = async () => {
    try {
      spinner.start();
      const user = await login({ email, password });
      dispatch(user);
    } catch (e) {
      Alert.alert('로그인 오류 발생', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container insets={insets}>
        <Image url={images.logo} imageStyle={{ borderRadius: 30 }} />
        <Input
          label="이메일"
          value={email}
          onChangeText={_handleEmailChange}
          onSubmitEditing={_handleLoginButtonPress}
          placeholder="이메일을 입력해주세요."
          keyType="email-address"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="비밀번호"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={() => {}}
          placeholder="비밀번호를 입력해주세요."
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="로그인"
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <Button
          title="회원가입"
          onPress={() => navigation.navigate('회원가입')}
          isFilled={false}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;

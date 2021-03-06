import React, { useState, useRef, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProgressContext, UserContext } from '../contexts';
import { Image, Input, Button } from '../components';
import {
  validateEmail,
  validateAccount,
  removeWhitespace,
} from '../utils/common';
import { images } from '../utils/images';
import { signup, signBot, createUsers, createBots } from '../utils/firebase';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 40px 20px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const Signup = () => {
  const [photoUrl, setPhotoUrl] = useState(images.photo);
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { spinner } = useContext(ProgressContext);
  const { dispatch } = useContext(UserContext);

  const accountRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const didMountRef = useRef();

  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = '';
      if (!name) {
        _errorMessage = '이름을 입력해주세요.';
      } else if (!validateAccount(account)) {
        _errorMessage = '올바른 계좌번호 형식이 아닙니다.';
      } else if (!validateEmail(email)) {
        _errorMessage = '올바른 이메일 형식이 아닙니다.';
      } else if (password.length < 6) {
        _errorMessage = '비밀번호는 6자 이상이어야합니다.';
      } else if (password !== passwordConfirm) {
        _errorMessage = '비밀번호가 일치하지 않습니다.';
      } else {
        _errorMessage = '';
      }
      setErrorMessage(_errorMessage);
    } else {
      didMountRef.current = true;
    }
  }, [name, email, account, password, passwordConfirm]);

  useEffect(() => {
    setDisabled(
      !(
        name &&
        email &&
        account &&
        password &&
        passwordConfirm &&
        !errorMessage
      )
    );
  }, [name, email, account, password, passwordConfirm, errorMessage]);

  const _handleSignupButtonPress = async () => {
    try {
      spinner.start();
      const user = await signup({ email, password, name, photoUrl });
      dispatch(user);
      if (user) {
        await createUsers({ email, account, name, id: user.uid });
        await createBots({ uid: user.uid });
      } else {
        console.log('build failed!');
      }
    } catch (e) {
      Alert.alert('회원가입 실패', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Image
          rounded
          url={photoUrl}
          showButton
          onChangeImage={url => setPhotoUrl(url)}
        />
        <Input
          label="이름"
          value={name}
          onChangeText={text => setName(text)}
          onSubmitEditing={() => {
            setName(name.trim());
            accountRef.current.focus();
          }}
          onBlur={() => setName(name.trim())}
          placeholder="이름을 입력해주세요."
          returnKeyType="next"
        />
        <Input
          ref={accountRef}
          label="계좌번호"
          value={account}
          onChangeText={text => setAccount(removeWhitespace(text))}
          onSubmitEditing={() => emailRef.current.focus()}
          placeholder="계좌번호를 입력해주세요."
          keyType="numeric"
          returnKeyType="next"
        />
        <Input
          ref={emailRef}
          label="이메일"
          value={email}
          onChangeText={text => setEmail(removeWhitespace(text))}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="이메일을 입력해주세요"
          keyType="email-address"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="비밀번호"
          입
          value={password}
          onChangeText={text => setPassword(removeWhitespace(text))}
          onSubmitEditing={() => passwordConfirmRef.current.focus()}
          placeholder="비밀번호를 입력해주세요."
          returnKeyType="done"
          isPassword
        />
        <Input
          ref={passwordConfirmRef}
          label="비밀번호 확인"
          value={passwordConfirm}
          onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
          onSubmitEditing={_handleSignupButtonPress}
          placeholder="다시 한번 입력해주세요."
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="회원가입"
          onPress={_handleSignupButtonPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

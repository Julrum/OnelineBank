import React, { useState, useRef, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { ProgressContext } from '../contexts';
import { createAccount, getCurrentUser } from '../utils/firebase';
import styled from 'styled-components/native';
import { Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  removeWhitespace,
  validateAccount,
  validateBankCode,
} from '../utils/common';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const AccountCreation = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const [name, setName] = useState('');
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const accountRef = useRef();
  const bankRef = useRef();
  const didMountRef = useRef();
  const { uid } = getCurrentUser();

  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = '';
      if (!name) {
        _errorMessage = 'Please enter name.';
      } else if (!validateAccount(account)) {
        _errorMessage = 'Please verify account.';
      } else if (!validateBankCode(bank)) {
        _errorMessage = 'Please verify bank name.';
      } else {
        _errorMessage = '';
      }
      setErrorMessage(_errorMessage);
    } else {
      didMountRef.current = true;
    }
  }, [name, account, bank]);

  useEffect(() => {
    setDisabled(!(name && account && bank && !errorMessage));
  }, [name, account, bank, errorMessage]);

  const _handleCreateButtonPress = async () => {
    try {
      spinner.start();
      await createAccount({ name, bank, account, uid });
      navigation.goBack();
    } catch (e) {
      Alert.alert('Creation Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container>
        <Input
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          onSubmitEditing={() => {
            setName(name.trim());
            bankRef.current.focus();
          }}
          onBlur={() => setName(name.trim())}
          placeholder="Name"
          returnKeyType="next"
          maxLength={10}
        />
        <Input
          ref={bankRef}
          label="Bank name"
          value={bank}
          onChangeText={text => setBank(removeWhitespace(text))}
          onSubmitEditing={() => {
            setBank(bank.trim());
            () => accountRef.current.focus();
          }}
          onBlur={() => setBank(bank.trim())}
          placeholder="Bank name"
          returnKeyType="next"
          maxLength={10}
        />
        <Input
          ref={accountRef}
          label="Account"
          value={account}
          onChangeText={text => setAccount(text)}
          onSubmitEditing={() => {
            setAccount(account.trim());
            _handleCreateButtonPress();
          }}
          onBlur={() => setAccount(account.trim())}
          placeholder="Account"
          returnKeyType="done"
          maxLength={20}
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Create"
          onPress={_handleCreateButtonPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};
export default AccountCreation;

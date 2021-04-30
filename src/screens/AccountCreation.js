import React, { useState, useRef, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { ProgressContext } from '../contexts';
import { createAccount } from '../utils/firebase';
import styled from 'styled-components/native';
import { Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  const [account, setAccount] = useState('');
  const accountRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(name && !errorMessage));
  }, [name, account, errorMessage]);

  const _handleNameChange = name => {
    setName(name);
    setErrorMessage(name.trim() ? '' : 'Please enter the title.');
  };

  const _handleCreateButtonPress = async () => {
    try {
      spinner.start();
      const id = await createAccount({ name, account });
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
          onChangeText={_handleNameChange}
          onSubmitEditing={() => {
            setName(name.trim());
            accountRef.current.focus();
          }}
          onBlur={() => setName(name.trim())}
          placeholder="Name"
          returnKeyType="next"
          maxLength={10}
        />
        <Input
          ref={accountRef}
          label="Account"
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

import React, { useContext, useState, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { Button, Image, Input } from '../components';
import {
  logout,
  getCurrentUser,
  updateUserPhoto,
  DB,
  getInformation,
} from '../utils/firebase';
import { ProgressContext, UserContext } from '../contexts';
import { Alert } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Profile = () => {
  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  const theme = useContext(ThemeContext);

  const user = getCurrentUser();
  const [information, setInformation] = useState({});
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  useEffect(() => {
    const unsubscribe = DB.collection('information').onSnapshot(snapshot => {
      const list = [];
      snapshot.forEach(doc => {
        list.push(doc.data());
      });
      setInformation(list[0]);
    });
    return () => unsubscribe();
  }, []);

  const _handleLogoutButtonPress = async () => {
    try {
      spinner.start();
      await logout();
    } catch (e) {
      console.log('[Profile] logout: ', e.message);
    } finally {
      dispatch({});
      spinner.stop();
    }
  };

  const _handlePhotoChange = async url => {
    try {
      spinner.start();
      const updateUser = await updateUserPhoto(url);
      setPhotoUrl(updateUser.photoUrl);
    } catch (e) {
      Alert.alert('Photo Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <Container>
      <Image
        url={photoUrl}
        onChangeImage={_handlePhotoChange}
        showButton
        rounded
      />
      <Input label="Name" value={user.name} disabled />
      <Input label="Email" value={user.email} disabled />
      <Button
        title="logout"
        onPress={_handleLogoutButtonPress}
        containerStyle={{ marginTop: 30, backgroundColor: theme.buttonLogout }}
      />
    </Container>
  );
};

export default Profile;

import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { DB, createMessage, getCurrentUser } from '../utils/firebase';
import styled, { ThemeContext } from 'styled-components/native';
import { Alert, Platform } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { MaterialIcons } from '@expo/vector-icons';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const SendButton = props => {
  const theme = useContext(ThemeContext);

  return (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
      }}
    >
      <MaterialIcons
        name="send"
        size={24}
        color={
          props.text ? theme.sendButtonActivate : theme.sendButtonInactivate
        }
      />
    </Send>
  );
};

const Channel = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const { uid, name, photoUrl } = getCurrentUser();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState([]);
  const DEFAULT_TABBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 0;

  useEffect(() => {
    const unsubscirbe = DB.collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
          list.push(doc.data());
        });
        setMessages(list);
      });
    return () => unsubscirbe();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: 'Chat' });
  }, []);

  const _handleMessageSend = async messageList => {
    const newMessage = messageList[0];
    try {
      await createMessage({ message: newMessage });
    } catch (e) {
      Alert.alert('Sned Message Error', e.message);
    }
  };

  return (
    <Container>
      <GiftedChat
        listViewProps={{
          style: { backgroundColor: theme.background },
        }}
        placeholder="Enter a message..."
        messages={messages}
        user={{ _id: uid, name, avatar: photoUrl }}
        onSend={_handleMessageSend}
        alwaysShowSend={true}
        textInputProps={{
          autoCapitalize: 'none',
          autoCorrect: false,
          textContentType: 'none',
          underlineColorAndroid: 'transparent',
        }}
        multiline={false}
        renderUsernameOnMessage={true}
        scrollToBottom={true}
        renderSend={props => <SendButton {...props} />}
        bottomOffset={DEFAULT_TABBAR_HEIGHT + getBottomSpace()}
      />
    </Container>
  );
};

export default Channel;

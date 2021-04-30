import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
  useRef,
} from 'react';
import {
  DB,
  createMessage,
  createBotMesage,
  getCurrentUser,
} from '../utils/firebase';
import styled, { ThemeContext } from 'styled-components/native';
import { Alert, Platform } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { MaterialIcons } from '@expo/vector-icons';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import {
  returnAccount,
  returnMoney,
  makeId,
  validateAccount,
  validateMoney,
} from '../utils/common';

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
  const info = useRef([]);
  const setInfo = n => {
    info.current = n;
  };
  const texts = useRef('');
  const setTexts = n => {
    texts.current = n;
  };
  const DEFAULT_TABBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 0;

  const bot = comment => {
    return {
      _id: makeId(36),
      text: comment,
      user: {
        _id: 'eKaVi4APosTLlKN7EDXdvXUIYAD2',
        avatar:
          'https://firebasestorage.googleapis.com/v0/b/react-native-chat-d43a3.appspot.com/o/profile%2FeKaVi4APosTLlKN7EDXdvXUIYAD2%2Fphoto.png?alt=media&token=4925aa6b-6085-4404-9f67-30f564adff03',
        name: 'Bot',
      },
    };
  };

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

  const findAccount = text => {
    console.log(text);
    const list = [];
    setInfo([]);
    if (validateAccount(text)) {
      console.log(returnAccount(text));
      list.push(returnAccount(text));
    } else {
      console.log('error1');
      list.push(null);
    }
    if (validateMoney(text)) {
      console.log(returnMoney(text));
      list.push(returnMoney(text));
    } else {
      console.log('error2');
      list.push(null);
    }
    setInfo(list);
    if (info.current[0] !== null && info.current[1] !== null) {
      console.log(info.current[0], info.current[1]);
      setTexts(`${info.current[0]}에게 ${info.current[1]}원을 송금하겠습니다.`);
    } else {
      setTexts('명령을 알아듣지 못했어요.');
    }
    console.log(texts.current);
  };

  const _handleMessageSend = async messageList => {
    const newMessage = messageList[0];
    try {
      await createMessage({ message: newMessage });
      await findAccount(newMessage.text);
      await createBotMesage({
        message: bot(texts.current),
      });
    } catch (e) {
      Alert.alert('Send Message Error', e.message);
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
        parsePatterns={linkStyle => [
          {
            pattern: /\@(\w+)/,
            style: linkStyle,
            onPress: tag => console.log(`Pressed on hashtag: ${tag}`),
          },
          {
            pattern: /\d{11,14}/,
            style: linkStyle,
            onPress: tag => console.log(`Pressed on account: ${tag}`),
          },
          {
            pattern: /\d+(?=원)/,
            style: linkStyle,
            onPress: tag => console.log(`Pressed on money: ${tag}`),
          },
          {
            type: 'phone',
            style: linkStyle,
            onPress: tag => console.log('abc'),
          },
        ]}
      />
    </Container>
  );
};

export default Channel;

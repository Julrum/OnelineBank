import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
  useRef,
} from 'react';
import { Alert, Platform, Image } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import {
  Bubble,
  GiftedChat,
  Send,
  InputToolbar,
  Composer,
  Actions,
} from 'react-native-gifted-chat';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import {
  DB,
  createMessage,
  createBotMessage,
  getCurrentUser,
} from '../utils/firebase';
import {
  returnAccount,
  returnMoney,
  makeId,
  validateAccount,
  validateMoney,
} from '../utils/common';
import { ProgressContext } from '../contexts';

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
        width: 50,
        height: 34,
        backgroundColor: theme.sendButtonBG,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
        margin: 5,
        marginRight: 10,
      }}
    >
      <MaterialIcons
        name="arrow-upward"
        size={26}
        color={theme.sendButtonActivate}
      />
    </Send>
  );
};

const RenderBubble = props => {
  const theme = useContext(ThemeContext);
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          borderColor: theme.botBubbleBorder,
          backgroundColor: theme.botBubbleBG,
          borderWidth: 2,
          borderBottomLeftRadius: 0,
        },
        right: {
          backgroundColor: theme.bubbleBG,
          borderBottomRightRadius: 0,
        },
      }}
    />
  );
};

const RenderInputToolbar = props => {
  const theme = useContext(ThemeContext);
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.inputBorderColor,
        marginLeft: 2,
        marginRight: 2,
        paddintTop: 6,
      }}
      primaryStyle={{ alignItems: 'center' }}
    />
  );
};

const Channel = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const theme = useContext(ThemeContext);
  const { uid, name, photoUrl } = getCurrentUser();
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(404);
  const progress = useRef(false);
  const setProgress = n => {
    progress.current = n;
  };
  const info = useRef([]);
  const setInfo = n => {
    info.current = n;
  };
  const texts = useRef('');
  const setTexts = n => {
    texts.current = n;
  };
  const DEFAULT_TABBAR_HEIGHT = Platform.OS === 'ios' ? 43 : 0;

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
      setProgress(true);
    } else {
      setTexts('명령을 알아듣지 못했어요.');
      setProgress(false);
    }
    console.log(texts.current);
  };

  const findAnswer = text => {
    console.log(text);
    if (text === '네' || text === '예') {
      setProgress(false);
      setTexts('이체를 진행합니다.');
      transfer();
      if (status === 200) {
        setTexts(
          `이체를 완료하였습니다.\n예금주: ${data.dataBody.OWAC_FNM}\n수취인: ${data.dataBody.RNPE_FNM}\n잔액: ${data.dataBody.BFTR_AF_BAL}\n수수료금액: ${data.dataBody.FEE_Am}`
        );
      } else {
        setTexts('이체에 실패했습니다.');
      }
    } else {
      setProgress(false);
      setTexts('이체를 취소합니다.');
    }
  };

  const transfer = async () => {
    try {
      const headers = {
        appKey: 'l7xxcD4QVD4iKSerVX01i3fuh4CyK7zQ0rDs',
      };
      const response = await axios.post(
        'https://openapi.wooribank.com:444/oai/wb/v1/trans/executeWooriAcctToWooriAcct',
        {
          dataHeader: {
            UTZPE_CNCT_IPAD: '10.0.0.1',
            UTZPE_CNCT_MCHR_UNQ_ID: '3B5E6E7B',
            UTZPE_CNCT_TEL_NO_TXT: '01035624526',
            UTZPE_CNCT_MCHR_IDF_SRNO: 'IMEI',
            UTZ_MCHR_OS_DSCD: '1',
            UTZ_MCHR_OS_VER_NM: '8.0.0',
            UTZ_MCHR_MDL_NM: 'SM-G930S',
            UTZ_MCHR_APP_VER_NM: '1.0.0',
          },
          dataBody: {
            WDR_ACNO: '1002123456789',
            TRN_AM: '500000',
            RCV_BKCD: '020',
            RCV_ACNO: '1002987654321',
            PTN_PBOK_PRNG_TXT: '보너스',
          },
        },
        { headers: headers }
      );
      console.log(response.data);
      setData(response.data);
      setStatus(response.status);
    } catch (e) {
      console.log(e);
    }
  };

  const _handleMessageSend = async messageList => {
    const newMessage = messageList[0];
    try {
      spinner.start();
      await createMessage({ message: newMessage });
      if (!progress.current) {
        await findAccount(newMessage.text);
        await createBotMessage({ message: bot(texts.current) });
      } else {
        await findAnswer(newMessage.text);
        await createBotMessage({ message: bot(texts.current) });
      }
    } catch (e) {
      Alert.alert('Send Message Error', e.message);
    } finally {
      spinner.stop();
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
        renderBubble={props => <RenderBubble {...props} />}
        renderInputToolbar={props => <RenderInputToolbar {...props} />}
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

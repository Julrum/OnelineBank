import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
  useRef,
} from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import { DB, createMessage, createBotMessage } from '../utils/firebase';
import {
  returnAccount,
  returnMoney,
  makeId,
  validateAccount,
  validateMoney,
} from '../utils/common';
import { ProgressContext } from '../contexts';
import { Chat } from '../components';

const Channel = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const [messages, setMessages] = useState([]);
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
  const data = useRef(null);
  const setData = n => {
    data.current = n;
  };
  const status = useRef(404);
  const setStatus = n => {
    status.current = n;
  };

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

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: 'Chat' });
  }, []);

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
      if (status.current === 200) {
        setTexts(
          `이체를 완료하였습니다.\n예금주: ${data.current.dataBody.OWAC_FNM}\n수취인: ${data.current.dataBody.RNPE_FNM}\n잔액: ${data.current.dataBody.BFTR_AF_BAL}\n수수료금액: ${data.current.dataBody.FEE_Am}`
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

  return <Chat messages={messages} _handleMessageSend={_handleMessageSend} />;
};

export default Channel;

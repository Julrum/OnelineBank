import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
  useRef,
} from 'react';
import { Alert } from 'react-native';
import { DB, createMessage, getCurrentUser } from '../utils/firebase';
import { transferOther, transferWoori } from '../utils/woori';
import {
  returnAccount,
  returnMoney,
  makeId,
  validateAccount,
  validateMoney,
  validateBankCode,
  returnName,
  validateName,
  findNameinAccount,
} from '../utils/common';
import { ProgressContext } from '../contexts';
import { Chat } from '../components';

const Channel = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const [messages, setMessages] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [information, setInformation] = useState({});
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
  const { uid } = getCurrentUser();
  const botId = `bots${uid}`;

  const bot = comment => {
    return {
      _id: makeId(36),
      text: comment,
      user: {
        _id: botId,
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
          if (doc.data().user._id === uid || doc.data().user._id === botId) {
            list.push(doc.data());
          }
        });
        setMessages(list);
      });
    return () => unsubscirbe();
  }, []);

  useEffect(() => {
    const unsubscirbe = DB.collection('accounts')
      .orderBy('name', 'asc')
      .onSnapshot(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
          list.push(doc.data());
        });
        setAccounts(list);
      });
    return () => unsubscirbe();
  }, []);

  useEffect(() => {
    const unsubscirbe = DB.collection('information').onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        if (doc.data().id === uid) setInformation(doc.data());
      });
    });
    return () => unsubscirbe();
  }, []);

  const findAccount = text => {
    const list = [];
    let _message = '';
    setInfo([]);
    if (validateName(text)) {
      console.log(returnName(text));
      const isThereName = findNameinAccount(returnName(text), accounts, uid);
      if (isThereName[0] !== undefined && isThereName[1] !== undefined) {
        list.push(isThereName[0]);
        list.push(isThereName[1]);
        _message += `${returnName(text)}(${isThereName[0]} ${
          isThereName[1]
        })에게`;
      } else {
        list.push(null);
        setTexts('이름을 찾을 수가 없어요.');
      }
    } else if (validateBankCode(text)) {
      list.push(validateBankCode(text).code);
      _message += validateBankCode(text).name;
      if (validateAccount(text)) {
        console.log(returnAccount(text));
        list.push(returnAccount(text));
        _message += ` ${returnAccount(text)}에게`;
      } else {
        list.push(null);
        setTexts('계좌를 인식하지 못했어요.\n-를 빼고 입력해보세요.');
      }
    } else {
      list.push(null);
      setTexts('은행을 인식하지 못했어요.');
    }
    if (validateMoney(text)) {
      console.log(returnMoney(text));
      list.push(returnMoney(text));
      _message += ` ${returnMoney(text)}원을 보내시겠습니까?`;
    } else {
      list.push(null);
      setTexts('금액을 인식하지 못했어요.');
    }
    console.log(list);

    setInfo(list);
    if (
      info.current[0] !== null &&
      info.current[1] !== null &&
      info.current[2] !== null
    ) {
      setTexts(_message);
      setProgress(true);
    } else {
      setProgress(false);
    }
  };

  const findAnswer = async text => {
    if (text === '네' || text === '예' || text === 'ㅇㅇ' || text === '그래') {
      setProgress(false);
      console.log(info.current[2]);
      if (info.current[2] === '020') {
        console.log('rere');
        const response = await transferWoori({
          fromAccount: information.account,
          money: info.current[2],
          toAccount: info.current[1],
          txt: '',
        });
        console.log(response);
        setStatus(response.status);
        setData(response.data);
      } else {
        const response = await transferOther({
          fromAccount: information.account,
          money: info.current[2],
          bankCode: info.current[0],
          toAccount: info.current[1],
          txt: '',
        });
        setStatus(response.status);
        setData(response.data);
        console.log(response.data);
      }

      if (status.current === 200) {
        setTexts(
          `이체를 완료하였습니다.\n계좌: ${information.account}\n예금주: ${data.current.dataBody.OWAC_FNM}\n수취인: ${data.current.dataBody.RNPE_FNM}\n잔액: ${data.current.dataBody.BFTR_AF_BAL}\n수수료금액: ${data.current.dataBody.FEE_Am}`
        );
      } else {
        setTexts(`${status.current}\n이체에 실패했습니다.`);
      }
    } else {
      setProgress(false);
      setTexts('이체를 취소합니다.');
    }
  };

  const _handleMessageSend = async messageList => {
    const newMessage = messageList[0];
    try {
      spinner.start();
      await createMessage({ message: newMessage });
      if (!progress.current) {
        await findAccount(newMessage.text);
        await createMessage({ message: bot(texts.current) });
      } else {
        await findAnswer(newMessage.text);
        await createMessage({ message: bot(texts.current) });
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

const findAccount = text => {
  const list = [];
  setInfo([]);
  if (validateMoney(text)) {
    console.log(returnMoney(text));
    list.push(returnMoney(text));
  } else {
    list.push(null);
    setTexts('금액을 인식하지 못했어요.');
  }
  if (validateAccount(text)) {
    console.log(returnAccount(text));
    list.push(returnAccount(text));
  } else {
    list.push(null);
    setTexts('계좌를 인식하지 못했어요.\n-를 빼고 입력해보세요.');
  }
  if (validateBankCode(text)) {
    list.push(validateBankCode(text).code);
    list.push(validateBankCode(text).name);
  } else {
    list.push(null);
    setTexts('은행을 인식하지 못했어요.');
  }
  setInfo(list);
  if (
    info.current[0] !== null &&
    info.current[1] !== null &&
    info.current[2] !== null
  ) {
    setTexts(
      `${info.current[3]} ${info.current[1]}에게 ${info.current[0]}원을 송금하겠습니까?`
    );
    setProgress(true);
  } else {
    setProgress(false);
  }
};

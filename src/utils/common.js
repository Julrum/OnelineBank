import { bankCode } from '../utils/woori';

export const validateEmail = email => {
  const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
  return regex.test(email);
};

export const validateAccount = account => {
  const regex = /\d{11,14}/;
  return regex.test(account);
};

export const returnAccount = account => {
  const regex = /\d{11,14}/;
  return account.match(regex)[0];
};

export const validateMoney = money => {
  const regex = /\d+(?=원)/;
  return regex.test(money);
};

export const returnMoney = money => {
  const regex = /\d+(?=원)/;
  return money.match(regex)[0];
};

export const validateName = name => {
  const regex = /[가-힣]+(?=에게)/;
  return regex.test(name);
};
export const returnName = name => {
  const regex = /[가-힣]+(?=에게)/;
  return name.match(regex)[0];
};

export const validateBankCode = code => {
  const list = [];
  bankCode.forEach(item => {
    if (removeWhitespace(code).match(item.name)) {
      list.push(item);
    }
  });
  return list[0] && list[0];
};

export const removeWhitespace = text => {
  const regex = /\s/g;
  return text.replace(regex, '');
};

export const makeId = length => {
  const result = [];
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join('');
};

export const particle = ['/[가-힣]+(?=에게)/', '/[가-힣]+(?=한테)/'];

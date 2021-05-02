import axios from 'axios';

const apiKey = 'l7xxcD4QVD4iKSerVX01i3fuh4CyK7zQ0rDs';
const apiUrl = 'https://openapi.wooribank.com:444';

export const transferWoori = async ({ fromAccount, money, toAccount, txt }) => {
  try {
    const headers = {
      appKey: apiKey,
    };
    const response = await axios.post(
      `${apiUrl}/oai/wb/v1/trans/executeWooriAcctToWooriAcct`,
      {
        dataHeader: {
          UTZPE_CNCT_IPAD: '10.0.0.1',
          UTZPE_CNCT_MCHR_UNQ_ID: '3B5E6E7B',
          UTZPE_CNCT_TEL_NO_TXT: '',
          UTZPE_CNCT_MCHR_IDF_SRNO: '',
          UTZ_MCHR_OS_DSCD: '',
          UTZ_MCHR_OS_VER_NM: '',
          UTZ_MCHR_MDL_NM: '',
          UTZ_MCHR_APP_VER_NM: '',
        },
        dataBody: {
          WDR_ACNO: fromAccount,
          TRN_AM: money,
          RCV_BKCD: '002',
          RCV_ACNO: toAccount,
          PTN_PBOK_PRNG_TXT: txt,
        },
      },
      { headers: headers }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const transferOther = async ({
  fromAccount,
  money,
  bankCode,
  toAccount,
  txt,
}) => {
  try {
    const headers = {
      appKey: apiKey,
    };
    const response = await axios.post(
      `${apiUrl}/oai/wb/v1/trans/executeWooriAcctToWooriAcct`,
      {
        dataHeader: {
          UTZPE_CNCT_IPAD: '10.0.0.1',
          UTZPE_CNCT_MCHR_UNQ_ID: '3B5E6E7B',
          UTZPE_CNCT_TEL_NO_TXT: '',
          UTZPE_CNCT_MCHR_IDF_SRNO: '',
          UTZ_MCHR_OS_DSCD: '',
          UTZ_MCHR_OS_VER_NM: '',
          UTZ_MCHR_MDL_NM: '',
          UTZ_MCHR_APP_VER_NM: '',
        },
        dataBody: {
          WDR_ACNO: fromAccount,
          TRN_AM: money,
          RCV_BKCD: bankCode,
          RCV_ACNO: toAccount,
          PTN_PBOK_PRNG_TXT: txt,
        },
      },
      { headers: headers }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const bankCode = [
  {
    name: '산업',
    code: '002',
  },
  {
    name: 'KDB산업',
    code: '002',
  },
  {
    name: '기업',
    code: '003',
  },
  {
    name: 'IBK기업',
    code: '003',
  },
  {
    name: '국민',
    code: '004',
  },
  {
    name: 'KB국민',
    code: '004',
  },
  {
    name: '하나',
    code: '005',
  },
  {
    name: 'KEB하나',
    code: '005',
  },
  {
    name: '수협',
    code: '007',
  },
  {
    name: '농협',
    code: '011',
  },
  {
    name: 'NH농협',
    code: '011',
  },
  {
    name: '농협중앙회',
    code: '012',
  },
  {
    name: '우리',
    code: '020',
  },
  {
    name: '제일',
    code: '023',
  },
  {
    name: 'SC제일',
    code: '023',
  },
  {
    name: '한국씨티',
    code: '027',
  },
  {
    name: '씨티',
    code: '027',
  },
  {
    name: '대구',
    code: '031',
  },
  {
    name: '부산',
    code: '032',
  },
  {
    name: '광주',
    code: '034',
  },
  {
    name: '제주',
    code: '035',
  },
  {
    name: '전북',
    code: '037',
  },
  {
    name: '경남',
    code: '039',
  },
  {
    name: '새마을금고',
    code: '045',
  },
  {
    name: '새마을',
    code: '045',
  },
  {
    name: '신협중앙회',
    code: '048',
  },
  {
    name: '신협',
    code: '048',
  },
  {
    name: '상호저축',
    code: '050',
  },
  {
    name: 'HSBC',
    code: '054',
  },
  {
    name: '도이치',
    code: '055',
  },
  {
    name: '제이피모간체이스',
    code: '057',
  },
  {
    name: 'JP모간',
    code: '057',
  },
  {
    name: 'BOA',
    code: '060',
  },
  {
    name: '비엔피파리바',
    code: '061',
  },
  {
    name: '중국공상',
    code: '062',
  },
  {
    name: '산림조합중앙회',
    code: '061',
  },
  {
    name: '산림조합',
    code: '064',
  },
  {
    name: '지식경제부우체국',
    code: '071',
  },
  {
    name: '우체국',
    code: '071',
  },
  {
    name: '신한',
    code: '088',
  },
  {
    name: 'K뱅크',
    code: '089',
  },
  {
    name: '카카오뱅크',
    code: '090',
  },
  {
    name: '유안타증권',
    code: '209',
  },
  {
    name: 'KB증권',
    code: '218',
  },
  {
    name: '미래에셋증권',
    code: '230',
  },
  {
    name: '미래에셋대우',
    code: '238',
  },
  {
    name: '삼성증권',
    code: '240',
  },
  {
    name: '한국투자증권',
    code: '243',
  },
  {
    name: 'NH투자증권',
    code: '247',
  },
  {
    name: '교보증권',
    code: '261',
  },
  {
    name: '하이투자증권',
    code: '262',
  },
  {
    name: '현대차투자증권',
    code: '263',
  },
  {
    name: '키움증권',
    code: '264',
  },
  {
    name: '이베스트투자증권',
    code: '265',
  },
  {
    name: 'SK증권',
    code: '266',
  },
  {
    name: '대신증권',
    code: '267',
  },
  {
    name: '한화투자증권',
    code: '269',
  },
  {
    name: '하나금융투자',
    code: '270',
  },
  {
    name: '신한금융투자',
    code: '278',
  },
  {
    name: 'DB금융투자',
    code: '279',
  },
  {
    name: '유진투자증권',
    code: '280',
  },
  {
    name: '메리츠종합금융증권',
    code: '287',
  },
  {
    name: '부국증권',
    code: '290',
  },
  {
    name: '신영증권',
    code: '291',
  },
  {
    name: '케이프투자증권',
    code: '292',
  },
  {
    name: '한국포스증권',
    code: '294',
  },
];

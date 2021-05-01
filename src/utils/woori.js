import getEnvVars from '../../environment';
import axios from 'axios';

const { apiKey, apiUrl } = getEnvVars();

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
    name: '하나',
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
];

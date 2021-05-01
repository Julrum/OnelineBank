import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { DB, getCurrentUser } from '../utils/firebase';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;
const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 15px 20px;
`;
const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
const ItemName = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;
const ItemAccount = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listTime};
`;
const accounts = [];
for (let idx = 0; idx < 1000; idx++) {
  accounts.push({
    id: idx,
    name: `name ${idx}`,
    bank: `bank ${idx}`,
    account: `account ${idx}`,
  });
}

const Item = React.memo(({ item: { name, bank, account } }) => {
  return (
    <ItemContainer>
      <ItemTextContainer>
        <ItemName>{name}</ItemName>
        <ItemAccount>{`${bank} ${account}`}</ItemAccount>
      </ItemTextContainer>
    </ItemContainer>
  );
});

const AccountList = ({ navigation }) => {
  const [accounts, setAccounts] = useState([]);
  const { uid } = getCurrentUser();

  useEffect(() => {
    const unsubscirbe = DB.collection('accounts')
      .orderBy('name', 'asc')
      .onSnapshot(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
          if (doc.data().uid === uid) {
            list.push(doc.data());
          }
        });
        setAccounts(list);
      });
    return () => unsubscirbe();
  }, []);

  return (
    <Container>
      <FlatList
        keyExtractor={item => item['id']}
        data={accounts}
        renderItem={({ item }) => <Item item={item} />}
        windowSize={3}
      />
    </Container>
  );
};

export default AccountList;

import React, { useContext } from 'react';
import { Platform, Text } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import {
  Bubble,
  GiftedChat,
  Send,
  InputToolbar,
  Composer,
} from 'react-native-gifted-chat';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { getCurrentUser } from '../utils/firebase';

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
        width: 34,
        height: 34,
        backgroundColor: props.text
          ? theme.sendButtonBG
          : theme.sendButtonBGInactivate,
        borderRadius: 30,
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
      renderUsernameOnMessage={false}
      wrapperStyle={{
        left: {
          borderColor: theme.botBubbleBorder,
          backgroundColor: theme.botBubbleBG,
          borderWidth: 2,
          borderTopLeftRadius: 0,
        },
        right: {
          backgroundColor: theme.bubbleBG,
          borderBottomRightRadius: 0,
        },
      }}
    />
  );
};

const RenderComposer = props => {
  const theme = useContext(ThemeContext);
  return (
    <Composer
      {...props}
      multiline={true}
      placeholder=""
      textInputStyle={{
        borderWidth: 1,
        borderRadius: 20,
        borderColor: theme.inputBorderColor,
        paddingTop: 8.5,
        paddingHorizontal: 12,
        marginLeft: 10,
        marginRight: 10,
      }}
    />
  );
};

const Chat = ({ messages, _handleMessageSend }) => {
  const theme = useContext(ThemeContext);
  const { uid, name, photoUrl } = getCurrentUser();
  const DEFAULT_TABBAR_HEIGHT = Platform.OS === 'ios' ? 43 : 0;

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
        renderComposer={props => <RenderComposer {...props} />}
        scrollToBottom={true}
        renderSend={props => <SendButton {...props} />}
        bottomOffset={DEFAULT_TABBAR_HEIGHT + getBottomSpace()}
        renderAvatar={null}
        parsePatterns={linkStyle => [
          {
            pattern: /[가-힣]+(?=에게)/,
            style: linkStyle,
            onPress: tag => console.log(`Pressed on name: ${tag}`),
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

export default Chat;

Chat.propTypes = {
  messages: PropTypes.array,
  _handleMessageSend: PropTypes.func,
};

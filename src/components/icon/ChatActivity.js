import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';

function ChatActivity(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={26}
      viewBox="0 0 26 26"
      {...props}
    >
      <Defs>
        <ClipPath id="prefix__a">
          <Path d="M0 0h26v26H0z" />
        </ClipPath>
      </Defs>
      <G data-name="chat_activity \u2013 1" clipPath="url(#prefix__a)">
        <G filter="url(#prefix__b)">
          <Path
            data-name="\uC0AC\uAC01\uD615 7"
            d="M26 22H9a9 9 0 01-9-9 9 9 0 019-9h8a9 9 0 019 9v9z"
            fill="#1277cb"
          />
        </G>
      </G>
    </Svg>
  );
}

export default ChatActivity;

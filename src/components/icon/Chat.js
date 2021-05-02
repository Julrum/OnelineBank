import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';

function Chat(props) {
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
      <G data-name="chat \u2013 1" clipPath="url(#prefix__a)">
        <Path fill="#fff" d="M0 0h26v26H0z" />
        <G filter="url(#prefix__b)">
          <G data-name="\uC0AC\uAC01\uD615 7" fill="none" stroke="#bcc3c7">
            <Path
              d="M26 22H9a9 9 0 01-9-9 9 9 0 019-9h8a9 9 0 019 9v9z"
              stroke="none"
            />
            <Path d="M25.467 21.5H9A8.5 8.5 0 01.5 13h0A8.5 8.5 0 019 4.5h8a8.5 8.5 0 018.5 8.5v8.467a.033.033 0 01-.033.033z" />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default Chat;

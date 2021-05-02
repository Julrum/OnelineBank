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
      <G className="prefix__cls-1" clipPath="url(#prefix__a)">
        <Path className="prefix__cls-5" fill="#fff" d="M0 0h26v26H0z" />
        <G className="prefix__cls-6" filter="url(#prefix__b)">
          <G
            data-name="\uC0AC\uAC01\uD615 7"
            className="prefix__cls-2"
            fill="none"
            stroke="#bcc3c7"
          >
            <Path
              className="prefix__cls-3"
              d="M26 17H4.5A4.5 4.5 0 010 12.5 4.5 4.5 0 014.5 8h17a4.5 4.5 0 014.5 4.5V17z"
              stroke="none"
            />
            <Path
              className="prefix__cls-4"
              d="M25.484 16.5H4.5a4 4 0 01-4-4h0a4 4 0 014-4h17a4 4 0 014 4v3.984a.016.016 0 01-.016.016z"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default Chat;

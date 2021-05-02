import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G, Circle } from 'react-native-svg';

function Profiles(props) {
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
        <Path className="prefix__cls-7" fill="#fff" d="M0 0h26v26H0z" />
        <G
          data-name="\uD0C0\uC6D0 1"
          className="prefix__cls-2"
          transform="translate(9 3.843)"
          fill="none"
          stroke="#bcc3c7"
        >
          <Circle className="prefix__cls-4" cx={4} cy={4} r={4} stroke="none" />
          <Circle className="prefix__cls-5" cx={4} cy={4} r={3.5} />
        </G>
        <G data-name="\uD328\uC2A4 3" className="prefix__cls-3" fill="#fff">
          <Path
            className="prefix__cls-4"
            d="M13 21.657c-2.009 0-3.95-.291-5.327-.798-.991-.365-2.173-1.01-2.173-2.016 0-4.136 3.364-7.5 7.5-7.5s7.5 3.364 7.5 7.5c0 1.005-1.182 1.651-2.173 2.016-1.377.507-3.318.798-5.327.798z"
          />
          <Path
            className="prefix__cls-6"
            d="M13 11.843c-3.86 0-7 3.14-7 7 0 .783 1.29 1.343 1.846 1.547 1.323.487 3.202.767 5.154.767 4.187 0 7-1.197 7-2.314 0-3.86-3.14-7-7-7m0-1a8 8 0 018 8c0 2.21-4 3.314-8 3.314s-8-1.105-8-3.314a8 8 0 018-8z"
            fill="#bcc3c7"
          />
        </G>
      </G>
    </Svg>
  );
}

export default Profiles;

import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G, Rect, Circle } from 'react-native-svg';

function Account(props) {
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
      <G clipPath="url(#prefix__a)">
        <Path fill="#fff" d="M0 0h26v26H0z" />
        <G
          data-name="\uC0AC\uAC01\uD615 11"
          transform="translate(0 4)"
          fill="none"
          stroke="#bcc3c7"
        >
          <Rect width={26} height={18} rx={4} stroke="none" />
          <Rect x={0.5} y={0.5} width={25} height={17} rx={3.5} />
        </G>
        <Path data-name="\uC120 1" fill="none" stroke="#bcc3c7" d="M0 8.5h26" />
        <Path
          data-name="\uC120 2"
          fill="none"
          stroke="#bcc3c7"
          d="M5.5 10.5v4"
        />
        <Path
          data-name="\uC120 4"
          fill="none"
          stroke="#bcc3c7"
          d="M2.5 10.5v4"
        />
        <Path
          data-name="\uC120 5"
          fill="none"
          stroke="#bcc3c7"
          d="M3.5 10.5v4"
        />
        <Path
          data-name="\uC120 6"
          fill="none"
          stroke="#bcc3c7"
          d="M7.5 10.5v4"
        />
        <Path
          data-name="\uC120 7"
          fill="none"
          stroke="#bcc3c7"
          d="M8.5 10.5v4"
        />
        <Path
          data-name="\uC120 8"
          fill="none"
          stroke="#bcc3c7"
          d="M10.5 10.5v4"
        />
        <Path
          data-name="\uC120 9"
          fill="none"
          stroke="#bcc3c7"
          d="M11.5 10.5v4"
        />
        <Path
          data-name="\uC120 10"
          fill="none"
          stroke="#bcc3c7"
          d="M13.5 10.5v4"
        />
        <G
          data-name="\uD0C0\uC6D0 1"
          transform="translate(17 11)"
          fill="none"
          stroke="#bcc3c7"
        >
          <Circle cx={2} cy={2} r={2} stroke="none" />
          <Circle cx={2} cy={2} r={1.5} />
        </G>
        <G data-name="\uD328\uC2A4 2" fill="none">
          <Path d="M19 14a4 4 0 014 4c0 2.209-8 2.209-8 0a4 4 0 014-4z" />
          <Path
            d="M19 15a3.003 3.003 0 00-3 2.968c.16.217 1.186.689 3 .689s2.84-.472 3-.69A3.003 3.003 0 0019 15m0-1a4 4 0 014 4c0 1.105-2 1.657-4 1.657s-4-.552-4-1.657a4 4 0 014-4z"
            fill="#bcc3c7"
          />
        </G>
      </G>
    </Svg>
  );
}

export default Account;

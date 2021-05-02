import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G, Circle } from 'react-native-svg';

function ProfileActivity(props) {
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
        <Circle
          data-name="\uD0C0\uC6D0 1"
          cx={4}
          cy={4}
          r={4}
          transform="translate(9 3.843)"
          fill="#1277cb"
        />
        <Path
          data-name="\uD328\uC2A4 3"
          d="M13 10.843a8 8 0 018 8c0 4.418-16 4.418-16 0a8 8 0 018-8z"
          fill="#1277cb"
        />
      </G>
    </Svg>
  );
}

export default ProfileActivity;

import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import colors from '@consts/colors';
import {IconProps} from './types';

const FavoriteActive: React.FC<IconProps> = ({size}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill={colors.gray}
      stroke={colors.gray}>
      <G id="SVGRepo_bgCarrier" stroke-width="0" />

      <G
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <G id="SVGRepo_iconCarrier">
        <G id="Bookmark">
          <Path
            fill={colors.appBackground}
            d="M25,6.12V27.37a.64.64,0,0,1-.29.55.56.56,0,0,1-.27.08.63.63,0,0,1-.32-.1L20.5,25.21V3h1.69A3,3,0,0,1,25,6.12Z"
          />
          <Path d="M22.19,3H9.81A3,3,0,0,0,7,6.12V27.37a.64.64,0,0,0,.29.55.53.53,0,0,0,.59,0l8.12-6,4.5,3.34,3.62,2.69a.63.63,0,0,0,.32.1.56.56,0,0,0,.27-.08.64.64,0,0,0,.29-.55V6.12A3,3,0,0,0,22.19,3Zm1.69,23.21-3.38-2.5L16.32,20.6a.56.56,0,0,0-.64,0L8.13,26.21V6.12A1.78,1.78,0,0,1,9.81,4.25H22.19a1.79,1.79,0,0,1,1.69,1.87Z" />
        </G>
      </G>
    </Svg>
  );
};

export default FavoriteActive;

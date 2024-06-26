import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconProps} from './types';

const ArrowBack: React.FC<IconProps> = ({size, color}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024">
      <Path
        fill={color}
        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
      />
      <Path
        fill={color}
        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
      />
    </Svg>
  );
};

export default ArrowBack;

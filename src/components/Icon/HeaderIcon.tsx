import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
import colors from '@consts/colors';

const HeaderIcon: React.FC<IconProps> = ({ size = 18 }) => {
  return (
    <Svg
      height={size}
      viewBox="4 4 188 188" 
      width={size}
    >
      <Path d="m4 4h188v188h-188z" fill={colors.appBackground}/>
      <Path
        d="m73.2521756 45.01 22.7478244 47.39130083 22.7478244-47.39130083h19.56569631l-34.32352071 64.48661468v41.49338532h-15.98v-41.49338532l-34.32352071-64.48661468z"
        fill={colors.white}
      />
    </Svg>
  );
};

export default HeaderIcon;
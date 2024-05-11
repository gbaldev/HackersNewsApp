import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Favorite from './Favorite';
import FavoriteActive from './FavoriteActive';
import HeaderIcon from './HeaderIcon';
import ArrowBack from './ArrowBack';
import Trash from './Trash';
import Configuration from './Configuration';

export const IconMap = {
  favorite: Favorite,
  favoriteActive: FavoriteActive,
  headerIcon: HeaderIcon,
  arrowBack: ArrowBack,
  trash: Trash,
  configuration: Configuration,
};

interface Props {
  style?: StyleProp<ViewStyle>;
  name: keyof typeof IconMap;
  size?: number;
  focused?: boolean;
  color?: string;
  horizontal?: boolean;
}

const Icon: React.FC<Props> = ({
  style,
  name,
  size = 24,
  focused = true,
  color = '#000',
  ...props
}) => {
  const IconComponent = IconMap[name];

  return (
    <IconComponent
      style={style}
      size={size}
      focused={focused}
      color={color}
      {...props}
    />
  );
};

export default Icon;

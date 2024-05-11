import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {DELETED, FAVORITE, FILTERS} from '@screens/HomeScreen';
import {LocalizationManager as i} from '@utils/Localization/LocalizationManager';
import Icon from '@components/Icon';
import styles from './styles';

type HeaderComponentProps = {
  onFilterChange?: (filter: FILTERS) => void;
};

const Header: React.ComponentType<HeaderComponentProps> = ({
  onFilterChange,
}) => {
  const [currentFilter, setCurrentFilter] = useState<FILTERS>(null);
  const handleFilterChange = (newFilter: any) => {
    onFilterChange?.(newFilter);
    setCurrentFilter(newFilter);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.innerContainerLeft}>
        <View style={styles.iconContainer}>
          <Icon name={'headerIcon'} size={16} />
        </View>
        <Text style={styles.hackerNewsTitle}>
          {i.strings('components.header.hackersNews')}
        </Text>
      </View>
      {onFilterChange && (
        <View style={styles.innerContainerRight}>
          <TouchableOpacity onPress={() => handleFilterChange(null)}>
            <Text
              style={[
                styles.sectionName,
                currentFilter === null && styles.isSelected,
              ]}>
              {i.strings('components.header.allNews')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange(FAVORITE)}>
            <Text
              style={[
                styles.sectionName,
                currentFilter === FAVORITE && styles.isSelected,
              ]}>
              {i.strings('components.header.favorites')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange(DELETED)}>
            <Text
              style={[
                styles.sectionName,
                currentFilter === DELETED && styles.isSelected,
              ]}>
              {i.strings('components.header.deleted')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View />
    </View>
  );
};

export default Header;

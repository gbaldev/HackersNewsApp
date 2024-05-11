/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Article} from '@models/Article';
import StackRoutes, {RootStackNavigationProp} from '@navigation/routes';
import ScreenContainer from '@components/ScreenContainer';
import ArticleCard from '@components/ArticleCard';
import Header from '@components/Header';
import colors from '@consts/colors';
import Icon from '@components/Icon';
import styles from './styles';

export const FAVORITE = 'FAVORITE';
export const DELETED = 'DELETED';
export type FILTERS = null | 'FAVORITE' | 'DELETED';

interface HomeScreenProps {
  articles: Article[];
  favorites: Article[];
  deleted: Article[];
  onFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const HomeScreen: React.ComponentType<HomeScreenProps> = ({
  articles,
  favorites,
  deleted,
  onFavorite,
  onRefresh,
  onDelete,
  isLoading,
}) => {
  const [filter, setFilter] = useState<FILTERS>(null);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const navigation = useNavigation<RootStackNavigationProp<StackRoutes>>();

  const dataToDisplay = useMemo(() => {
    if (filter === FAVORITE) {
      return favorites;
    } else if (filter === DELETED) {
      return deleted;
    }
    return articles;
  }, [articles, deleted, favorites, filter, onDelete, onRefresh, onFavorite]);

  return (
    <ScreenContainer
      style={styles.screenContainer}
      safeAreaViewBackgroundColor={colors.appBackground}>
      <Header onFilterChange={setFilter} />
      {dataToDisplay.length > 0 ? (
        <FlatList
          data={dataToDisplay}
          renderItem={({item}) => (
            <ArticleCard
              article={item}
              onFavorite={onFavorite}
              onDelete={onDelete}
              disableScroll={() => setScrollEnabled(false)}
              enableScroll={() => setScrollEnabled(true)}
              key={item.objectID}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          style={styles.flatList}
          onRefresh={onRefresh}
          refreshing={isLoading}
          scrollEnabled={scrollEnabled}
        />
      ) : (
        <View style={styles.emptyDataContainer}>
          <Text style={styles.emptyDataText}>
            {' '}
            Oops, you don't have any
            {`${filter ? ' ' + filter.toLowerCase() : ''}`} article yet to
            display!
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.settingsIconContainer}
        onPress={() => navigation.navigate(StackRoutes.SETTINGS)}>
        <Icon name="configuration" color={colors.white} size={20} />
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export default HomeScreen;

import React from 'react';
import {HomeScreen as HomeScreenUI} from '@screens/HomeScreen';
import {useArticles} from '@contexts/Articles/context';

export interface HomeScreenContainerProps {}

export const HomeScreenContainer: React.FC<HomeScreenContainerProps> = () => {
  const {
    articles,
    favorites,
    deleted,
    onFavorite,
    onRefresh,
    onDelete,
    isLoading,
  } = useArticles();

  return (
    <HomeScreenUI
      articles={articles}
      onFavorite={onFavorite}
      favorites={favorites}
      deleted={deleted}
      onRefresh={onRefresh}
      isLoading={isLoading}
      onDelete={onDelete}
    />
  );
};

export default HomeScreenContainer;

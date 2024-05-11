import {createContext, useContext} from 'react';
import {Article} from '@models/Article';

export type ArticleContextType = {
  articles: Article[];
  favorites: Article[];
  deleted: Article[];
  onRefresh: () => void;
  isLoading: boolean;
  onFavorite: (id: string) => void;
  onDelete: (id: string) => void;
};

const ArticlesContext = createContext<ArticleContextType | null>(null);
ArticlesContext.displayName = 'ArticlesContext';

export const Consumer = ArticlesContext.Consumer;
export const Provider = ArticlesContext.Provider;

export const useArticles = () => {
  const context = useContext(ArticlesContext);

  if (!context) {
    throw new Error(
      'useArticlesContext must be used within a ArticlesContextProvider.',
    );
  }

  return context;
};

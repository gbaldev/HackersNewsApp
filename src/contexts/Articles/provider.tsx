import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { ArticleContextType, Provider } from './context';
import { Article } from '@models/Article';
import { ArticleResponse } from '@models/ArticleResponse';
import { Hit } from 'models/Hit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export  const fetchArticles: (interests?: { ios: boolean, android: boolean }) => Promise<ArticleResponse> = async (interests) => {
  let response;
  if (interests) {
    let queryParams = '';
    if (interests.ios && interests.android) {
      queryParams = 'ios,android';
    } else if (interests.ios) {
      queryParams = 'ios';
    } else if (interests.android) {
      queryParams = 'android';
    }
    const apiUrl = `https://hn.algolia.com/api/v1/search_by_date?query=${queryParams}`

    if (queryParams.length > 0) {
      response = await fetch(apiUrl);
    } else {
      return { hits: [] };
    }

  } else {
    response = await fetch('https://hn.algolia.com/api/v1/search_by_date?query=mobile');
  }
  
  return response.json();
};

type ArticlesProviderProps = {
  children: any
};

export const normalizeHit: (hit: Hit) => Article = (hit) => {
  return {
    author: hit.author,
    comment_text: hit.comment_text || '',
    created_at: hit.created_at,
    created_at_i: hit.created_at_i,
    objectID: hit.objectID,
    parent_id: hit.parent_id,
    story_id: hit.story_id,
    story_title: hit.story_title || hit.title || '',
    story_url: hit.story_url || hit.url || '',
    updated_at: hit.updated_at,
    isFavorite: false,
    isDeleted: false,
  }
}

export const ArticlesProvider: React.ComponentType<ArticlesProviderProps> = ({
  children,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFavorite = useCallback(async (id: string) => {
    const updatedArticles = articles.map(article => {
      if (article.objectID === id) {
        return {
          ...article,
          isFavorite: !article.isFavorite,
        }
      }
      return article;
    });
    await AsyncStorage.setItem('articles', JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
  }, [articles]);
  
  const onDelete = useCallback(async (id: string) => {
    const updatedArticles = articles.map(article => {
      if (article.objectID === id) {
        return {
          ...article,
          isDeleted: true,
        }
      }
      return article;
    });
    await AsyncStorage.setItem('articles', JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
  }, [articles]);

  const onRefresh = useCallback( async (articlesFromState?: Article[]) => {
    const _articles = articlesFromState ? articlesFromState : articles;
    setIsLoading(true);
    const fetchedArticles = await fetchArticles();
    const normalizedArticles = fetchedArticles.hits.filter(h => !!h.story_url || !!h.url).map(hit => normalizeHit(hit));
    const newArticles = [..._articles];
    for (const article of normalizedArticles) {
      const isAlreadyFetched = _articles.some(_article => article.objectID === _article.objectID);
      if (isAlreadyFetched) {
        continue;
      } else {
        newArticles.unshift(article);
      }
    }
    newArticles.sort((a, b) => {
      const dateA = Date.parse(a.created_at);
      const dateB = Date.parse(b.created_at);
      return dateB - dateA;
    })
    setArticles(newArticles);
    await AsyncStorage.setItem('articles', JSON.stringify(newArticles));
    await AsyncStorage.setItem('lastCreatedArticle', newArticles[0].created_at);
    setIsLoading(false);
  }, [articles]);

  const favorites = useMemo(() => articles.filter(article => article.isFavorite && !article.isDeleted), [articles]);
  const deleted = useMemo(() => articles.filter(article => article.isDeleted), [articles]);


  useEffect(() => {
    const initialLoading = async () => {
      const previousState = await AsyncStorage.getItem('articles');
      if (previousState) {
        try {
          onRefresh(JSON.parse(previousState));
          return;
        } catch (e) {
          return;
        }
      }
      setIsLoading(true);
      const fetchedArticles = await fetchArticles();
      const normalizedArticles = fetchedArticles.hits.filter(h => !!h.story_url || !!h.url).map(hit => normalizeHit(hit));
      normalizedArticles.sort((a, b) => {
        const dateA = Date.parse(a.created_at);
        const dateB = Date.parse(b.created_at);
        return dateB - dateA;
      })
      setArticles(normalizedArticles);
      await AsyncStorage.setItem('articles', JSON.stringify(normalizedArticles));
      await AsyncStorage.setItem('lastCreatedArticle', normalizedArticles[0].created_at);
      setIsLoading(false);
    }
    initialLoading();
  }, []);  

  const contextValue = useMemo<ArticleContextType>(
    () => ({
      articles: articles.filter(a => !a.isDeleted),
      onFavorite,
      favorites,
      deleted,
      onRefresh,
      onDelete,
      isLoading,
    }),
    [
      articles,
      onFavorite,
      favorites,
      deleted,
      onRefresh,
      onDelete,
      isLoading,
    ]
  );

  return <Provider value={contextValue}>{children}</Provider>
}

export default ArticlesProvider;

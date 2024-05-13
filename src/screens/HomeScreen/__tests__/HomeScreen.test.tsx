import {render} from '@testing-library/react-native';
import React from 'react';
import HomeScreen from '../';

const article = {
  author: 'Author',
  comment_text: 'Comment text',
  created_at: '2024-05-11T07:53:56Z',
  created_at_i: 1715414036,
  isDeleted: false,
  isFavorite: false,
  objectID: '40326694',
  parent_id: 40316681,
  story_id: 40316681,
  story_title: 'Title',
  story_url: 'https://www.google.com',
  updated_at: '2024-05-11T09:17:57Z',
};

jest.mock('../../../components/Header/index.tsx', () => {
  const MockHeader: React.FC = ({children}) => (
    <header data-testid="mock-header">{children}</header>
  );
  return MockHeader;
});

describe('Testing HomeScreen', () => {
  it('If there are no available articles, a disclaimer is shown', async () => {
    const {findByTestId} = render(
      <HomeScreen
        articles={[]}
        favorites={[]}
        deleted={[]}
        onFavorite={jest.fn()}
        onDelete={jest.fn()}
        onRefresh={jest.fn()}
        isLoading={false}
      />,
    );

    const emptyComponent = await findByTestId(`empty-component`);

    expect(emptyComponent).toBeTruthy();
  });

  it('If there are available articles, a list is displayed', async () => {
    const {findByTestId} = render(
      <HomeScreen
        articles={[article]}
        favorites={[]}
        deleted={[]}
        onFavorite={jest.fn()}
        onDelete={jest.fn()}
        onRefresh={jest.fn()}
        isLoading={false}
      />,
    );

    const articleList = await findByTestId(`article-list`);

    expect(articleList).toBeTruthy();
  });
});

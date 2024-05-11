export interface Hit {
  _highlightResult: {
    author: {
      matchLevel: string;
      matchedWords: [];
      value: string;
    };
    comment_text: {
      fullyHighlighted: string;
      matchLevel: string;
      matchedWords: string[];
      value: string;
    };
    story_title: {
      matchLevel: string;
      matchedWords: string[];
      value: string;
    };
    story_url: {
      matchLevel: string;
      matchedWords: string[];
      value: string;
    };
  };
  _tags: string[];
  author: string;
  comment_text: string;
  created_at: string;
  created_at_i: number;
  objectID: string;
  parent_id: number;
  story_id: number;
  story_title: string;
  story_url: string;
  updated_at: string;
  title?: string;
  url?: string;
}

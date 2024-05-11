import {Hit} from './Hit';

export interface ArticleResponse {
  exhaustive: {
    nbHits: boolean;
    typo: boolean;
  };
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  hits: Hit[];
  hitsPerPage: number;
  nbHits: number;
  nbPages: number;
  page: number;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: {
    _request: {
      roundTrip: number;
    };
    afterFetch: {
      format: {
        highlighting: number;
        total: number;
      };
    };
    fetch: {
      query: number;
      total: number;
    };
    total: number;
  };
  query: string;
  serverTimeMS: number;
}

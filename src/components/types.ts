
export interface Word {
  text: string;
  status: 'known' | 'learning';
  definition?: any;
}

export interface Book {
  title: string;
  content: string;
}

export type Vocabulary = {
  [language: string]: Word[];
};

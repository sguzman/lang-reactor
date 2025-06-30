
export interface Word {
  text: string;
  status: 'known' | 'learning';
  definition?: string;
}

export interface Book {
  title: string;
  content: string;
}

export type Vocabulary = {
  [language: string]: Word[];
};

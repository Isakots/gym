export interface IArticle {
  id?: number;
  title?: string;
  type?: string;
  introduction?: string;
  mainText?: string;
}

export class Article implements IArticle {
  constructor(public id?: number, public title?: string, public type?: string, public introduction?: string, public mainText?: string) {}
}

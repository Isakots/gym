export interface IArticle {
  id?: string;
  title?: string;
  type?: string;
  introduction?: string;
  mainText?: string;
  createdDate?: string;
}

export class Article implements IArticle {
  constructor(public id?: string, public title?: string, public type?: string, public introduction?: string, public mainText?: string) {}
}

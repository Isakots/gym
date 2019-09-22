export interface IArticle {
  id?: number;
  title?: string;
  type?: string;
  text?: string;
}

export class Article implements IArticle {
  constructor(public id?: number, public title?: string, public type?: string, public text?: string) {}
}

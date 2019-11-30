import { ArticleType } from 'app/shared/enums/article-type.enum';

export interface IArticle {
  id?: string;
  title?: string;
  type?: ArticleType;
  introduction?: string;
  content?: string;
  createdDate?: string;
}

export class Article implements IArticle {
  constructor(
    public id?: string,
    public title?: string,
    public type?: ArticleType,
    public introduction?: string,
    public content?: string
  ) {}
}

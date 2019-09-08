export interface ITool {
  id?: number;
  name?: string;
  quantity?: number;
}

export class Tool implements ITool {
  constructor(public id?: number, public name?: string, public quantity?: number) {}
}

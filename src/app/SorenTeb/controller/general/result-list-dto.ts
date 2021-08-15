export class ResultListDto <T>{
  [x: string]: any;
  totalRows: number;
  maxPageRows: number;
  results: T;
}

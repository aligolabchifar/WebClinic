import {ServerError} from './server-error';

export class ResultObject<T> {
  serverErrors: Array<ServerError>;
  result: T;
}

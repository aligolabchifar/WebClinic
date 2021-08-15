import {BaseUserParaclinicChildModelDto} from './base-user-paraclinic-child-model-dto';

export class BaseUserModelDto {
  id: number;

  userName: string;

  password: string;
  rePassword: string;

  firstName: string;
  lastName: string;
  fullUserName: string;
  nationalNumber: string;
  phoneNumber: string;
  mobileNumber: string;
  createDate: string;
  createTime: string;
  expireDate: string;
  expireTime: string;
  isDisabled: boolean;
  isDisabledDesc: string;
  roleId: number;
  roleDesc: string;
  idNumber: string;
  token: string;
  mustChangePassword: boolean;
  baseUserParaclinicChildModel: [BaseUserParaclinicChildModelDto];
}

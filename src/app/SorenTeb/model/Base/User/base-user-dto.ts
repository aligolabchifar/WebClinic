import {BaseUserRoleDto} from './base-user-role-dto';


export class BaseUserDto {
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
//  ICollection<BaseUserRoleDto> BaseUserRole
  BaseUserRole: [BaseUserRoleDto];

}


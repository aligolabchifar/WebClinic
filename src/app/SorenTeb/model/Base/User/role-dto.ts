import {BaseUserRoleDto} from './base-user-role-dto';

export class RoleDto {
  id: number;
  roleName: string;
  roleDesc: string;
  BaseUserRole: [BaseUserRoleDto];
}

export interface TSingleUser {
  emailAddresses: {
    id: string;
    emailAddress: string;
    verificationStatus: string | undefined;
  }[];
  firstName: string | null;
  fullName: string | null;
  id: string;
  lastName: string | null;
  primaryEmailAddressId: string | null;
  username: string | null;
}

export interface TRoleWithPermissions {
  permissions: Array<{
    permissionKey: string | null;
    permissionName: string | null;
  }>;
  recordId: number;
  roleKey: string;
  roleName: string | null;
}

export type TRoleListResponse =
  | { success: true; roleList: TRoleWithPermissions[] }
  | { success: false; error: Error };

export interface TPermissionType {
  permissionKey: string;
  permissionName: string | null;
  recordId: number;
}

export type TPermissionListResponse =
  | { success: true; permissionList: TPermissionType[] }
  | { success: false; error: Error };

export interface TUpdateRolesParams {
  data: { roles: string[] };
  userId: string;
  userRolesResponse: (string | undefined)[];
}

export interface TUpdatePermissionsParams {
  data: { permissions: string[] };
  extraPermissionsResponse: (string | undefined)[];
  userId: string;
}

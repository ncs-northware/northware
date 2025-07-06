export type TSingleUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  username: string | null;
  emailAddresses: {
    id: string;
    emailAddress: string;
    verificationStatus: string | undefined;
  }[];
  primaryEmailAddressId: string | null;
};

export type TRoleWithPermissions = {
  recordId: number;
  roleKey: string;
  roleName: string | null;
  permissions: Array<{
    permissionKey: string | null;
    permissionName: string | null;
  }>;
};

export type TRoleListResponse =
  | { success: true; roleList: TRoleWithPermissions[] }
  | { success: false; error: Error };

export type TPermissionType = {
  recordId: number;
  permissionKey: string;
  permissionName: string | null;
};

export type TPermissionListResponse =
  | { success: true; permissionList: TPermissionType[] }
  | { success: false; error: Error };

export type TUpdateRolesParams = {
  data: { roles: string[] };
  userRolesResponse: (string | undefined)[];
  userId: string;
};

export type TUpdatePermissionsParams = {
  data: { permissions: string[] };
  extraPermissionsResponse: (string | undefined)[];
  userId: string;
};

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
  permissionKey: string;
  permissionName: string | null;
};

export type TPermissionListResponse =
  | { success: true; permissionList: TPermissionType[] }
  | { success: false; error: Error };

export type TUpdateRolesParams = {
  data: { [x: string]: boolean | undefined };
  userRolesResponse: (string | null)[];
  userId: string;
};

export type TUpdatePermissionsParams = {
  data: { [x: string]: boolean | undefined };
  extraPermissionsResponse: (string | null)[];
  userId: string;
};

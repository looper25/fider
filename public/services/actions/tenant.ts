import { http, Result } from "@fider/services/http";
import { Tenant, UserRole, OAuthConfig } from "@fider/models";
import { ImageUploadState } from "@fider/components";

export interface CheckAvailabilityResponse {
  message: string;
}

export interface CreateTenantRequest {
  legalAgreement: boolean;
  tenantName: string;
  subdomain?: string;
  name?: string;
  token?: string;
  email?: string;
}

export interface CreateTenantResponse {
  token?: string;
}

export const createTenant = async (request: CreateTenantRequest): Promise<Result<CreateTenantResponse>> => {
  return await http.post<CreateTenantResponse>("/_api/tenants", request);
};

export interface UpdateTenantSettingsRequest {
  logo?: {
    upload?: {
      content?: string;
      contentType?: string;
    };
    remove: boolean;
  };
  title: string;
  invitation: string;
  welcomeMessage: string;
  cname: string;
}

export const updateTenantSettings = async (request: UpdateTenantSettingsRequest): Promise<Result> => {
  return await http.post("/_api/admin/settings/general", request);
};

export const updateTenantAdvancedSettings = async (customCSS: string): Promise<Result> => {
  return await http.post("/_api/admin/settings/advanced", { customCSS });
};

export const updateTenantPrivacy = async (isPrivate: boolean): Promise<Result> => {
  return await http.post("/_api/admin/settings/privacy", {
    isPrivate
  });
};

export const checkAvailability = async (subdomain: string): Promise<Result<CheckAvailabilityResponse>> => {
  return await http.get<CheckAvailabilityResponse>(`/_api/tenants/${subdomain}/availability`);
};

export const signIn = async (email: string): Promise<Result> => {
  return await http.post("/_api/signin", {
    email
  });
};

export const completeProfile = async (key: string, name: string): Promise<Result> => {
  return await http.post("/_api/signin/complete", {
    key,
    name
  });
};

export const changeUserRole = async (userId: number, role: UserRole): Promise<Result> => {
  return await http.post(`/_api/admin/roles/${role}/users`, {
    userId
  });
};

export const getOAuthConfig = async (provider: string): Promise<Result<OAuthConfig>> => {
  return await http.get<OAuthConfig>(`/_api/admin/oauth/${provider}`);
};

export interface CreateEditOAuthConfigRequest {
  provider: string;
  status: number;
  displayName: string;
  clientId: string;
  clientSecret: string;
  authorizeUrl: string;
  tokenUrl: string;
  scope: string;
  profileUrl: string;
  jsonUserIdPath: string;
  jsonUserNamePath: string;
  jsonUserEmailPath: string;
  logo?: ImageUploadState;
}

export const saveOAuthConfig = async (request: CreateEditOAuthConfigRequest): Promise<Result> => {
  return await http.post("/_api/admin/oauth", request);
};

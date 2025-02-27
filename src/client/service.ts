import { MockService } from './api/mock-service';
import { CiamAuthz } from './api/ciam-service';
import { EntitlementsService } from './entitlements-api/entitlements';
import * as Oazapfts from 'oazapfts/lib/runtime';

export type License = {
  available: number;
  total: number;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  assigned: boolean;
};

export type TokenFunction = () => Promise<string>;

export type AuthenticatedUser = {
  orgId: string;
  serviceId: string;
  isOrgAdmin: boolean;
  token: TokenFunction;
};

export type Pagination = {
  page: number;
  perPage: number;
};

export type UserResult = {
  users: User[];
  count: number;
};

export const header = async (
  token: TokenFunction,
  baseUrl: string
): Promise<Oazapfts.RequestOpts> => {
  const tokenString = await token();
  return {
    headers: {
      Authorization: `Bearer ${tokenString}`,
    },
    baseUrl,
  };
};

export interface LicenseService {
  get(user: AuthenticatedUser, pagination: Pagination): Promise<License>;

  seats(
    user: AuthenticatedUser,
    pagination: Pagination,
    assigned?: boolean
  ): Promise<UserResult>;

  assign(user: AuthenticatedUser, userIds: string[]): Promise<void>;

  unAssign(user: AuthenticatedUser, userIds: string[]): Promise<void>;
}

export function getService(
  serviceKey: string,
  baseUrl?: string
): LicenseService {
  switch (serviceKey) {
    case 'CIAM_Authz':
      return new CiamAuthz(baseUrl);
    case 'entitlements':
      return new EntitlementsService(baseUrl);
    case 'mock':
      return new MockService();
    default:
      throw new Error('no implementation found for ' + serviceKey);
  }
}

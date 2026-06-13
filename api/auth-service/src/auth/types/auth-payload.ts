import { Role } from '@prisma/client';

export interface JwtPayload {
  /**
   * The subject of the token (User ID)
   */
  sub: string;

  /**
   * User email address
   */
  email: string;

  /**
   * Strongly-typed user role from Prisma Schema
   */
  role: Role;

  /**
   * Optional regional boundary ID (useful for region-scoped Partners or Admins)
   */
  regionId?: string;

  /**
   * Issued At (timestamp)
   */
  iat?: number;

  /**
   * Expiration Time (timestamp)
   */
  exp?: number;
}
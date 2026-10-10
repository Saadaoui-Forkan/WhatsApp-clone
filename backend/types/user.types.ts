export interface RegisterUser {
  name: string,
  email: string,
  password: string
}

export interface LoginUser {
  email: string,
  password: string
}

/**
 * Shape attached to `req.user` after authentication and embedded in the JWT.
 */
export interface UserPayload {
  id: string,
  email: string,
}

/** @deprecated Prefer `UserPayload`. Kept as an alias for backwards compatibility. */
export type UserInfo = UserPayload;

export interface JwtPayload {
  userInfo: UserPayload
}

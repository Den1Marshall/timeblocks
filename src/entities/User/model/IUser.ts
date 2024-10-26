import { UserInfo } from 'firebase/auth';
import { Claims } from 'next-firebase-auth-edge/lib/auth/claims';

export interface IUser extends UserInfo {
  emailVerified: boolean;
  customClaims: Claims;
}

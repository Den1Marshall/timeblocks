import {
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  User,
} from 'firebase/auth';

export const reauthenticateUser = async (
  user: User,
  email: string,
  password: string
): Promise<void> => {
  switch (user.providerData[0].providerId) {
    case 'google.com':
      await reauthenticateWithPopup(user, new GoogleAuthProvider());
      break;

    case 'password':
      await reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(email, password)
      );
      break;

    default:
      throw new Error('Unsupported provider');
  }
};

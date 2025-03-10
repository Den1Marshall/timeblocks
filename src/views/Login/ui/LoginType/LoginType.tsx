import { Tab, Tabs } from '@heroui/react';
import { FC } from 'react';
import type { Login } from '../../model/Login';
import { defaultTransition } from '@/shared/ui';

interface LoginTypeProps {
  loginType: Login;
  setLoginType: (loginType: Login) => void;
  clearErrors: () => void;
}

export const LoginType: FC<LoginTypeProps> = ({
  loginType,
  setLoginType,
  clearErrors,
}) => {
  // TODO: aria-label for tabs
  return (
    <Tabs
      fullWidth
      selectedKey={loginType}
      onSelectionChange={(newSelectedType) => {
        clearErrors();
        setLoginType(newSelectedType as Login);
      }}
      motionProps={{
        transition: defaultTransition,
      }}
      classNames={{
        cursor: '!bg-primary',
      }}
    >
      <Tab title='Sign in' key='signIn' />
      Sign In
      <Tab title='Sign Up' key='signUp' />
    </Tabs>
  );
};

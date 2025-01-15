import { Tab, Tabs } from '@nextui-org/react';
import { FC } from 'react';
import type { Login } from '../../model/Login';

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
  return (
    <Tabs
      fullWidth
      selectedKey={loginType}
      onSelectionChange={(newSelectedType) => {
        clearErrors();
        setLoginType(newSelectedType as Login);
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

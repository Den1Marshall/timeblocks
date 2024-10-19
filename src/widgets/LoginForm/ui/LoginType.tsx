import { Button, ButtonGroup } from '@nextui-org/react';
import { FC } from 'react';
import type { Login } from '../model/Login';

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
    <ButtonGroup fullWidth>
      <Button
        color={loginType === 'signIn' ? 'primary' : 'default'}
        onPress={() => {
          setLoginType('signIn');
          clearErrors();
        }}
      >
        Sign In
      </Button>
      <Button
        color={loginType === 'signUp' ? 'primary' : 'default'}
        onPress={() => {
          setLoginType('signUp');
          clearErrors();
        }}
      >
        Sign Up
      </Button>
    </ButtonGroup>
  );
};

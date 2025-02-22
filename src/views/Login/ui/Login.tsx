'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from '@heroui/react';
import { useState } from 'react';
import { GoogleIcon } from './icons/GoogleIcon';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TogglePasswordVisibilityButton } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '@/shared/config';
import { loginSchema, registerSchema } from '../model/zodSchema';
import { authenticateUser } from '@/entities/User';
import type { Login } from '../model/Login';
import { LoginType } from './LoginType/LoginType';
import { AnimatePresence, motion } from 'motion/react';
import { LoginForgotPassword } from './LoginForgotPassword/LoginForgotPassword';
import { addNewUserToDb } from '../api/addNewUserToDb';
import * as Sentry from '@sentry/nextjs';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();

  const [loginType, setLoginType] = useState<Login>('signIn');
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(
      loginType === 'signIn' ? loginSchema : registerSchema
    ),
  });

  const [forgotPassword, setForgotPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignInWithPopup = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const userCredential = await signInWithPopup(auth, provider);
      await addNewUserToDb(userCredential.user.uid);

      const idToken = await userCredential.user.getIdToken();
      await authenticateUser(idToken);

      router.push('/');
    } catch (error) {
      Sentry.captureException(error);

      if (error instanceof FirebaseError) {
        setError('root', { type: 'custom', message: error.code });
      } else {
        setError('root', {
          type: 'custom',
          message: 'Something has went wrong',
        });
      }
    }
  };

  const handleSignInWithEmailAndPassword = async (
    email: FormData['email'],
    password: FormData['password']
  ) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    await addNewUserToDb(userCredential.user.uid);

    const idToken = await userCredential.user.getIdToken();
    await authenticateUser(idToken);

    router.push('/');
  };

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    try {
      if (loginType === 'signIn') {
        await handleSignInWithEmailAndPassword(email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        await handleSignInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      Sentry.captureException(error);

      if (error instanceof FirebaseError) {
        setError('root', { type: 'custom', message: error.code });
      } else {
        setError('root', {
          type: 'custom',
          message: 'Something has went wrong',
        });
      }
    }
  };

  return (
    <main className='w-full h-full flex items-center justify-center'>
      <article className='w-full max-w-sm'>
        <Card fullWidth className='relative min-h-[454px]'>
          <AnimatePresence initial={false} mode='popLayout'>
            {forgotPassword ? (
              <LoginForgotPassword key={0} setIsOpen={setForgotPassword} />
            ) : (
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                key={1}
                initial={{ transform: 'translateX(-100%)' }}
                animate={{ transform: 'translateX(0%)' }}
                exit={{ transform: 'translateX(-100%)' }}
              >
                <CardHeader className='justify-center text-xl'>
                  Log In to continue
                </CardHeader>

                <CardBody className='gap-5 items-center'>
                  <Button
                    variant='shadow'
                    fullWidth
                    onPress={handleSignInWithPopup}
                  >
                    Continue With Google <GoogleIcon />
                  </Button>

                  <p>OR</p>

                  <LoginType
                    loginType={loginType}
                    setLoginType={setLoginType}
                    clearErrors={clearErrors}
                  />

                  <Controller
                    control={control}
                    name='email'
                    render={({ field }) => (
                      <Input
                        isRequired
                        type='email'
                        placeholder='Email'
                        isClearable
                        onClear={() => setValue('email', '')}
                        errorMessage={errors.email?.message}
                        isInvalid={Boolean(errors.email?.message)}
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name='password'
                    render={({ field }) => (
                      <Input
                        isRequired
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder='Password'
                        errorMessage={errors.password?.message}
                        isInvalid={Boolean(errors.password?.message)}
                        endContent={
                          <TogglePasswordVisibilityButton
                            isVisible={isPasswordVisible}
                            setIsVisible={setIsPasswordVisible}
                          />
                        }
                        {...field}
                      />
                    )}
                  />

                  {errors.root && (
                    <p role='alert' className='text-danger self-start'>
                      Error: {errors.root?.message}
                    </p>
                  )}
                </CardBody>

                <CardFooter className='flex-col gap-2.5'>
                  <Button
                    type='submit'
                    isLoading={isSubmitting}
                    fullWidth
                    color='primary'
                  >
                    {loginType === 'signIn' ? 'Sign In' : 'Sign Up'}
                  </Button>

                  <Button
                    isDisabled={isSubmitting}
                    fullWidth
                    variant='light'
                    color='danger'
                    onPress={() => {
                      clearErrors();
                      reset();
                      setLoginType('signIn');
                      setIsPasswordVisible(false);
                      setForgotPassword(true);
                    }}
                  >
                    Forgot password?
                  </Button>
                </CardFooter>
              </motion.form>
            )}
          </AnimatePresence>
        </Card>
      </article>
    </main>
  );
}

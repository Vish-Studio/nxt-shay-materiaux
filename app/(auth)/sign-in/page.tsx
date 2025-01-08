'use client';

import Button from '@/components/button/button';
import FormInput from '@/components/form-input/form-input';
import { useAuth } from '@/context/AuthContext';
import { ButtonTypes } from '@/enums/button-types';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import './style.scss';
import { appRoutes } from '@/constants/routes/app-routes';

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const router = useRouter();
  const { login, user } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  // We check if user is already authenticated and we redirect to home if yes
  useEffect(() => {
    if (user) {
      router.push(appRoutes.index);
    }
  }, [user, router]);

  const onSubmit = async (data: any) => {
    setIsDisabled(!isDisabled);
    const response = await login(data);

    if (response && response.status == 200) {
      router.push(appRoutes.index);
    } else {
      setErrorMessage(response.error as string);
    }
    setIsDisabled(false);
  };

  return (
    <section className="sign-in">
      <div className="sign-in__header">
        <h1>Sign In</h1>
      </div>
      <div className="sign-in__form-container">
        <div className="sign-in__description">
          <p className="sign-in__welcome">Welcome back!</p>
          <p className="sign-in__text">Sign in back to your account.</p>
        </div>
        <div className="sign-in__form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              {...register('email', { required: true })}
              title="email"
              type="email"
              hint="Email"
              onChange={() => setErrorMessage('')}
              hasError={errors?.email || errorMessage ? true : false}
            />
            <FormInput
              {...register('password', { required: true })}
              title="password"
              type="password"
              hint="Password"
              onChange={() => setErrorMessage('')}
              errorMessage={errorMessage}
              hasError={errors?.password || errorMessage ? true : false}
              hasViewIcon={true}
            />
          </form>
        </div>
        <div className="sign-in__reset-password">
          <p>
            Forgot your password?{' '}
            <span>
              <Link href="/">Reset</Link>
            </span>
          </p>
        </div>
      </div>
      <div className="sign-in__button-container">
        <Button
          title={isDisabled ? 'Loading...' : 'Login'}
          titleBold={true}
          type={ButtonTypes.Submit}
          variant="rounded"
          onClick={handleSubmit(onSubmit)}
          isDisabled={isDisabled}
        />
        <p>
          Don’t have an account?{' '}
          <span>
            <Link href="/">Help</Link>
          </span>
        </p>
      </div>
    </section>
  );
}

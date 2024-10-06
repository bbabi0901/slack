'use client';

import { FC, useState, FormEvent } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { TriangleAlert } from 'lucide-react';

import { SignInFlow } from '../types';

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

const SignUpCard: FC<SignUpCardProps> = ({ setState }) => {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordSignUp = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setPending(true);
    signIn('password', { email, password, flow: 'signUp' }) // ref: https://labs.convex.dev/auth/config/passwords
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => setPending(false));
  };

  const handleProviderSignUp = (value: 'google' | 'github') => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  };

  return (
    <Card className='h-full w-full p-8'>
      <CardHeader className='px-0 pt-0 '>
        <CardTitle>Sign up continue </CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
          <TriangleAlert className='size-4' />
          <p>{error}</p>
        </div>
      )}
      <CardContent className='space-y-5 px-0 pb-0'>
        <form className='space-y-2.5' onSubmit={handlePasswordSignUp}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            type='email'
            required
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            type='password'
            required
          />
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm password'
            type='password'
            required
          />
          <Button
            type='submit'
            className='w-full '
            size='lg'
            disabled={pending}
          >
            Continue
          </Button>
        </form>
        <Separator />
        <div className='flex flex-col gap-y-2.5'>
          <Button
            disabled={pending}
            onClick={() => handleProviderSignUp('google')}
            size='lg'
            variant='outline'
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute left-2.5 top-2.5' />
            Continue with google
          </Button>
          <Button
            disabled={pending}
            onClick={() => handleProviderSignUp('github')}
            size='lg'
            variant='outline'
            className='w-full relative'
          >
            <FaGithub className='size-5 absolute left-2.5 top-2.5' />
            Continue with github
          </Button>
        </div>
        <p className='text-xs text-muted-foreground'>
          Already have an account?{' '}
          <span
            onClick={() => setState('signIn')}
            className='text-sky-700 hover:underline cursor-pointer'
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;

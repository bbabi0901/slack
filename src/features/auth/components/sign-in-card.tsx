'use client';

import { FC, FormEvent, useState } from 'react';
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

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

const SignInCard: FC<SignInCardProps> = ({ setState }) => {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordSignIn = (e: FormEvent) => {
    e.preventDefault();
    setPending(true);
    // * The flow is 'signIn' not 'signUp'.
    signIn('password', { email, password, flow: 'signIn ' })
      .catch(() => {
        setError('Invalid email or password');
      })
      .finally(() => setPending(false));
  };

  const handleProviderSignIn = (value: 'google' | 'github') => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  };

  return (
    <Card className='h-full w-full p-8'>
      <CardHeader className='px-0 pt-0 '>
        <CardTitle>Login to continue </CardTitle>
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
        <form className='space-y-2.5'>
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
          <Button
            type='submit'
            className='w-full'
            size='lg'
            disabled={pending}
            onClick={handlePasswordSignIn}
          >
            Continue
          </Button>
        </form>
        <Separator />
        <div className='flex flex-col gap-y-2.5'>
          <Button
            disabled={pending}
            onClick={() => handleProviderSignIn('google')}
            size='lg'
            variant='outline'
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute left-2.5 top-2.5' />
            Continue with google
          </Button>
          <Button
            disabled={pending}
            onClick={() => handleProviderSignIn('github')}
            size='lg'
            variant='outline'
            className='w-full relative'
          >
            <FaGithub className='size-5 absolute left-2.5 top-2.5' />
            Continue with github
          </Button>
        </div>
        <p className='text-xs text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <span
            onClick={() => setState('signUp')}
            className='text-sky-700 hover:underline cursor-pointer'
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;

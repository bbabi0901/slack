'use client';

import { useAuthActions } from '@convex-dev/auth/react';

import { Button } from '@/components/ui/button';

const SignOutButton = () => {
  const { signOut } = useAuthActions();

  return (
    <Button onClick={signOut} size='lg'>
      Sign Out
    </Button>
  );
};

export default SignOutButton;

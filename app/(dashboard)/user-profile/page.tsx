'use client';

import Button from '@/components/button/button';
import Profile from '@/components/profile/profile';
import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';

import vish from '@/public/vish.jpg';

import { useAuth } from '@/context/AuthContext';

export default function UserProfile() {
  const { logout } = useAuth();

  return (
    <>
      <TopBar
        leftIcon="close"
        redirectBackLink="/"
      />
      <main className="page-user-profile">
        <Profile
          variant="large"
          name={'test'}
          imgUrl={vish}
        />

        <div className="user-info">
          <h1>Vishroy Seenarain</h1>
          <p>vishseenarain@gmail.com</p>
        </div>

        <Button
          title="Sign out"
          titleBold
          variant="rounded"
          clickHandler={() => logout()}
        />
      </main>
    </>
  );
}

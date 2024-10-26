'use client';

import Button from '@/components/button/button';
import Profile from '@/components/profile/profile';
import TopBar from '@/components/top-bar/top-bar';
import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/context/UserContext';
import vish from '@/public/vish.jpg';

import './styles.scss';

export default function UserProfile() {
  const { logout } = useAuth();
  const { user } = useUser();

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
          <h1>{`${user?.firstName} ${user?.lastName}`}</h1>
          <p>{user?.email}</p>
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

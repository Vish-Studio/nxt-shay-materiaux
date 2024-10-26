'use client'

import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';
import Button from '@/components/button/button';
import Profile from '@/components/profile/profile';

import vish from '@/public/vish.jpg';

export default function UserProfile() {
  return (
    <>
      <TopBar
        leftIcon="close"
        redirectBackLink='/'
      />
      <main className="page-user-profile">
        <Profile
          variant='large'
          name={'test'}
          imgUrl={vish}
        />

        <div className="user-info">
          <h1>Vishroy Seenarain</h1>
          <p>vishseenarain@gmail.com</p>
        </div>

        <Button
          title='Sign out'
          titleBold
          variant='rounded'
          clickHandler={() => alert('Signing out..')}
        />
      </main>
    </>
  )
}
import { appRoutes } from '@/constants/routes/app-routes';
import ProfileProps from './type/profile-props';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { FunctionComponent } from 'react';

import './styles.scss';

const Profile: FunctionComponent<ProfileProps> = ({
  className = '',
  variant = 'normal',
  name,
  imgUrl
}) => {
  const route = useRouter();
  const imgSize: number = variant === 'large' ? 135 : 40;
  return (
    <div
      className={`profile ${className} ${variant}`}
      onClick={() => route.push(appRoutes.userProfile.index)}
    >
      <Image
        src={imgUrl}
        alt={name}
        width={imgSize}
        height={imgSize}
      />
    </div>
  );
};

export default Profile;

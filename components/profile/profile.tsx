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
  imgUrl,
  onClick,
  disableClick = false
}) => {
  const route = useRouter();
  const imgSize: number = variant === 'large' ? 135 : 40;

  const handleClick = () => {
    if (disableClick) return;
    if (onClick) {
      onClick();
    } else {
      route.push(appRoutes.userProfile.index);
    }
  };

  return (
    <div
      className={`profile ${className} ${variant} ${disableClick ? 'disabled' : ''}`}
      onClick={handleClick}
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

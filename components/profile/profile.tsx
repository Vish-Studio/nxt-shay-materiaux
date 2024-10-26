import { FunctionComponent } from "react";
import ProfileProps from "./type/profile-props";
import './styles.scss';
import Image from "next/image";
import { useRouter } from "next/navigation";

const Profile: FunctionComponent<ProfileProps> = ({
  className = '',
  variant = 'normal',
  name,
  imgUrl
}) => {
  const route = useRouter();
  const imgSize: number = variant === 'large' ? 135 : 40;
  return (
    <div className={`profile ${className} ${variant}`} onClick={() => route.push('/user-profile')}>
      <Image
        src={imgUrl}
        alt={name}
        width={imgSize}
        height={imgSize} />
    </div>
  )
}

export default Profile;
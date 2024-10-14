import { FunctionComponent } from "react";
import ProfileProps from "./type/profile-props";
import './styles.scss';
import Image from "next/image";

const Profile: FunctionComponent<ProfileProps> = ({
  className,
  name,
  imgUrl
}) => {
  return (
    <div className="profile">
      <Image
        src={imgUrl}
        alt={name}
        width={50}
        height={50} />
    </div>
  )
}

export default Profile;
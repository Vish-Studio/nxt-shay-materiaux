import { StaticImageData } from "next/image";

export default interface ProfileProps {
  className?: string;
  variant?: 'normal' | 'large';
  name: string;
  imgUrl: string | StaticImageData;
}
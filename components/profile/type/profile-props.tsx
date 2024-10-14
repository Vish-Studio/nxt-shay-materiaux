import { StaticImageData } from "next/image";

export default interface ProfileProps {
  className?: string;
  name: string;
  imgUrl: string | StaticImageData;
}
import { InfoContent } from "@/types/info-content";

export default interface InfoCardProps {
  className?: string;
  route: string;
  isInfo: boolean;
  infoContents?: InfoContent[];
  type: 'products' | 'clients';
}
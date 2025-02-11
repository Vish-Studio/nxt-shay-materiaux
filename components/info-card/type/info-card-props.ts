import { IClient } from '@/types/api/client';
import { InfoContent } from '@/types/info-content';

export default interface InfoCardProps {
  className?: string;
  isInfo: boolean;
  infoContents?: IClient;
  type: 'products' | 'clients';
}

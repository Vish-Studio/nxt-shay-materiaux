export default interface InfoCardProps {
  className?: string;
  route: string;
  isInfo: boolean;
  infoContents?: any[];
  type: 'products' | 'clients';
}
export default interface InfoCardProps {
  className?: string;
  route: string;
  isInfo: boolean;
  infoContents?: [];
  type: 'products' | 'clients';
}
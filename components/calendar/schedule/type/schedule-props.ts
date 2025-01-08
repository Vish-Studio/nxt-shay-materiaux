export default interface SchedulesProps {
  className?: string;
  title?: string;
  time?: string;
  color?: 'client' | 'product' | 'payment' | string;
  restrictLength?: boolean;
  isEmpty?: boolean;
}

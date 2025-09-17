import { Date } from '@/types/global';

export default interface ButtonCalendarProps {
  className?: string;
  date: Date;
  items?: data;
  dataLoaded?: boolean;
  showContent?: boolean;
}

type CalendarItemsType = {
  title: string;
  time: string;
  color: 'payment' | 'client' | 'product';
};

type data = {
  data: Array<CalendarItemsType>;
};

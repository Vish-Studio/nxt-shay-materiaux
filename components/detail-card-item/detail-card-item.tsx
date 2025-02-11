import './styles.scss';

interface DetailCardItemProps {
  className?: string;
  title: string;
  name: string;
}

const DetailCardItem = ({ className, title, name }: DetailCardItemProps) => {
  return (
    <div className={`detail-card-item ${className ?? ''}`}>
      <span>{title}</span>
      <p>{name}</p>
    </div>
  );
};

export default DetailCardItem;

import './styles.scss';

interface DetailCardItemProps {
  className?: string;
  title: string;
  name: string | null | undefined;
}

const DetailCardItem = ({ className, title, name }: DetailCardItemProps) => {
  // Don't render if name is null, undefined, or empty string
  if (name === null || name === undefined || name === '') {
    return null;
  }

  return (
    <div className={`detail-card-item ${className ?? ''}`}>
      <span>{title}</span>
      <p>{name}</p>
    </div>
  );
};

export default DetailCardItem;

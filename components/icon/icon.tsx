import { FunctionComponent } from 'react';
import IconProps from './type/icon-props';

const Icon: FunctionComponent<IconProps> = ({ className, iconName }) => {
  const classNames = `icon material-symbols-outlined ${className ?? ''}`;

  return <span className={classNames}>{iconName}</span>;
};

export default Icon;

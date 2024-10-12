import { FunctionComponent } from 'react';
import IconProps from './type/icon-props';

const Icon: FunctionComponent<IconProps> = ({
  className,
  iconName
}) => {
  return (
    <span className="icon material-symbols-outlined">
      {iconName}
    </span>
  )
}

export default Icon;
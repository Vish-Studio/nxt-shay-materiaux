import { FunctionComponent } from 'react';
import IconProps from './type/icon-props';

const Icon: FunctionComponent<IconProps> = ({
  className,
  iconName,
  clickHandler
}) => {
  const classNames = `icon material-symbols-outlined ${className ?? ''}`;

  return (
    <>
      {
        clickHandler ? (
          <button onClick={clickHandler} >
            <span className={classNames}>{iconName}</span>
          </button >
        ) : (
          <span className={classNames}>{iconName}</span>
        )
      }
    </>

  );
};

export default Icon;

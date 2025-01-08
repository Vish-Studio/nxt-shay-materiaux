import { FunctionComponent } from 'react';
import IconProps from './type/icon-props';

const Icon: FunctionComponent<IconProps> = ({ className, iconName, clickHandler }) => {
  // const classNames = `icon material-symbols-outlined symbol${className ?? ''}`;
  const classNames = `icon symbol${className ?? ''}`;

  return (
    <>
      {clickHandler ? (
        <button
          className="btn-icon"
          onClick={clickHandler}
        >
          <span className={classNames}>{iconName}</span>
        </button>
      ) : (
        <span className={classNames}>{iconName}</span>
      )}
    </>
  );
};

export default Icon;

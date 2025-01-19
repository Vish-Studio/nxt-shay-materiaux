import { FunctionComponent } from 'react';
import IconProps from './type/icon-props';
import './styles.scss'

const Icon: FunctionComponent<IconProps> = ({ className, iconName, clickHandler }) => {
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

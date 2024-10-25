import { FunctionComponent } from 'react';
import ButtonFabProps from './type/button-fab-props';
import Icon from '../icon/icon';
import './styles.scss'

const ButtonFab: FunctionComponent<ButtonFabProps> = ({
  className = '',
  icon,
  type,
  clickHandler
}) => {
  return (
    <div className={`button-fab ${type} ${className}`}
      onClick={clickHandler}>
      <Icon iconName={icon} />
    </div >
  )
}

export default ButtonFab;
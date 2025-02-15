'use client';

import React, { FunctionComponent, ReactNode } from 'react';
import Button from '../button/button';
import { ButtonTypes } from '@/enums/button-types';
import './styles.scss';
import Icon from '../icon/icon';

interface ModalProps {
  className?: string;
  icon?: string;
  title?: string;
  description?: string;
  isOpen: boolean;
  children?: ReactNode;
  placement?: 'center' | 'top' | 'bottom';
  primaryText: string;
  secondaryText?: string;
  primaryClick: () => void; // action for main button clicks ex: submit, ok, continue
  secondaryClick?: () => void; // action for secondary button clicks ex: cancel, close, back
}

const Modal: FunctionComponent<ModalProps> = ({
  className,
  icon,
  title,
  description,
  isOpen,
  children,
  placement,
  primaryText,
  secondaryText,
  primaryClick,
  secondaryClick
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-wrapper">
      <div className={`modal ${className ? className : ''} ${placement ? placement : ''}`}>
        <div className="modal-header">
          <div className={`title ${icon ? 'icon' : ''}`}>
            {icon && <Icon iconName={icon} />}
            <h2>{title}</h2>
          </div>
          <div className="description">
            <p>{description}</p>
          </div>
        </div>

        {children && (
          <div className="modal-content">{children}</div>
        )}

        <div className="modal-actions">
          {secondaryClick && (
            <Button
              className="btn-secondary"
              title={secondaryText as string}
              type={ButtonTypes.Submit}
              variant="normal"
              isDisabled={false}
              onClick={secondaryClick}
            />
          )}

          <Button
            className="btn-primary"
            title={primaryText}
            type={ButtonTypes.Submit}
            variant="normal"
            isDisabled={false}
            onClick={primaryClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;

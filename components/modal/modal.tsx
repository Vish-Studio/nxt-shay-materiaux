'use client';

import React, { FunctionComponent, ReactNode } from 'react';
import Button from '../button/button';
import { ButtonTypes } from '@/enums/button-types';
import './styles.scss';

interface ModalProps {
  className?: string;
  title?: string;
  description?: string;
  isOpen: boolean;
  children: ReactNode;
  placement?: 'center' | 'top' | 'bottom';
  primaryClick?: () => void; // action for main button clicks ex: submit, ok, continue
  secondaryClick?: () => void; // action for secondary button clicks ex: cancel, close, back
}

const Modal: FunctionComponent<ModalProps> = ({
  className,
  title,
  description,
  isOpen,
  children,
  placement,
  primaryClick,
  secondaryClick
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-wrapper">
      <div className={`modal ${className ? className : ''} ${placement ? placement : ''}`}>
        <div className="modal-header">
          <div className="title">
            <h2>{title}</h2>
          </div>
          <div className="description">
            <p>{description}</p>
          </div>
        </div>

        <div className="modal-content">{children}</div>

        <div className="modal-actions">
          <Button
            className="btn-primary"
            title="Continue"
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

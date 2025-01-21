import { memo } from 'react';

import './styles.scss';

type TLinearProgressProps = {
  progress?: number;
  color?: string;
  height?: string;
  isIndeterminate?: boolean;
  position?: 'fixed' | 'relative';
};

export const LinearProgress = memo(
  ({
    progress,
    color = '#1b1b1b',
    height = '3px',
    isIndeterminate = false,
    position = 'fixed'
  }: TLinearProgressProps) => {
    return (
      <div
        className={`linear-progress-container ${position}`}
        style={{ height }}
      >
        <div
          className={`linear-progress-bar ${isIndeterminate ? 'indeterminate' : ''}`}
          style={{
            width: isIndeterminate ? '100%' : `${progress}%`,
            backgroundColor: color
          }}
        ></div>
      </div>
    );
  }
);

LinearProgress.displayName = 'LinearProgress';

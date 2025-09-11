import './styles.scss';

interface CircularProgressProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const CircularProgress = ({
  size = 40,
  color = '#1b1b1b',
  strokeWidth = 4
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <div className="circular-progress-container">
      <svg
        className="circular-progress"
        width={size}
        height={size}
      >
        <circle
          className="circular-progress-track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          className="circular-progress-indicator"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.25}
        />
      </svg>
    </div>
  );
};

export default CircularProgress;

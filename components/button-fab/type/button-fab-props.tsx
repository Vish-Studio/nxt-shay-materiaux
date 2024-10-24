export default interface ButtonFabProps {
  className?: string;
  icon: string;
  type: 'normal' | 'mini';
  clickHandler: () => void;
}
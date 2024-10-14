export default interface ButtonProps {
  title: string;
  titleBold?: boolean;
  type?: string;
  iconName?: string;
  clickHandler?: () => void;
}

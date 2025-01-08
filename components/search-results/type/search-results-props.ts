
export default interface SearchResultsProps {
  className?: string;
  items?: SearchItem[];
}

export type SearchItem = {
  icon?: string;
  title: string;
  subTitle: string;
  type: "products" | "clients";
}
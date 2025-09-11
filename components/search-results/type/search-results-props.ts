
export default interface SearchResultsProps {
  className?: string;
  items?: SearchItem[];
}

export type SearchItem = {
  id: string;
  icon?: string;
  title: string;
  subTitle: string;
  type: "products" | "clients";
}
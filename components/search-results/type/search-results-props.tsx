
export default interface SearchResultsProps {
  className?: string;
  items?: SearchItem[];
  test: string;
}

export type SearchItem = {
  icon?: string;
  title: string;
  subTitle: string;
  type: "products" | "clients";
}
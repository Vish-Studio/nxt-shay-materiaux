import { createContext } from 'react';

export const SearchContext = createContext({ searchResults: '', setSearchResults: (text: string) => { } });

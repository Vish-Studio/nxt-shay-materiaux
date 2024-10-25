'use client'

import ButtonFab from "@/components/button-fab/button-fab";
import TopBar from "@/components/top-bar/top-bar";
import './styles.scss';
import InfoCard from "@/components/info-card/info-card";
import { useState } from "react";
import { SearchContext } from "@/context/SearchContext";


export default function Clients() {
  const [searchResults, setSearchResults] = useState('')

  const [slug, setSlug] = useState<string>('vishroy');
  return (
    <SearchContext.Provider value={{
      searchResults,
      setSearchResults
    }}>
      <main className="page-clients">
        <TopBar
          redirectBackLink="/"
          title="Clients"
          hasSearch={true} />

        <InfoCard
          route={slug}
          type="clients" />

        <ButtonFab
          icon={"add"}
          type={"normal"}
          clickHandler={() => console.log('ge')} />

      </main>
    </SearchContext.Provider>
  )
}
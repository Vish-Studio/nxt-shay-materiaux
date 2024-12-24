'use client'

import ButtonFab from "@/components/button-fab/button-fab";
import TopBar from "@/components/top-bar/top-bar";
import './styles.scss';
import InfoCard from "@/components/info-card/info-card";
import { useState } from "react";
import { SearchContext } from "@/context/SearchContext";
import { useRouter } from "next/navigation";
import TableFilter, { TabItem } from "@/components/table/table-filter/table-filter";



export default function Clients() {
  const [searchResults, setSearchResults] = useState('')
  const [slug, setSlug] = useState<string>('vishroy');
  const [isInfo, setIsInfo] = useState<boolean>(false)

  const data = [
    {
      title: 'John Snow',
      brn: '#12234555',
      address: 'Kalimaye st, Calebasses',
      tel: '+23051234567',
      shop: 'Good Shop'
    },
  ]

  const tabGroup: TabItem[] = [
    {
      title: 'All',
      clickHandle: () => alert('test')
    },
    {
      title: 'Paid',
      clickHandle: () => alert('Paid')
    }
  ]

  return (
    <SearchContext.Provider value={{
      searchResults,
      setSearchResults
    }}>
      <main className="page-clients">
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink="/"
          title="Clients"
          hasSearch={true} />

        <InfoCard
          route={slug}
          type="clients"
          infoContents={data}
          isInfo={isInfo} />

        <TableFilter tabItems={tabGroup} />

        <ButtonFab
          icon={"add"}
          type={"normal"}
          clickHandler={() => setIsInfo(!isInfo)} />
      </main>
    </SearchContext.Provider>
  )
}
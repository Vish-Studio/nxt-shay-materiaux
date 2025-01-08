'use client'

import ButtonFab from "@/components/button-fab/button-fab";
import InfoCard from "@/components/info-card/info-card";
import TopBar from "@/components/top-bar/top-bar";
import { useState } from "react";

import './styles.scss';
import TableFilter, { TabItem } from "@/components/table/table-filter/table-filter";
import TableList from "@/components/table/table-list/table-list";


export default function Products() {
  const [slug, setSlug] = useState<string>('plasticbags');
  const [isInfo, setIsInfo] = useState<boolean>(false);

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
    <main className="page-products" >
      <TopBar
        leftIcon="arrow_back"
        redirectBackLink="/"
        title="Products"
        hasSearch={true} />

      <section>
        <InfoCard
          route={slug}
          type="products"
          infoContents={data}
          isInfo={isInfo} />
      </section>

      <section className="main-content">
        <TableFilter tabItems={tabGroup} />
        <TableList />
      </section>

      <ButtonFab
        icon={"add"}
        type={"normal"}
        clickHandler={() => setIsInfo(!isInfo)} />
    </main >
  )
}
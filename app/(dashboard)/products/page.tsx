'use client'

import ButtonFab from "@/components/button-fab/button-fab";
import InfoCard from "@/components/info-card/info-card";
import TopBar from "@/components/top-bar/top-bar";
import { useState } from "react";

import './styles.scss';


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

  return (
    < main className="page-products" >
      <TopBar
        leftIcon="arrow_back"
        redirectBackLink="/"
        title="Products"
        hasSearch={true} />

      <InfoCard
        route={slug}
        type="products"
        infoContents={data}
        isInfo={isInfo} />

      <ButtonFab
        icon={"add"}
        type={"normal"}
        clickHandler={() => setIsInfo(!isInfo)} />
    </main >
  )
}
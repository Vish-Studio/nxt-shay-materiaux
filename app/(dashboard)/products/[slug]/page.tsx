'use client'

import TopBar from "@/components/top-bar/top-bar";

import { appRoutes } from "@/constants/routes/app-routes";
import { useSearchParams } from "next/navigation";


export default function ProductSlug() {
  const searchParams = useSearchParams()

  return (
    <main>
      <TopBar title="Slug" redirectBackLink={appRoutes?.products?.index} />

      <h1>{searchParams.get('search')}</h1>
    </main>
  )
}
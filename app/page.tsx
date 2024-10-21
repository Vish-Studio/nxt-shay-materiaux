'use client'

import ButtonCard from "@/components/button-card/button-card";
import SearchBar from "@/components/search-bar/search-bar";
import './styles.scss';
import Button from "@/components/button/button";
import ButtonCalendar from "@/components/calendar/button-calendar";
import Profile from "@/components/profile/profile";

import vish from '@/public/vish.jpg'
import { useEffect, useRef, useState } from "react";


export default function Home() {

  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return { day, month };
  }

  return (
    <main className="main-content">
      <div className="top-bar">
        <div className="menu-bar">
          <h3>Dashboard</h3>

          <Profile
            name="Vishroy"
            imgUrl={vish} />
        </div>
        <SearchBar hintText="Search" />
      </div>

      <ButtonCalendar
        date={getDate()} />


      <div className="overview">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px'
        }}>
          <ButtonCard
            title="Clients"
            iconName="account_circle"
            numNew="3"
            numNewTxt="newly recorded"
            numTotal="200"
            numTotalTxt="total registered" />

          <Button
            title="Catalogs"
            iconName="import_contacts"
            type="rounded"
            titleBold={false}
          />
        </div>


        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px'
        }}>
          <ButtonCard
            className="yellow"
            title="Products"
            iconName="inventory_2"
            numNew="6"
            numNewTxt="newly recorded"
            numTotal="550"
            numTotalTxt="product type" />
          <Button
            title="Invoices"
            iconName="description"
            type="rounded"
            titleBold={false}
          />
        </div>


      </div>
    </main >
  );
}


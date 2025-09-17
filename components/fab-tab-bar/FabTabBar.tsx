
import React from 'react';
import Icon from "../icon/icon";
import './styles.scss';


interface FabTabBarProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const tabs = [
  { label: 'Overview', icon: 'home', aria: 'overview' },
  { label: 'Credits', icon: 'credit_card', aria: 'credits' },
];

export default function FabTabBar({ activeTab, setActiveTab }: FabTabBarProps) {
  return (
    <div className="floating-tab-bar">
      {tabs.map((tab, idx) => (
        <button
          key={tab.label}
          className={`fab-tab-btn${activeTab === idx ? ' active' : ''}`}
          onClick={() => setActiveTab(idx)}
        >
          <Icon iconName={tab.icon} />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

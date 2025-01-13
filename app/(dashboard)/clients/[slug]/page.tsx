'use client';

import TopBar from '@/components/top-bar/top-bar';
import './styles.scss';
import { useRouter } from 'next/navigation';

export default function Client() {
  const router = useRouter();

  return (
    <main className="client-page">
      <div className="page-clients">
        <TopBar
          leftIcon="arrow_back"
          redirectBackLink="/"
          title="Client detail"
          hasSearch={false}
        />
      </div>
    </main>
  );
}

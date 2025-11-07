'use client';

import { useState, useEffect } from 'react';
import HeroTabs from '@/components/HeroTabs';

export default function Home() {
  const [knowledge, setKnowledge] = useState({ fundamentos: [] });

  useEffect(() => {
    // Load knowledge from public folder (works in monorepo)
    fetch('/knowledge/knowledge.json')
      .then(res => res.ok ? res.json() : { fundamentos: [] })
      .then(data => setKnowledge(data))
      .catch(() => setKnowledge({ fundamentos: [] }));
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <HeroTabs knowledge={knowledge} />
    </div>
  );
}

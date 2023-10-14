import { useUserStore } from '@/store/store';
import SearchUser from '@/components/layout/Search';
import ResultSearch from '@/components/layout/ResultSearch';
import Navbar from './components/layout/Navbar';
import { cn } from './lib/utils';
import { useState } from 'react';
import Footer from './components/layout/Footer';

function App() {
  const username = useUserStore(state => state.username);
  const result = useUserStore(state => state.result);
  useState;
  return (
    <div className="relative min-h-[100dvh] w-full">
      <Navbar />
      <main className="overflow-visible container flex justify-center min-h-screen -mt-14">
        <section className="relatiev w-full flex items-center justify-center">
          <div
            className={cn(
              'p-2 flex flex-col rounded-lg w-full',
              'gap-3 bg-black/5 dark:bg-white/5'
            )}>
            <SearchUser />
            <div data-testid="username" className="text-slate-500">
              {result.length === 0 ? (
                <p
                  className={cn(
                    'text-inherit',
                    username ? 'block' : 'invisible'
                  )}>
                  user "{username}" not found
                </p>
              ) : (
                <p className="text-inherit">Showing user for "{username}"</p>
              )}
            </div>
            <ResultSearch />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

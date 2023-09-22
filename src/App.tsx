import { useUserStore } from '@/store/store';
import SearchUser from '@/components/layout/Search';
import ResultSearch from '@/components/layout/ResultSearch';

function App() {
  const username = useUserStore(state => state.username);
  const result = useUserStore(state => state.result);

  return (
    <main className="flex items-center justify-center min-h-[100dvh] overflow-visible px-2">
      <section className="relatiev w-full min-[400px]:w-[400px] p-2 bg-white flex flex-col gap-3 h-full rounded-sm">
        <SearchUser />
        {username ? (
          <div data-testid="username" className="text-slate-500">
            {result.length === 0 ? (
              <p className="text-inherit">user "{username}" not found</p>
            ) : (
              <p className="text-inherit">Showing user for "{username}"</p>
            )}
          </div>
        ) : null}
        <ResultSearch />
      </section>
    </main>
  );
}

export default App;
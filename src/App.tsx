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
        <div className="text-slate-500">
          {username ? (
            result.length === 0 ? (
              <p className="text-inherit">user "{username}" not found</p>
            ) : (
              <p className="text-inherit">Showing user for "{username}"</p>
            )
          ) : null}
        </div>
        <ResultSearch />
      </section>
    </main>
  );
}

export default App;

// const res = await fetch(
//   `https://api.github.com/search/users?per_page=5&page=1&q=${username}`
// );
// const data = await res.json();

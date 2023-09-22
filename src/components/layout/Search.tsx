import { useState } from 'react';
import { Input } from '../ui/Input';
import { useUserStore } from '@/store/store';
import { GithubSearchUsersResponse } from '~/types/github';
import octokit from '@/lib/octokit';
import { cn } from '@/lib/utils';

const SearchUser = () => {
  const [query, setQuery] = useState<string>('');
  const setUsername = useUserStore(state => state.setUsername);
  const setResult = useUserStore(state => state.setResult);
  const setLoading = useUserStore(state => state.setLoading);
  const loading = useUserStore(state => state.loading);
  const seachUser = async () => {
    setLoading(true);
    try {
      const { data }: GithubSearchUsersResponse = await octokit.request(
        'GET /search/users',
        {
          q: query,
          per_page: 5,
        }
      );
      setUsername(query);
      setResult(data.items);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col gap-3">
      <Input
        placeholder="Enter username"
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full bg-[#F2F2F2] p-1.5 ring-0 border-none active:outline-none"
      />
      <button
        type="submit"
        className={cn(
          'bg-[#2D9CDB] text-white w-full p-1.5 rounded-sm',
          (query.length === 0 || loading) && 'cursor-not-allowed'
        )}
        onClick={seachUser}
        disabled={query.length === 0 || loading}>
        Search
      </button>
    </div>
  );
};

export default SearchUser;

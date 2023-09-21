import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { GithubUser } from '~/types/github';

type Store = {
  username: string;
  result: GithubUser[];
  loading: boolean;
  setUsername: (str: string) => void;
  setResult: (newResult: GithubUser[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useUserStore = create<Store>()(
  persist(
    devtools(set => ({
      username: '',
      loading: false,
      result: [],
      setUsername: str => set(() => ({ username: str })),
      setResult: (res: GithubUser[]) => set(() => ({ result: res })),
      setLoading: () => set(state => ({ loading: !state.loading })),
    })),
    { name: 'gh-search', storage: createJSONStorage(() => sessionStorage) }
  )
);

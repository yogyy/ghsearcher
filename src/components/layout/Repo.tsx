import { LoaderIcon, StarIcon } from '@/icons';
import { cn } from '@/lib/utils';
import type { GithubRepoResponse } from '~/types/github';

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

type RepoT = {
  repo: GithubRepoResponse['data'][0];
} & AnchorProps;

const Repo = ({ repo, className, ...props }: RepoT) => {
  return (
    <a
      className={cn(
        'bg-[#E0E0E0] min-h-[5rem] h-full px-2 py-1.5 rounded-sm w-full',
        className
      )}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      title={repo.name}
      {...props}>
      <div className="flex justify-between">
        <p className="font-semibold text-lg">{repo.name}</p>
        <span className="inline-flex items-center gap-1.5 font-bold">
          {repo.stargazers_count && repo.stargazers_count > 0
            ? repo.stargazers_count
            : null}
          <StarIcon
            className={cn(
              'w-4',
              repo.stargazers_count &&
                repo.stargazers_count > 0 &&
                'fill-current'
            )}
          />
        </span>
      </div>
      <p className="text-sm">{repo.description}</p>
    </a>
  );
};

const RepoLoading = () => {
  return (
    <div className="bg-[#E0E0E0] min-h-[5rem] grid place-content-center">
      <LoaderIcon className="animate-spin text-[#2D9CDB]" />
    </div>
  );
};

export { Repo, RepoLoading };

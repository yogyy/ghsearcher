import { Star } from '@/icons';
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
        'bg-primary/25 min-h-[5rem] h-auto px-2 py-1.5 rounded-sm',
        'hover:bg-primary/50 focus:bg-primary/50 transition-colors duration-200',
        'text-foreground min-w-fit',
        className
      )}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      title={repo.name}
      {...props}>
      <div className="flex justify-between">
        <p className="text-base md:text-lg font-medium text-inherit">
          {repo.name.slice(0, 20)}
        </p>
        <span className="inline-flex items-center gap-1.5 font-semibold text-accent">
          {repo.stargazers_count && repo.stargazers_count > 0
            ? repo.stargazers_count
            : null}
          <Star
            className={cn(
              'w-4',
              repo.stargazers_count &&
                repo.stargazers_count > 0 &&
                'fill-foreground text-foreground'
            )}
          />
        </span>
      </div>
      <p className="text-inherit text-xs md:text-sm w-auto">
        <span className="block sm:hidden">
          {repo.description && repo.description.length >= 40 ? (
            <>{repo.description.slice(0, 40)}...</>
          ) : (
            repo.description
          )}
        </span>
        <span className="hidden sm:block">{repo.description}</span>
      </p>
    </a>
  );
};

export default Repo;

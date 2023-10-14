import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { useQuery } from '@tanstack/react-query';
import { GithubRepoResponse } from '~/types/github';
import octokit from '@/lib/octokit';
import { cn } from '@/lib/utils';
import Repo from './Repo';

interface AccordionType {
  value: string;
  title: string;
  link: string;
}

function Accordion({ link, title, value, ...props }: AccordionType) {
  const { data: repos, isLoading: repoLoading } = useQuery({
    queryKey: [`repos/${title}`],
    queryFn: async () => {
      try {
        const response: GithubRepoResponse = await octokit.request(
          'GET /users/{username}/repos',
          {
            username: title,
            sort: 'updated',
          }
        );
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch user repositories');
      }
    },
  });

  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="bg-primary/25 rounded-sm outline-none hover:bg-primary/50 focus:bg-primary/50 transition-colors duration-200 px-3">
        {title}
      </AccordionTrigger>
      <AccordionContent
        className={cn(
          'relative w-full',
          repos &&
            repos.length === 5 &&
            'data-[state=open]:duration-500 data-[state=close]:duration-500'
        )}
        {...props}>
        {repoLoading ? (
          <div className="bg-primary/40 min-h-[5rem] animate-pulse rounded-sm" />
        ) : (
          <>
            {repos && repos.length >= 1 ? (
              repos?.map(repo => <Repo key={repo.name} repo={repo} />)
            ) : (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium bg-destructive h-full px-2 py-1.5 italic rounded-sm">
                {title} doesn't have any public repositories yet.
              </a>
            )}
            {repos && repos.length >= 5 && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium bg-primary/25 hover:bg-primary/50 px-2 py-1.5 italic focus:bg-primary/50 transition-colors duration-200 rounded-sm">
                more repo
              </a>
            )}
          </>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
export { Accordion as UserAccordion };
// export const UserAccordion = memo(Accordion);

// await fetch(`https://api.github.com/users/${username}/repos`),

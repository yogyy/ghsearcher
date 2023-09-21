import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { useQuery } from '@tanstack/react-query';
import { GithubRepoResponse } from '~/types/github';
import octokit from '@/lib/octokit';
import { cn } from '@/lib/utils';
import { Repo, RepoLoading } from './Repo';

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
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent
        className={cn(
          'relative w-full',
          repos &&
            repos.length >= 10 &&
            'data-[state=open]:animate-accordion-down-long data-[state=close]:animate-accordion-up-long'
        )}
        {...props}>
        {repoLoading ? (
          <RepoLoading />
        ) : (
          <>
            {repos && repos.length! >= 1 ? (
              repos?.map(repo => <Repo key={repo.name} repo={repo} />)
            ) : (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium bg-[#E0E0E0] h-full px-2 py-1.5 italic">
                {title} doesn't have any public repositories yet.
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

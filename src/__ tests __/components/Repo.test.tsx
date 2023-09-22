import { UserRepo } from '@/test/dummyRepoUser';
import { screen, render } from '@testing-library/react';
import { Repo } from '@/components/layout/Repo';

describe('Repo', () => {
  it('should render repository details', async () => {
    // Mock the data that the Accordion component expects
    const mockRepos = UserRepo;

    render(
      <>
        {mockRepos && mockRepos.length! >= 1 ? (
          mockRepos?.map(repo => <Repo key={repo.name} repo={repo} />)
        ) : (
          <a
            href="/usergithub"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium bg-[#E0E0E0] h-full px-2 py-1.5 italic">
            doesn't have any public repositories yet.
          </a>
        )}
      </>
    );

    const repoElements = screen.getAllByRole('link');
    expect(repoElements).toHaveLength(mockRepos.length);
  });
});

import { UserAccordion } from '@/components/layout/Accordion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, render, fireEvent } from '@testing-library/react';
import { Accordion } from '@/components/ui/accordion';
import { SearchUserRes } from '@/test/dummySearchUser';

const queryClient = new QueryClient();

const MockUserAccordion = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-2.5">
        {SearchUserRes.items.map((res, i) => (
          <UserAccordion
            key={res.id}
            title={res.login}
            value={`items-${i + 1}`}
            link={res.html_url}
          />
        ))}
      </Accordion>
    </QueryClientProvider>
  );
};

describe('rendering search result', () => {
  it('should render user accordion components', () => {
    render(<MockUserAccordion />);

    const btnUser = screen.getAllByRole('button');
    expect(btnUser.length).toBe(4);

    btnUser.forEach(button => {
      expect(button).toHaveAttribute('data-state', 'closed');

      fireEvent.click(button);

      expect(button).toHaveAttribute('data-state', 'open');
    });
  });
});

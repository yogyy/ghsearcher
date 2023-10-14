import { Accordion } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserAccordion } from '@/components/layout/Accordion';
import { useUserStore } from '@/store/store';

const ResultSearch = () => {
  const result = useUserStore(state => state.result);
  const loading = useUserStore(state => state.loading);

  return (
    <ScrollArea className="h-[20rem]">
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-2.5 bg-inherit">
        {loading ? (
          [1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              className="bg-primary/40 rounded-sm h-9 grid place-content-center animate-pulse" />
          ))
        ) : (
          <>
            {result.map((res, i) => (
              <UserAccordion
                key={res.id}
                title={res.login}
                value={`items-${i + 1}`}
                link={res.html_url}
              />
            ))}
          </>
        )}
      </Accordion>
    </ScrollArea>
  );
};

export default ResultSearch;

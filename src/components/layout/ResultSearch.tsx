import { Accordion } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserAccordion } from '@/components/layout/Accordion';
import { useUserStore } from '@/store/store';
import { LoaderIcon } from '@/icons';

const ResultSearch = () => {
  const result = useUserStore(state => state.result);
  const loading = useUserStore(state => state.loading);

  return (
    <ScrollArea className="h-[24rem]">
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-2.5">
        {loading ? (
          [1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-[#E0E0E0] h-9 grid place-content-center">
              <LoaderIcon className="animate-spin text-[#2d9cdb] w-4" />
            </div>
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

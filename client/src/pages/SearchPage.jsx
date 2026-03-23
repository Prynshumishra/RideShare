import RideCard from '@/components/RideCard';
import Search from '@/components/Search';
import Sidebar from '@/components/Sidebar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/state-card';
import useFetch from '@/hooks/useFetch';
import { MoveRight, SlidersHorizontal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SearchPage = () => {
  const { search } = useLocation();
  const { from, to, date, seat } = Object.fromEntries(new URLSearchParams(search));

  const endpoint = from && to && date && seat
    ? `rides/find?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&seat=${encodeURIComponent(seat)}&date=${encodeURIComponent(date)}`
    : null;

  const { loading, data, error } = useFetch(endpoint);

  return (
    <main className="flex-1">
      <section className="border-b border-border/70 bg-background/70 py-6 backdrop-blur">
        <div className="page-container relative flex items-center justify-center">
          <Search />

          <Dialog>
            <DialogTrigger className="absolute right-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden">
              <SlidersHorizontal className="h-4 w-4" />
            </DialogTrigger>
            <DialogContent>
              <Sidebar />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="page-container section-spacing py-8 sm:py-10">
        <div className="grid gap-6 md:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden md:block">
            <div className="sticky top-20">
              <Sidebar />
            </div>
          </aside>

          <div className="space-y-4">
            {!endpoint && (
              <EmptyState
                title="Start your search"
                description="Select origin, destination, date, and seat count to discover available rides."
              />
            )}

            {loading && (
              <LoadingState
                title="Searching rides"
                description="Matching your route and travel date."
              />
            )}

            {error && (
              <ErrorState
                title="Unable to fetch rides"
                description={error?.message || 'Please try again in a moment.'}
              />
            )}

            {data && !loading && !error && (
              <>
                <header className="surface p-4 sm:p-5">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    {from} <MoveRight className="mx-1 inline-block h-4 w-4 text-primary" /> {to}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {data?.rides?.length || 0} ride{data?.rides?.length === 1 ? '' : 's'} available
                  </p>
                </header>

                {data.rides.length === 0 ? (
                  <EmptyState
                    title="No rides available"
                    description="Try a nearby city, different date, or fewer seats to see more options."
                  />
                ) : (
                  <div>
                    {data.rides.map((ride) => (
                      <Link key={ride._id} to={`/ride/${ride._id}`}>
                        <RideCard details={ride} />
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SearchPage;

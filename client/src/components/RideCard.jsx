import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const RideCard = ({details}) => {
  const {creator, origin, destination, startTime, endTime, price, availableSeats} = details;

  function getTime(dateTimeInput){
    const selectedDate = new Date(dateTimeInput);
    const hours = String(selectedDate.getHours()).padStart(2, "0");
    const minutes = String(selectedDate.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <article className="surface my-3 p-4 transition-colors hover:border-primary/30 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="relative border-s border-border/80 pl-5">
          <div className="mb-5 ms-1.5">
            <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-primary" />
            <time className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{getTime(startTime)}</time>
            <h3 className="font-display text-base font-semibold text-foreground sm:text-lg">{origin.place}</h3>
          </div>

          <div className="ms-1.5">
            <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-primary/80" />
            <time className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{getTime(endTime)}</time>
            <h3 className="font-display text-base font-semibold text-foreground sm:text-lg">{destination.place}</h3>
          </div>
        </div>

        <div className="inline-flex items-center rounded-xl bg-secondary px-3 py-2 text-sm font-semibold text-foreground">
          <span className="text-primary">INR</span>
          <span className="ml-1 text-lg">{price}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-4">
        <div className="inline-flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src={creator?.profilePicture} />
            <AvatarFallback>{creator?.name?.[0] || "R"}</AvatarFallback>
          </Avatar>
          <span className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">{creator?.name || "Ride host"}</span>
            <span className="text-xs text-muted-foreground">{availableSeats} seats left</span>
          </span>
        </div>
      </div>
    </article>
  )
}

export default RideCard
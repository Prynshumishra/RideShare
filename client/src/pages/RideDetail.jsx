import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/state-card"
import { Toaster } from "@/components/ui/sonner"
import useFetch from "@/hooks/useFetch"
import { MoveDown, MoveRight, Star } from "lucide-react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { format, formatDistance } from "date-fns";
import axios from "axios"
import { useState } from "react"

const apiUri = import.meta.env.VITE_REACT_API_URI

const RideDetail = () => {
  const { rideId } = useParams();
  const { loading, data, error } = useFetch(`rides/${rideId}`);
  const [isBooking, setIsBooking] = useState(false)

  const handleBook = async() => {
    setIsBooking(true)
    try{
      const res = await axios.post(`${apiUri}/rides/${rideId}/join`, {}, {withCredentials: true})
      toast(res.data?.message || "Ride booked", {
        description: format(new Date(), "PPp"),
      });
    }catch(err){
      toast(err.response?.data?.message || "Unable to book this ride")
    } finally {
      setIsBooking(false)
    }
  };

  if (loading) {
    return (
      <main className="page-container section-spacing">
        <LoadingState title="Loading ride details" description="Preparing route and host information." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container section-spacing">
        <ErrorState title="Unable to open this ride" description={error?.message || "Ride not found"} />
      </main>
    );
  }

  if (!data) {
    return (
      <main className="page-container section-spacing">
        <EmptyState title="Ride unavailable" description="This ride may have been canceled or removed." />
      </main>
    );
  }

  return (
    <main className="page-container section-spacing">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="surface p-5 sm:p-6">
          <div className="flex flex-col gap-4 border-b border-border/70 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Ride route</p>
              <h1 className="mt-2 font-display text-3xl font-semibold leading-tight">{data?.origin?.place}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{format(new Date(data?.startTime), "PPp")}</p>
            </div>

            <MoveRight size={32} className="hidden text-primary sm:block" />
            <MoveDown size={28} className="block text-primary sm:hidden" />

            <div>
              <h2 className="font-display text-3xl font-semibold leading-tight">{data?.destination?.place}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{format(new Date(data?.endTime), "PPp")}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Duration</p>
              <p className="mt-1 text-sm font-medium text-foreground">{formatDistance(new Date(data.startTime), new Date(data.endTime))}</p>
            </div>
            <div className="surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Seats left</p>
              <p className="mt-1 text-sm font-medium text-foreground">{data?.availableSeats}</p>
            </div>
            <div className="surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Price</p>
              <p className="mt-1 text-sm font-medium text-foreground">INR {data?.price} per passenger</p>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="mt-6">Book ride</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm your booking</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure to confirm your ride? This action will finalize your participation in the shared journey.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleBook} disabled={isBooking}>
                  {isBooking ? "Booking..." : "Continue"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {data?.vehicleDetails?.model && (
            <p className="mt-4 text-sm text-muted-foreground">Vehicle: {data.vehicleDetails.model}</p>
          )}
        </section>

        <aside className="surface p-5 sm:p-6">
          <h3 className="font-display text-xl font-semibold">Host details</h3>
          <div className="mt-5 flex items-center gap-3 border-b border-border/70 pb-5">
            <Avatar className="h-11 w-11 border border-border">
              <AvatarImage src={data?.creator?.profilePicture}/>
              <AvatarFallback className="select-none text-sm font-bold text-primary">{data?.creator?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-foreground">{data?.creator?.name}</p>
              <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Star fill="yellow" size={14} className="text-transparent" />
                {data?.creator?.stars || 0} ratings
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2 text-sm text-muted-foreground">
            <p>{data?.creator?.age ? `${data?.creator?.age} y/o` : "Age not provided"}</p>
            <p>{data?.creator?.ridesCreated?.length || 0} rides published</p>
            <p>Member since {data?.creator?.createdAt?.substring(0, 4) || "-"}</p>
          </div>

          <div className="mt-5 space-y-2">
            <p className="text-sm font-semibold text-foreground">Preferences</p>
            <p className="text-sm text-muted-foreground">Smoking: {data?.creator?.profile?.preferences?.smoking || "No preference"}</p>
            <p className="text-sm text-muted-foreground">Music: {data?.creator?.profile?.preferences?.music || "No preference"}</p>
            <p className="text-sm text-muted-foreground">Pets: {data?.creator?.profile?.preferences?.petFriendly ? "Pet friendly" : "No pets"}</p>
          </div>
        </aside>
      </div>
      <Toaster />
    </main>
  );
};

export default RideDetail
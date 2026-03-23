import RideCard from "@/components/RideCard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/state-card"
import { Toaster } from "@/components/ui/sonner"
import { Textarea } from "@/components/ui/textarea"
import { AuthContext } from "@/context/AuthContext"
import useFetch from "@/hooks/useFetch"
import axios from "axios"
import { Pencil, Star, Trash } from "lucide-react"
import { Fragment, useContext, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import { toast } from "sonner"
const apiUri = import.meta.env.VITE_REACT_API_URI

const Profile = () => {
  const {user} = useContext(AuthContext)

  if(!user) return <Navigate to="/" replace />;

  const [rideDeleteMode, setRideDeleteMode] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const {loading, data, error, refetch} = useFetch(`users/${user.user._id}`, true)

  const { control, formState, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      bio: "",
    },
  })

  const { isSubmitting } = formState;

  useEffect(() => {
    if (data) {
      reset({
        name: data?.name || "",
        bio: data?.profile?.bio || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (newData) => {
    try {
      await axios.patch(`${apiUri}/users/${user.user._id}`, {
        name: newData.name.trim(),
        profile: { ...(data?.profile || {}), bio: newData.bio.trim() }
      }, {withCredentials:true});
      refetch();
      setEditMode(false)
      toast("Profile updated")
    } catch (error) {
      toast(error?.response?.data?.message || "Unable to update profile");
    }
  }

  async function handleDelete(id){
    try {
      await axios.delete(`${apiUri}/rides/${id}`, {withCredentials:true});
      refetch();
      toast("Ride deleted")
    } catch (error) {
      toast(error?.response?.data?.message || "Unable to delete ride");
    }
  }

  if (loading) {
    return (
      <main className="page-container section-spacing">
        <LoadingState title="Loading profile" description="Fetching your account and ride activity." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container section-spacing">
        <ErrorState title="Unable to load profile" description={error?.message || "Please refresh and try again."} />
      </main>
    );
  }

  return (
    <main className="page-container section-spacing">
      <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="surface p-5 sm:p-6">
          <div className="relative flex w-full items-center gap-3 border-b border-border/70 pb-5">
            <Avatar className="h-12 w-12 border border-border">
              <AvatarImage src={data?.profilePicture} />
              <AvatarFallback className="select-none text-base font-bold text-primary">{data?.name?.[0]}</AvatarFallback>
            </Avatar>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Pencil size={20} className="absolute bottom-2 left-8 cursor-pointer rounded-full border border-border bg-background p-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Label htmlFor='avatar' className='cursor-pointer font-normal'>Upload image</Label>
                  <Input type="file" id='avatar' className="hidden" />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <p>Remove profile image</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">{data?.name}</p>
              <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Star fill="yellow" size={14} className="text-transparent" />
                {data?.stars || 0} - {data?.ratings?.length || 0} ratings
              </div>
            </div>
          </div>

          {!editMode ?
            <>
              <Button variant='outline' className="mt-5 w-full" onClick={() => setEditMode(true)}>Edit profile</Button>

              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <h3 className="font-display text-base font-semibold text-foreground">About</h3>
                <p>{data?.profile?.bio || "No bio added yet."}</p>
                <p>{data?.age ? `${data?.age} y/o` : "Age not provided"}</p>
                <p>{data?.ridesCreated?.length || 0} rides published</p>
                <p>Member since {data?.createdAt?.substring(0,4) || "-"}</p>
              </div>

              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <h3 className="font-display text-base font-semibold text-foreground">Preferences</h3>
                <p>Music: {data?.profile?.preferences?.music || "No preference"}</p>
                <p>Smoking: {data?.profile?.preferences?.smoking || "No preference"}</p>
                <p>Pets: {data?.profile?.preferences?.petFriendly ? "Pet friendly" : "Not pet friendly"}</p>
              </div>
            </>
            :
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-3">
              <Label htmlFor="name">Name</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input required autoComplete="name" placeholder="Full name" id="name" {...field} />}
              />

              <Label htmlFor="bio">Bio</Label>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => <Textarea placeholder="A short intro about you" id="bio" {...field} />}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
              <Button type="button" variant='outline' onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </form>
          }
        </aside>

        <section className="space-y-6">
          <div className="surface p-5 sm:p-6">
            <header className="mb-4 flex items-center justify-between">
              <h1 className="font-display text-xl font-semibold">Published rides</h1>
              <Button variant={rideDeleteMode ? "default" : "outline"} size="sm" onClick={() => setRideDeleteMode(!rideDeleteMode)}>
                {rideDeleteMode ? "Done" : "Manage"}
              </Button>
            </header>

            <ScrollArea className="h-[320px] w-full rounded-xl border border-border/70 bg-background/50 p-3">
              {data?.ridesCreated?.length === 0 ? (
                <EmptyState
                  className="border-none bg-transparent shadow-none"
                  title="No rides published"
                  description="Your published rides will appear here once you create one."
                />
              ) : (
                data?.ridesCreated?.map((ride) =>
                  <Fragment key={ride._id}>
                    <RideCard details={ride} />
                    {rideDeleteMode && (
                      <Button variant="ghost" className="mb-3 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={()=> handleDelete(ride._id)}>
                        <Trash className="h-4 w-4" /> Delete ride
                      </Button>
                    )}
                  </Fragment>
                )
              )}
            </ScrollArea>
          </div>

          <div className="surface p-5 sm:p-6">
            <header className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Recently joined rides</h2>
            </header>

            <ScrollArea className="h-[320px] w-full rounded-xl border border-border/70 bg-background/50 p-3">
              {data?.ridesJoined?.length === 0 ? (
                <EmptyState
                  className="border-none bg-transparent shadow-none"
                  title="No joined rides"
                  description="Rides you join will be listed here for quick access."
                />
              ) : (
                data?.ridesJoined?.map((ride) =>
                  <RideCard key={ride._id} details={ride} />
                )
              )}
            </ScrollArea>
          </div>
        </section>
      </div>
      <Toaster />
    </main>
  )
}

export default Profile
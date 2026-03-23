import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
const apiUri = import.meta.env.VITE_REACT_API_URI

const formSchema = z.object({
  from: z.string().trim().min(2, "Enter an origin"),
  to: z.string().trim().min(2, "Enter a destination"),
  seat: z.number().min(1).max(10),
  price: z.number().nonnegative("Price cannot be negative"),
  startTime: z.date(),
  endTime: z.date()
}).refine((values) => values.startTime > new Date(), {
  message: "Departure time must be in the future",
  path: ["startTime"],
}).refine((values) => values.endTime > values.startTime, {
  message: "Arrival should be after departure",
  path: ["endTime"],
})

const toDateTimeLocal = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 16);
};


const PublishCard = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: "",
      to: "",
      seat: 1,
      price: 0,
      startTime: new Date(),
      endTime: new Date(),
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data) => {
    try {
      const body = {
        "availableSeats": data.seat,
        "origin": {
          "place": data.from.trim(),
        },
        "destination": {
          "place": data.to.trim(),
        },
        "startTime": data.startTime,
        "endTime": data.endTime,
        "price": data.price
      }
      await axios.post(`${apiUri}/rides`, body, {withCredentials: true});
      toast("Ride published successfully")
      form.reset()
    } catch (error) {
      toast(error?.response?.data?.message || "Unable to publish ride")
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create a Ride</CardTitle>
        <CardDescription>Share your route details to match with passengers.</CardDescription>
      </CardHeader>
      <CardContent>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-center gap-4">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>From</FormLabel>
                <FormControl>
                  <Input placeholder="Origin city" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>To</FormLabel>
                <FormControl>
                  <Input placeholder="Destination city" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="seat"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  <FormLabel>Available seats</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Button variant="outline" size="icon" type="button" onClick={() => field.value>1 && field.onChange(field.value - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center text-sm font-semibold">{field.value}</span>
                      <Button variant="outline" size="icon" type="button" onClick={() => field.value<10 && field.onChange(field.value + 1)}  >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-1.5">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      min="0"
                      step="1"
                      value={Number.isNaN(field.value) ? 0 : field.value}
                      onChange={(event) => field.onChange(Number(event.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Price per passenger (INR)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>Departure Time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" placeholder="Departure time" {...field}
                    value={toDateTimeLocal(field.value)}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />  
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>Arrival Time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" placeholder="Arrival time" {...field}
                    value={toDateTimeLocal(field.value)}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish ride"}
          </Button>
        </form>
      </Form>
      </CardContent>
      <Toaster />
    </Card>
  )
}

export default PublishCard
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { format } from "date-fns"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { CalendarIcon, MapPin, Minus, Plus, User } from "lucide-react"
import { Input } from "./ui/input"
import { useSearchParams } from "react-router-dom"


const searchSchema = z.object({
  from: z.string().trim().min(2, "Enter at least 2 characters"),
  to: z.string().trim().min(2, "Enter at least 2 characters"),
  seat: z.number().int().min(1).max(10),
  date: z.date(),
})

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams({from:"",to:"",seat:"",date:""})
  const parsedDate = searchParams.get("date") ? new Date(searchParams.get("date")) : null;
  const parsedSeat = Number.parseInt(searchParams.get("seat"), 10);

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      from: searchParams.get("from") || "",
      to: searchParams.get("to") || "",
      seat: Number.isInteger(parsedSeat) && parsedSeat >= 1 && parsedSeat <= 10 ? parsedSeat : 1,
      date: parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate : new Date()
    },
  });

  const onSubmit = form.handleSubmit((formData) => {
    setSearchParams({
      from: formData.from,
      to: formData.to,
      seat: String(formData.seat),
      date: format(formData.date, "yyyy-MM-dd"),
    }, {replace: true});
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="surface fade-in-up grid w-full gap-3 p-3 sm:p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_210px_150px_auto] lg:items-end">
        <div className="min-w-0">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>From</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Origin" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="min-w-0">
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>To</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Destination" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("h-11 w-full justify-start", !field.value && "text-muted-foreground" )}>
                          <CalendarIcon size={16} className="mr-2 text-muted-foreground" />
                          {field.value ? (
                            format(field.value, "dd MMM yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(value) => value < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

        </div>

        <div>
          <FormField
            control={form.control}
            name="seat"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Seats</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={"outline"} className={cn("h-11 w-full justify-start")} >
                        <User size={16} className="mr-2 text-muted-foreground" />
                        <span>{field.value} passenger{field.value > 1 ? "s" : ""}</span>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3" align="start">
                    <div className="p-4 flex gap-2 items-center">
                      <Button variant="outline" size="icon" type="button" onClick={() => field.value>1 && field.onChange(field.value - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span>{field.value}</span>
                      <Button variant="outline" size="icon" type="button" onClick={() => field.value<10 && field.onChange(field.value + 1)}  >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="h-11 w-full lg:w-auto">Search rides</Button>
      </form>
    </Form>
    
  )
}

export default Search
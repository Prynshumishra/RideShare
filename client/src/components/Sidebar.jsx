import { IndianRupee, Clock, Hourglass } from 'lucide-react'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Checkbox } from './ui/checkbox'

const Sidebar = () => {
  const sortBy = [
    { 
      icon: <IndianRupee size={16} />,
      title: "Earliest departure",
      value: "earliest_departure",
    },
    {
      icon: <Clock size={16} />,
      title: "Lowest price",
      value: "lowest_price",
    },
    {
      icon: <Hourglass size={16} />,
      title: "Shortest ride",
      value: "shortest_ride",
    },
  ]
  const departureTime= [
    {
      name: "departure_before_six_am",
      title: "Before 6:00"
    },
    {
      name: "departure_six_to_noon",
      title: "6:00 - 12:00"
    },
    {
      name: "departure_noon_to_six",
      title: "12:00 - 18:00"
    },
  ]
  
  return (
    <aside className="surface space-y-6 p-4 sm:p-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Sort by</h2>
          <button type="button" className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
            Reset
          </button>
        </div>

        <RadioGroup className="space-y-2">
          {sortBy.map(s => 
            <Label key={s.value} htmlFor={s.value} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border/70 bg-card p-3 text-sm transition-colors hover:bg-secondary">
              {s.icon}
              <span className="font-medium text-foreground">{s.title}</span>
              <RadioGroupItem value={s.value} className="ml-auto" id={s.value} />
            </Label>
          )}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <h2 className="font-display text-lg font-semibold">Departure window</h2>
        {departureTime.map(d => 
          <Label key={d.title} htmlFor={d.name} aria-label={d.name} className="mt-2 flex cursor-pointer items-center justify-between rounded-xl border border-border/70 bg-card p-3 text-sm transition-colors hover:bg-secondary">
            {d.title}
            <Checkbox name={d.name} id={d.name} />
          </Label>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
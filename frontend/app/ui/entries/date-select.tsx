import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Race } from "@/lib/definitions"

export default function DateSelect ( ) {
  const [dates, setDates] = useState<Array<string> | []>([])

  const hoge = (array: any) => array.races.map((race: Race) => race.date)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_HOST}/races`)
      .then((response) => response.json())
      .then(data => {
        const uniqueDates: Array<string> = Array.from(new Set(data.races.map((race: Race) => race.date)));
        setDates(uniqueDates[0])
      }
       )
  }, [])

  return (
    <Select>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Racedate" />
      </SelectTrigger>
      <SelectContent>
        {dates.map(date => (
          <SelectItem value={date}>{date}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};


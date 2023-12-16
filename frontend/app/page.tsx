'use client';
import { useEffect, useState } from "react"
// import { fetchTrack } from '@/lib/data';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import DateSelect from "@/app/ui/entries/date-select"
// import TrackTab from "@/app/ui/entries/track-tab"
// import { Skeleton } from "@/components/ui/skeleton"
import { Race,Entry } from "@/lib/definitions"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [races, setRaces] = useState<Race[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [dates, setDates] = useState<Array<string>>([]);

  const fetchRaceDetails = (raceId: number) => {
    fetch(`${process.env.NEXT_PUBLIC_APP_HOST}/races/${raceId}`)
      .then(response => response.json())
      .then(data => {
        setEntries(data.race);
      })
      .catch(error => console.error('Error fetching race details: ', error));
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_HOST}/races`)
      .then(response => response.json())
      .then(data => {
        setRaces(data.races);
        const uniqueDates: Array<string> = Array.from(new Set(data.races.map((race: Race) => race.date)));
        const uniqueTracks: Array<string> = Array.from(new Set(data.races.map((race: Race) => race.track)));
        setSelectedTab(uniqueTracks[0]);
        setDates(uniqueDates);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);
  return (

    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Select>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Racedate" />
          </SelectTrigger>
          <SelectContent>
            {dates.map((date, index) => (
              <SelectItem key={index} value={date}>{date}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Tabs defaultValue={selectedTab}  className="w-[2000px]">
          <TabsList className="w-[300px]">
            {Array.from(new Set(races.map(race => race.track))).map(track => (
              <TabsTrigger key={track} value={track} className="w-[100px]" onClick={() => setSelectedTab(track)}>
                {track}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={selectedTab}>
              <section className="w-full py-12">
                <div className="container grid gap-6 md:gap-8 px-4 md:px-6 lg:grid-cols-4">
                  {races.filter(race => race.track === selectedTab).map(race => (
                    <Card className="col-span-1" key={race.id} >
                      <CardHeader>
                        <CardTitle>{race.name}</CardTitle>
                        <CardDescription>{race.date}{race.track}{race.number}R</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Badge>{race.type}</Badge>
                          <Badge>{race.turn}</Badge>
                          <Badge>{race.distance}m</Badge>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline"  onClick={() => fetchRaceDetails(race.id)}>出馬表</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>
          </TabsContent>
        </Tabs>
        <Table>
          <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">枠番</TableHead>
                <TableHead className="w-[200px]">馬番</TableHead>
                <TableHead>馬名</TableHead>
                <TableHead>性齢</TableHead>
                <TableHead>騎手</TableHead>
                <TableHead>斤量</TableHead>
                <TableHead>予想</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map(entry => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.bracket_number}</TableCell>
                  <TableCell className="font-medium">{entry.horse_number}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span>{entry.horse_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span>{entry.sex_age}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span>{entry.jockey_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span>{entry.jockey_weight}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge>{entry.score}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>    
      </div>
    </>
  )
}

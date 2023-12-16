import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Race,Entry } from "@/lib/definitions"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

export default function RaceTabs () {
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [races, setRaces] = useState<Race[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);

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
        const uniqueTracks: Array<string> = Array.from(new Set(data.races.map((race: Race) => race.track)));
        setSelectedTab(uniqueTracks[0]);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <>
      <Tabs defaultValue={selectedTab}  className="w-[1200px]">
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
                  <Card key={race.id} >
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
    </>

  );
};


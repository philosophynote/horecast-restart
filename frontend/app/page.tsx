'use client';
// // import Image from 'next/image'
import { useState, useEffect } from "react"
import { fetchTrack } from '@/lib/data';
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



interface Race {
  id: number,
  date: string,
  track: string,
  number: number,
  name: string,
}

interface Track {
  id: number,
  name: string
}

export default function Home() {
  const [raceDate, setRaceDate] = useState(null);
  const [raceTrack, setRaceTrack] = useState(null);
  const [raceNumber, setRaceNumber] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetchTrack().then(data => {
      const hoge = data.map((d: Race) => {[d.id,d.track]})
      setTracks(hoge)
    })
  }, []);

  // const handleLocationClick = (location) => {
  //   setTracks(location);
  // };

  return (
    // <>
    //   {tracks.map((track) => (
    //     <button key={track[0]} onClick={() => handleLocationClick(track)}>
    //       {track[1]}
    //     </button>
    //   ))}
    //   {/* 選択された競馬場のレース情報を表示するコンポーネント */}
    // </>
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Select>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Racedate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023/12/10">2023/12/10</SelectItem>
            <SelectItem value="2023/12/09">2023/12/09</SelectItem>
            <SelectItem value="2023/12/03">2023/12/03</SelectItem>
          </SelectContent>
        </Select>
        <Tabs defaultValue="tokyo" className="w-[1200px]">
          <TabsList className="w-[300px]">
            <TabsTrigger value="tokyo" className="w-[100px]">東京</TabsTrigger>
            <TabsTrigger value="kyoto" className="w-[100px]">京都</TabsTrigger>
            <TabsTrigger value="fukushima" className="w-[100px]">福島</TabsTrigger>
          </TabsList>
          <TabsContent value="tokyo">
            <section className="w-full py-12">
              <div className="container grid gap-6 md:gap-8 px-4 md:px-6 lg:grid-cols-4">
                {/* <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                  <div className="grid gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">Upcoming Horse Races</h1>
                    <p className="text-gray-500 dark:text-gray-400">Explore and place bets on your favorite races!</p>
                  </div>
                </div> */}
                <Card>
                  <CardHeader>
                    <CardTitle>ジャパンカップ</CardTitle>
                    <CardDescription>12/10 東京 12R</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Badge>芝</Badge>
                      <Badge>左</Badge>
                      <Badge>2400m</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>ジャパンカップ</CardTitle>
                    <CardDescription>12/10 東京 12R</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Badge>芝</Badge>
                      <Badge>左</Badge>
                      <Badge>2400m</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>ジャパンカップ</CardTitle>
                    <CardDescription>12/10 東京 12R</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Badge>芝</Badge>
                      <Badge>左</Badge>
                      <Badge>2400m</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>ジャパンカップ</CardTitle>
                    <CardDescription>12/10 東京 12R</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Badge>芝</Badge>
                      <Badge>左</Badge>
                      <Badge>2400m</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>
          <TabsContent value="kyoto">
            <section className="w-full py-12">
              <div className="container grid gap-6 md:gap-8 px-4 md:px-6 lg:grid-cols-3">
                {/* <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                  <div className="grid gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">Upcoming Horse Races</h1>
                    <p className="text-gray-500 dark:text-gray-400">Explore and place bets on your favorite races!</p>
                  </div>
                </div> */}
                <Card>
                  <CardHeader>
                    <CardTitle>Derby Championship</CardTitle>
                    <CardDescription>12 Dec 2023, 14:00, Kentucky, USA</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Badge>Thunderbolt - John Doe</Badge>
                      <Badge>Lightning - Jane Doe</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Preakness Stakes</CardTitle>
                    <CardDescription>19 Dec 2023, 16:00, Maryland, USA</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Badge>Black Pearl - Richard Roe</Badge>
                      <Badge>White Diamond - Jane Smith</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Belmont Stakes</CardTitle>
                    <CardDescription>26 Dec 2023, 15:00, New York, USA</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Badge>Golden Sun - Baby Doe</Badge>
                      <Badge>Silver Moon - Johnny Smith</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>
          <TabsContent value="fukushima">a</TabsContent>
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
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span>リバティアイランド</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span>牝3</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span>川田</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span>53</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge>Technology</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell className="font-medium">2</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span>イクイノックス</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span>牡4</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span>C・ルメール</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span>58</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">Technology</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">2</TableCell>
              <TableCell className="font-medium">3</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span>タイトルホルダー</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span>牡5</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span>横山和</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span>58</span>
                </div>
              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    </>


  )
}

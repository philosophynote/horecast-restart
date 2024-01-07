export type Race = {
  id: number;
  name: string;
  date: string;
  track: string;
  number: string;
  type: string;
  turn: string;
  distance: string;
}

export type Entry = {
  id: number;
  bracket_number: string;
  horse_number: string;
  horse_name: string;
  sex_age: string;
  jockey_name: string;
  jockey_weight: string;
  recommend: boolean;
  rank: number;
  result: number;
}
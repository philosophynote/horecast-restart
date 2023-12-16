import { unstable_noStore as noStore } from 'next/cache';
import {
  Race
} from './definitions';

export async function fetchTrack() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_HOST}/races?date=2023-12-10`)
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return await response.json();
}

export async function fetchDate() {
  noStore();
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_APP_HOST}/races`)
    const hoge = data.races.map((race: Race) => race.date)

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { address } = await request.json();
    
    const encodedAddress = encodeURIComponent(address);
    const url = 'https://zillow-working-api.p.rapidapi.com/pricehistory';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'accept-language': 'uk,en-US;q=0.9,en-GB;q=0.8,en;q=0.7,ru;q=0.6',
        'x-rapidapi-host': 'zillow-working-api.p.rapidapi.com',
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Zillow API' }, 
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const byaddress = searchParams.get('byaddress');
    
    if (!byaddress) {
      return NextResponse.json(
        { error: 'Address is required' }, 
        { status: 400 }
      );
    }

    const encodedAddress = encodeURIComponent(byaddress);
    const url = 'https://zillow-working-api.p.rapidapi.com/pricehistory';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'accept-language': 'uk,en-US;q=0.9,en-GB;q=0.8,en;q=0.7,ru;q=0.6',
        'x-rapidapi-host': 'zillow-working-api.p.rapidapi.com',
        'X-RapidAPI-Key': '8a4f7c83femshc4aef8e2542ecc7p124cf7jsn3b7c67944538',
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
      { error: 'Failed to fetch property data' }, 
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const portfoliosDir = path.join(process.cwd(), 'data', 'portfolios');

export async function GET(request, context) {
  try {
    const params = await context.params;
    const { id } = params;
    
    const portfolioPath = path.join(portfoliosDir, `${id}.json`);
    
    if (!fs.existsSync(portfolioPath)) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }

    const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'));
    return NextResponse.json(portfolioData);
  } catch (error) {
    console.error(`Error reading portfolio ${id}:`, error);
    return NextResponse.json(
      { error: 'Failed to load portfolio' },
      { status: 500 }
    );
  }
}
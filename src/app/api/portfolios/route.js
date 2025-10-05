import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const portfoliosDir = path.join(process.cwd(), 'data', 'portfolios');

export async function GET() {
  try {
    // Read the index file to get all portfolio references
    const indexPath = path.join(portfoliosDir, 'index.json');
    
    if (!fs.existsSync(indexPath)) {
      return NextResponse.json([], { status: 200 });
    }

    const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    const portfolios = [];

    // Handle both object with portfolios property and direct array
    const portfolioRefs = Array.isArray(indexData) ? indexData : indexData.portfolios;

    // Read each portfolio file
    for (const portfolioRef of portfolioRefs) {
      const portfolioPath = path.join(portfoliosDir, `${portfolioRef.id}.json`);
      
      if (fs.existsSync(portfolioPath)) {
        const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'));
        portfolios.push(portfolioData);
      }
    }

    return NextResponse.json(portfolios);
  } catch (error) {
    console.error('Error reading portfolios:', error);
    return NextResponse.json(
      { error: 'Failed to load portfolios' },
      { status: 500 }
    );
  }
}
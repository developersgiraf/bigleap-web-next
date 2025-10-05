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

export async function POST(request) {
  try {
    const portfolioData = await request.json();
    
    // Validate required fields
    if (!portfolioData.id || !portfolioData.title) {
      return NextResponse.json(
        { error: 'Missing required fields: id, title' },
        { status: 400 }
      );
    }

    const portfolioPath = path.join(portfoliosDir, `${portfolioData.id}.json`);
    
    // Check if portfolio already exists
    if (fs.existsSync(portfolioPath)) {
      return NextResponse.json(
        { error: 'Portfolio already exists' },
        { status: 409 }
      );
    }

    // Create the portfolio file
    fs.writeFileSync(portfolioPath, JSON.stringify(portfolioData, null, 2));

    // Update index file
    const indexPath = path.join(portfoliosDir, 'index.json');
    let indexData = [];
    
    if (fs.existsSync(indexPath)) {
      indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    }

    // Add to index if not already present
    const indexEntry = {
      id: portfolioData.id,
      title: portfolioData.cardData?.title || portfolioData.title,
      description: portfolioData.cardData?.description || portfolioData.description || '',
      image: portfolioData.cardData?.image || '',
      readbtn: portfolioData.cardData?.readbtn || 'Explore More',
      background: portfolioData.cardData?.background || 'linear-gradient(to bottom, #000000, #000000)',
      link: portfolioData.cardData?.link || `/portfolio/${portfolioData.id}`,
      order: portfolioData.order || 1,
      status: portfolioData.status || 'active'
    };

    if (!indexData.find(item => item.id === portfolioData.id)) {
      indexData.push(indexEntry);
      indexData.sort((a, b) => (a.order || 0) - (b.order || 0));
      fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));
    }

    return NextResponse.json(portfolioData, { status: 201 });
  } catch (error) {
    console.error('Error creating portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to create portfolio' },
      { status: 500 }
    );
  }
}
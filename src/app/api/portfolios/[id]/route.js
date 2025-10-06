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

export async function PUT(request, context) {
  try {
    const params = await context.params;
    const { id } = params;
    const portfolioData = await request.json();
    
    const portfolioPath = path.join(portfoliosDir, `${id}.json`);
    
    if (!fs.existsSync(portfolioPath)) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }

    // Update the portfolio file
    fs.writeFileSync(portfolioPath, JSON.stringify(portfolioData, null, 2));

    // Update index file
    const indexPath = path.join(portfoliosDir, 'index.json');
    if (fs.existsSync(indexPath)) {
      let indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
      
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

      const existingIndex = indexData.findIndex(item => item.id === id);
      if (existingIndex !== -1) {
        indexData[existingIndex] = indexEntry;
      } else {
        indexData.push(indexEntry);
      }
      
      indexData.sort((a, b) => (a.order || 0) - (b.order || 0));
      fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));
    }

    return NextResponse.json(portfolioData);
  } catch (error) {
    console.error(`Error updating portfolio ${id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update portfolio' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
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

    // Delete the portfolio file
    fs.unlinkSync(portfolioPath);

    // Update index file
    const indexPath = path.join(portfoliosDir, 'index.json');
    if (fs.existsSync(indexPath)) {
      let indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
      indexData = indexData.filter(item => item.id !== id);
      fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting portfolio ${id}:`, error);
    return NextResponse.json(
      { error: 'Failed to delete portfolio' },
      { status: 500 }
    );
  }
}
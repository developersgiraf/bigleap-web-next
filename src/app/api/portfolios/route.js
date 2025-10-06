// Simple Portfolios API - Clean & Fast!
import { portfoliosAPI } from '../../../lib/portfolios-simple.js';

// GET - Retrieve all portfolios (full data for admin)
export async function GET(request) {
  try {
    await portfoliosAPI.initialize();
    const { searchParams } = new URL(request.url);
    
    // Check if requesting lightweight index only
    const lightweight = searchParams.get('lightweight') === 'true';
    
    if (lightweight) {
      // Return lightweight index data
      const result = await portfoliosAPI.getAll();
      if (result.success) {
        return Response.json(result.data);
      } else {
        return Response.json(
          { error: 'Failed to load portfolios' },
          { status: 500 }
        );
      }
    } else {
      // Return full portfolio data for admin interface
      const result = await portfoliosAPI.getAllFull();
      if (result.success) {
        return Response.json(result.data);
      } else {
        return Response.json(
          { error: 'Failed to load portfolios' },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error('Error in portfolios API:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new portfolio
export async function POST(request) {
  try {
    const portfolioData = await request.json();
    
    // Validate required fields
    if (!portfolioData.title) {
      return Response.json({ 
        error: 'Missing required field: title' 
      }, { status: 400 });
    }
    
    const result = await portfoliosAPI.create(portfolioData);
    
    if (result.success) {
      return Response.json(result.data, { status: 201 });
    } else {
      return Response.json({ error: result.error }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ 
      error: 'Invalid request data' 
    }, { status: 400 });
  }
}
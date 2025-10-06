// Simple Portfolios API - Clean & Fast!
import { portfoliosAPI } from '../../../lib/portfolios-simple.js';

// GET - Retrieve all portfolios (lightweight index)
export async function GET() {
  await portfoliosAPI.initialize();
  const result = await portfoliosAPI.getAll();
  
  if (result.success) {
    // Return portfolios in the original format for backward compatibility
    return Response.json(result.data);
  } else {
    return Response.json(
      { error: 'Failed to load portfolios' },
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
// Simple Individual Portfolio API - Much cleaner!
import { portfoliosAPI } from '../../../../lib/portfolios-simple.js';

// GET - Get single portfolio
export async function GET(request, { params }) {
  const { id } = await params;
  const result = await portfoliosAPI.getById(id);
  
  if (result.success) {
    return Response.json(result.data);
  } else {
    return Response.json(
      { error: 'Portfolio not found' },
      { status: 404 }
    );
  }
}

// PUT - Update portfolio
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const portfolioData = await request.json();
    const result = await portfoliosAPI.update(id, portfolioData);
    
    if (result.success) {
      return Response.json(result.data);
    } else {
      return Response.json(
        { error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    return Response.json({ 
      error: 'Invalid request data' 
    }, { status: 400 });
  }
}

// DELETE - Delete portfolio
export async function DELETE(request, { params }) {
  const { id } = await params;
  const result = await portfoliosAPI.delete(id);
  
  if (result.success) {
    return Response.json({ success: true });
  } else {
    return Response.json(
      { error: result.error },
      { status: 400 }
    );
  }
}
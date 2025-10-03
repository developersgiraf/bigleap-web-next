// Simple Stats API
import { servicesAPI } from '../../../../lib/services-simple.js';

// GET - Get services statistics
export async function GET() {
  const result = await servicesAPI.getStats();
  return Response.json(result);
}
// Migration Script: Firebase → JSON Files
import { servicesAPI } from '../../../lib/services-simple.js';

// Simple migration from Firebase to JSON
export async function POST() {
  try {
    // This would normally fetch from Firebase and save to JSON
    // For now, let's create a sample service to test the system
    
    const sampleService = {
      title: "2D Animation",
      bannerTitle: "Professional 2D Animation Services",
      archived: false,
      index: 0,
      thumbnail: "/servicess/2danimation.png",
      section01: {
        image: "/servicess/2danimation.png",
        heading: "Professional 2D Animation",
        description: "We create stunning 2D animations that bring your ideas to life with creative storytelling and smooth motion graphics."
      },
      section02: {
        DescTitle: "Our 2D Animation Process",
        Descpara: "From concept to final animation, we ensure every frame tells your story perfectly.",
        subsections: [
          {
            heading: "Concept Development",
            description: "We start by understanding your vision and developing creative concepts."
          },
          {
            heading: "Storyboarding",
            description: "Creating detailed storyboards to visualize the animation flow."
          }
        ]
      },
      listHead: "What's Included",
      listPara: "Everything you need for professional 2D animation",
      list: [
        {
          title: "Character Design",
          description: "Custom character creation and design"
        },
        {
          title: "Motion Graphics",
          description: "Smooth and engaging motion graphics"
        }
      ]
    };

    const result = await servicesAPI.create(sampleService);
    
    if (result.success) {
      return Response.json({
        success: true,
        message: "Sample service created successfully! System is working.",
        data: result.data
      });
    } else {
      return Response.json(result, { status: 500 });
    }
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// GET - Check migration status
export async function GET() {
  try {
    const result = await servicesAPI.getAll();
    
    return Response.json({
      success: true,
      message: "JSON-based services system is ready!",
      servicesCount: result.data.length,
      system: "Local JSON files",
      location: "/data/services/"
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
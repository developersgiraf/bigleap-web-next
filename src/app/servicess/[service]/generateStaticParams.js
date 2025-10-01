import { getAllServiceSlugs } from "./utils/fetchServiceData";

export async function generateStaticParams() {
  try {
    const serviceSlugs = await getAllServiceSlugs();
    return serviceSlugs;
  } catch (error) {
    console.error('Error generating static params:', error);
    // Fallback to static service slugs
    return [
      { service: 'twoDanimation' },
      { service: 'threeDanimation' },
      { service: 'whiteboard-animation' },
      { service: 'character-design' },
      { service: 'motion-graphics' },
      { service: 'product-animation' },
      { service: 'vfx-post-production' },
      { service: 'video-editing-post-production' },
      { service: 'storytelling' }
    ];
  }
}
import Link from 'next/link';
import { servicesData } from '../../[service]/data/ServicePageData.js';

export default function OtherServices() {
    // Define the other services IDs
    const otherServiceIds = [
        'website-design',
        'mobile-app', 
        'e-commerce',
        'UI-UX-design',
        'branding',
        'photography'
    ];

    // Get the other services data from ServicePageData
    const otherServices = otherServiceIds.map(id => ({
        id,
        title: servicesData[id]?.title || servicesData[id]?.bannerTitle || id,
        description: servicesData[id]?.section01?.description || '',
        thumbnail: servicesData[id]?.thumbnail || '/servicess/default-image.png'
    }));

    return (
        <div>
            <h2>Other Services</h2>
            <ul>
                {otherServices.map((service) => (
                    <li key={service.id}>
                        <Link href={`/servicess/${service.id}`}>{service.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
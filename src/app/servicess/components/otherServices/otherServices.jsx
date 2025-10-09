export default function OtherServices() {
    const otherServices = [
        { id: 'website-design', title: 'Website Designing & Development' },
        { id: 'mobile-app', title: 'Mobile App Development' },
        { id: 'e-commerce', title: 'E-Commerce Web and App' },
        { id: 'UI-UX-design', title: 'UI/UX Designing' },
        { id: 'branding', title: 'Branding' },
        { id: 'photography', title: 'Photography & Videography' },
    ];

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
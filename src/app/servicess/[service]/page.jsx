
const data={
    "2danimation": {
        title: "2D Animation",
        description: "Description for 2D Animation",
        paragraph: "Detailed information about 2D Animation."
    },
    "3danimation": {
        title: "3D Animation",
        description: "Description for 3D Animation",
        paragraph: "Detailed information about 3D Animation."
    },
    "whiteboard-animation": {
        title: "Whiteboard Animation",
        description: "Description for Whiteboard Animation",
        paragraph: "Detailed information about Whiteboard Animation."
    }
}


export default function ServicePage({ params }) {
  const { service } = params;
  return (
    <div>
      <h1>{data[service].title}</h1>
      <p>{data[service].description}</p>
      <p>{data[service].paragraph}</p>
    </div>
  );
}

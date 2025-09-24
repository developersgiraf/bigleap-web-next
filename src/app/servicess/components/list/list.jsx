import styles from "./list.module.scss";
import ListItem from "./listItems";
export default function ListServices() {
  const list = [
    {
      
      title: "Explainer Videos",
      description:
        "Want to create an explanatory video for your product or highlight your key services? We are at your call to give the best 2D explainer videos. From conceptualization to illustration and animation, we make sure that each step is curated to meet your vision. ",
    },
    {
      title: "Corporate Presentations",
      description:
        "Create an organized and engaging corporate presentation that leaves a lasting impression on your audience. Effectively convey your brand value, purpose, services, and unique selling propositions through curated 2D corporate videos. Our creative team will ensure that you get the perfect business plan power point that will highlight your professionalism, all while making it visually appealing and tangible to your audience.",
    },
    {
      title: "Character Animation",
      description:
        "You dream it, we animate it. We offer top-tier character animation services that will bring your dream character to life.  A mascot that embodies your brand essence or a persona that reflects your brand identity, right from storyboarding to character designing to key framing, compositing , adding sound effects, and exporting, we will make sure that you get the perfect output.",
    },
    {
      title: "Motion Graphics",
      description:
        "Want your explanations to be more engaging and appealing? Then, motion graphics animation is the perfect tool that will help to amplify your messages.We emphasize compelling visual storytelling, paying close attention to every detail- including the shape of text, logo, icon, and other graphic elements.",
    },
    
  ];
  return (
    <>
      <section className={styles.listSection}>
        <div className="container">
          <div className={`row ${styles.all}`}>
            {list.map((item, idx) => (
              <ListItem
                key={idx}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

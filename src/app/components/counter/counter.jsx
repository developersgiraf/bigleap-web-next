
// 'use client'
// import { useEffect, useState } from "react";
// import styles from "../counter/counter.module.scss";

// const stats = [
//   { label: "Projects", target: 98 },
//   { label: "Clients", target: 65 },
//   { label: "Years", target: 10 },
//   { label: "Branches", target: 15 },
// ];

// export default function CounterHead() {
//   const [counts, setCounts] = useState(stats.map(() => 0));

//   useEffect(() => {
//     const duration = 1500;
//     const frameDuration = 16;
//     const increments = stats.map(
//       (stat) => stat.target / (duration / frameDuration)
//     );
//     let startCounts = [...counts];

//     let animationFrame;
//     function animate() {
//       let updated = false;
//       startCounts = startCounts.map((count, i) => {
//         if (count < stats[i].target) {
//           updated = true;
//           const next = count + increments[i];
//           return next < stats[i].target ? next : stats[i].target;
//         }
//         return count;
//       });
//       setCounts(
//         startCounts.map((c, i) =>
//           c < stats[i].target ? Math.floor(c) : stats[i].target
//         )
//       );
//       if (updated) {
//         animationFrame = requestAnimationFrame(animate);
//       }
//     }
//     animate();
//     return () => cancelAnimationFrame(animationFrame);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <section className={styles["stats-section"]}>
//       {stats.map((stat, i) => (
//         <React.Fragment key={stat.label}>
//           <div className={styles["stat-block"]}>
//             <span className={styles["stat-number"]}>{counts[i]}</span>
//             <span className={styles["stat-symbol"]}>+</span>
//             <span className={styles["stat-label"]}>{stat.label}</span>
//           </div>
//           {i < stats.length - 1 && (
//             <div className={styles["stat-divider"]}></div>
//           )}
//         </React.Fragment>
//       ))}
//     </section>
//   );
// }

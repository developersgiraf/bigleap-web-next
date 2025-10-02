"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./hero.module.css";

export default function HeroSection() {
  const [isCharacterHovered, setIsCharacterHovered] = useState(false);

  return (
    <section className={styles.hero}> 
      <div className={styles.hanging}>
      
        <motion.div
          className={styles.yeehaimage}
          animate={{
            x: isCharacterHovered ? "150vw" : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 30,
            damping: 2,
            mass: 0.8
          }}
        >
          <Image
            id="yeeha-img"
            src="/Yeeha.png"
            alt="yeeha"
            width={1711}
            height={655}
            priority
            style={{
              width: "100%",
              height: "auto"
            }}
          />
        </motion.div>
        { true && <motion.div
          className={styles.image360}
          initial={{ x: "150vw" }}
          animate={{
            x: isCharacterHovered ? 0 : "150vw",
          }}
          transition={{
            type: "spring",
            stiffness: 30,
            damping: 5,
            mass: 0.8
          }}
        >
          <Image
            id="three60-img"
            src="/digital360.png"
            alt="three60"
            width={599}
            height={353}
            priority
            style={{
              width: "100%",
              height: "auto"
            }}
          />
        </motion.div>}
        {/* <img id="img360" src="360.png" alt="360image" /> */}
        <motion.div
          id="character-img"
          className={styles.characterimage}
          style={{ 
            transformOrigin: "center center",
            position: "absolute",
            left: 0,
            right: 0,
            margin: "0 auto"
          }}
          initial={{ rotateZ: -20 }}
          whileHover={{ 
            rotateZ: 45,
            transition: {
              type: "spring",
              stiffness: 30,  // Faster animation
              damping: 2,     // Less bouncy
            }
          }}
          animate={{ rotateZ: 0 }}
          transition={{
            type: "spring",
            stiffness: 30,
            damping: 2,
          }}
          onMouseEnter={() => setIsCharacterHovered(true)}
          onMouseLeave={() => setIsCharacterHovered(false)}
        >
          <Image
            src="/characterr.png"
            alt="Character Image"
            fit="contain"
            width={911}
            height={944}
            priority
            style={{ 
              display: "block",
              width: "100%",
              height: "auto"
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
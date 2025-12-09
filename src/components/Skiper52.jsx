import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Simple cn() helper as React does not support "@/lib/utils"
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Skiper52 = () => {
  const images = [
    { src: "https://images-platform.99static.com//X3zzliPBTrm0guA1ODp7XitrbQc=/101x92:877x868/fit-in/500x500/projects-files/99/9975/997506/736f85f6-49a7-474c-b5b5-d629b70ca692.jpg", alt: "Illustrations by my fav AarzooAly", code: "# 23" },
    { src: "https://images-platform.99static.com//Y5mwmMlh2AYEdO3jkdkZc6oKxcU=/112x68:996x952/fit-in/500x500/projects-files/108/10868/1086886/2e3266ec-cdcf-4382-bb0a-cadc132c96b9.jpg", alt: "Illustrations by my fav AarzooAly", code: "# 23" },
    { src: "https://images-platform.99static.com//vWBHU7wg6B3gcON8tK4YyLYHJ44=/140x103:961x924/fit-in/500x500/projects-files/117/11772/1177210/4cd9a894-b6bb-4e13-be28-a0ff4da21a02.jpeg", alt: "Illustrations by my fav AarzooAly", code: "# 23" },
    { src: "https://images-workbench.99static.com/NoC-dW0j2TdHmSbasQqMM-Uc4wM=/99designs-contests-attachments/160/160134/attachment_160134446", alt: "Illustrations by my fav AarzooAly", code: "# 23" },
    { src: "https://images-workbench.99static.com/W41XNpKShUTKZvV7AsiXGVxo5Ic=/99designs-contests-attachments/147/147913/attachment_147913282", alt: "Illustrations by my fav AarzooAly", code: "# 23" },
    { src: "https://images-workbench.99static.com/Tv6k44ENkK1jTYe1Hgd6SSpIAfo=/http://s3.amazonaws.com/projects-files/176/17681/1768144/5b3af47e-af0f-46eb-a010-cf599656ab7a.jpg", alt: "Illustrations by my fav AarzooAly", code: "# 23" },
    { src: "https://images-workbench.99static.com/dkSxE23APe0sMzk24jU9FBNII4o=/99designs-contests-attachments/147/147911/attachment_147911072", alt: "Illustrations by my fav AarzooAly", code: "# 23" },
    { src: "https://images-workbench.99static.com/nI8HN78X0CxsZoC86GAkLt9vlSc=/99designs-contests-attachments/91/91087/attachment_91087986", alt: "Illustrations by my fav AarzooAly", code: "# 23" },
    { src: "https://images-workbench.99static.com/LhiX6AlYCxvgTYrqwF9mT7VfniM=/99designs-contests-attachments/123/123613/attachment_123613504", alt: "Illustrations by my fav AarzooAly", code: "# 23" },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-">
      <HoverExpand_001 images={images} />
    </div>
  );
};

export default Skiper52;

// ----------------------------------------------------

export const HoverExpand_001 = ({ images, className }) => {
  const [activeImage, setActiveImage] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className={cn("relative w-full max-w-6xl px-5", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex w-full items-center justify-center gap-1">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-3xl"
              initial={{ width: "2.5rem", height: "20rem" }}
              animate={{
                width: activeImage === index ? "24rem" : "5rem",
                height: "24rem",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-gradient-to-t from-black/40 to-transparent"
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute flex h-full w-full flex-col items-end justify-end p-4"
                  >
                    <p className="text-left text-xs text-white/50">
                      {image.code}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <img
                src={image.src}
                className="size-full object-cover"
                alt={image.alt}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

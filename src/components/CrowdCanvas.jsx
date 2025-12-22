import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CrowdCanvas = ({ src, rows = 15, cols = 7 }) => {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = { src, rows, cols };

    /* ---------- UTILS ---------- */
    const randomRange = (min, max) => min + Math.random() * (max - min);
    const randomIndex = (array) => (Math.random() * array.length) | 0;
    const removeFromArray = (array, i) => array.splice(i, 1)[0];
    const removeItemFromArray = (array, item) =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array) =>
      removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array) => array[randomIndex(array)];

    /* ---------- RESET ---------- */
    const resetPeep = ({ stage, peep }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = 100 - 250 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - peep.height + offsetY;

      let startX, endX;
      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return { startX, startY, endX };
    };

    const normalWalk = ({ peep, props }) => {
      const { startY, endX } = props;
      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));

      tl.to(peep, { duration: 10, x: endX, ease: "none" }, 0);
      tl.to(
        peep,
        {
          duration: 0.25,
          repeat: 40,
          yoyo: true,
          y: startY - 10,
        },
        0
      );

      return tl;
    };

    const walks = [normalWalk];

    /* ---------- PEEP ---------- */
    const createPeep = ({ image, rect }) => {
      const peep = {
        image,
        rect,
        width: rect[2],
        height: rect[3],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        render(ctx) {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.scale(this.scaleX, 1);
          ctx.drawImage(
            this.image,
            ...this.rect,
            0,
            0,
            this.width,
            this.height
          );
          ctx.restore();
        },
      };
      return peep;
    };

    /* ---------- MAIN ---------- */
    const img = new Image();
    const stage = { width: 0, height: 0 };
    const allPeeps = [];
    const availablePeeps = [];
    const crowd = [];

    const createPeeps = () => {
      const total = rows * cols;
      const rectW = img.naturalWidth / rows;
      const rectH = img.naturalHeight / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % rows) * rectW,
              ((i / rows) | 0) * rectH,
              rectW,
              rectH,
            ],
          })
        );
      }
    };

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({ peep, stage }),
      }).eventCallback("onComplete", () => {
        removeItemFromArray(crowd, peep);
        availablePeeps.push(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
    };

    const resize = () => {
      stage.width = wrapper.clientWidth;
      stage.height = wrapper.clientHeight;

      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      crowd.forEach((p) => p.walk && p.walk.kill());
      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      for (let i = 0; i < 8; i++) addPeepToCrowd();
    };

    const render = () => {
      ctx.clearRect(0, 0, stage.width, stage.height);
      crowd.forEach((p) => p.render(ctx));
    };

    img.onload = () => {
      createPeeps();
      resize();
      gsap.ticker.add(render);
    };

    img.src = config.src;
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      gsap.ticker.remove(render);
      crowd.forEach((p) => p.walk && p.walk.kill());
    };
  }, [src, rows, cols]);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 h-[90vh] w-full pointer-events-none"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default CrowdCanvas;

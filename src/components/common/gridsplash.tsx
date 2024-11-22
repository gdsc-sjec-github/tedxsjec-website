"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { tedxsjecAssetsPrefix } from "@/lib/utils";
const speakers = [
  {
    id: 1,
    name: "Karen Kshiti Suvarna",
    profession: "Film Director",
    description:
      "Karen Kshiti Suvarna's debut short film, Hide & Seek, has made waves in the film industry, winning the Best Debut Director (Female) at the Dadasaheb Phalke Achievers Awards 2024. The film has also been showcased at the prestigious Cannes Film Festival. It has also earned accolades across 12 other international festivals and received 15 nominations.",
    img: `${tedxsjecAssetsPrefix}/previous_Edition_photo's/image7.jpg`,
  },
  {
    id: 2,
    name: "Suma R Nayak",
    profession: "Advocate and Animal Welfare Activist",
    description:
      "Meet Mrs Suma R Nayak, an advocate by profession and animal & environment welfare activist by choice, who believes every creation of God has a right to live a life devoid of pain, suffering and live in dignity. She is the recipient of several awards for her services in the field of environment protection and animal welfare.",
    img: `${tedxsjecAssetsPrefix}/previous_Edition_photo's/image1.jpg`,
  },
  {
    id: 3,
    name: "Badekkila Pradeep",
    profession: "Actor | Voice Artist | Anchor",
    description:
      "Badekkila Pradeep is a versatile actor, model, writer, and distinguished voice artist from Karnataka. Beginning as a reporter in 2006, Pradeep found his passion in voice-over, transforming Kannada TV narration with his unique style. He's voiced popular shows like Bigg Boss Kannada, Bangalore metro announcements, and numerous campaigns across languages.",
    img: `${tedxsjecAssetsPrefix}/previous_Edition_photo's/image2.jpg`,
  },
  {
    id: 4,
    name: "Namitha Marimuthu",
    profession: "International Model, Actress",
    description:
      "Namitha Marimuthu is an international model, actress, and social activist who has made history as the first transgender woman to reach the finals of Miss Universe India in 2024. She is the CEO and founder of Miss Queen India and the owner of Alfeem India, both of which promote inclusivity and empowerment.",
    img: `${tedxsjecAssetsPrefix}/previous_Edition_photo's/image3.jpg `,
  },
  {
    id: 5,
    name: "Namitha Marimuthu",
    profession: "International Model, Actress",
    description:
      "Namitha Marimuthu is an international model, actress, and social activist who has made history as the first transgender woman to reach the finals of Miss Universe India in 2024. She is the CEO and founder of Miss Queen India and the owner of Alfeem India, both of which promote inclusivity and empowerment.",
    img: `${tedxsjecAssetsPrefix}/previous_Edition_photo's/image4.jpg `,
  },
  {
    id: 6,
    name: "Namitha Marimuthu",
    profession: "International Model, Actress",
    description:
      "Namitha Marimuthu is an international model, actress, and social activist who has made history as the first transgender woman to reach the finals of Miss Universe India in 2024. She is the CEO and founder of Miss Queen India and the owner of Alfeem India, both of which promote inclusivity and empowerment.",
    img: `${tedxsjecAssetsPrefix}/previous_Edition_photo's/image5.jpg `,
  },
  {
    id: 7,
    name: "Namitha Marimuthu",
    profession: "International Model, Actress",
    description:
      "Namitha Marimuthu is an international model, actress, and social activist who has made history as the first transgender woman to reach the finals of Miss Universe India in 2024. She is the CEO and founder of Miss Queen India and the owner of Alfeem India, both of which promote inclusivity and empowerment.",
    img: `${tedxsjecAssetsPrefix}/previous_Edition_photo's/image6.jpg `,
  },
];

function UnsplashGrid() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="flex justify-center">
        <div className="container mx-auto p-2 sm:p-4 lg:px-20 ">
          <div className="columns-2 md:columns-3 2xl:columns-3 gap-3">
            <>
              {speakers.map((speaker, index) => (
                <ImageItem
                  key={speaker.id}
                  item={speaker}
                  index={index}
                  setSelected={setSelected}
                />
              ))}
            </>
          </div>
        </div>
      </div>
    </>
  );
}

interface Speaker {
  id: number;
  img: string;
  name: string;
  profession: string;
  description: string;
}

interface ImageItemProps {
  item: Speaker;
  index: number | string;
  setSelected: any;
}

function ImageItem({ item, index, setSelected }: ImageItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.figure
      initial="hidden"
      animate={isInView && "visible"}
      ref={ref}
      className="inline-block group w-full rounded-md relative dark:bg-black bg-white cursor-pointer"
      onClick={() => setSelected(item)}
    >
      <motion.img
        layoutId={`card-${item.id}`}
        whileHover={{ scale: 1.025 }}
        src={item.img}
        className="w-full bg-base-100 rounded-md shadow-xl image-full cursor-pointer"
      />
    </motion.figure>
  );
}

interface ModalProps {
  selected: Speaker | null;
  setSelected: any;
}

function Modal({ selected, setSelected }: ModalProps) {
  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.2 },
    },
    exit: { opacity: 0, y: 20 },
  };

  useEffect(() => {
    if (selected) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 cursor-pointer overflow-y-scroll"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            layoutId={`card-${selected.id}`}
            className="w-full max-w-[1000px] relative mx-auto my-24 cursor-default dark:bg-[#202020] bg-[#ebebeb]"
          >
            <button
              className="absolute top-2 right-2 p-2"
              onClick={() => setSelected(null)}
            >
              <X />
            </button>
            <motion.div className="p-2 h-[70vh] rounded-md">
              <Image
                width={400}
                height={400}
                alt="Speaker"
                src={selected.img}
                className="w-full h-full object-contain rounded-md dark:bg-black bg-white"
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white dark:bg-black text-white p-4 rounded-md px-8"
            >
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-bold mb-2"
              >
                {selected.name}
              </motion.h3>
              <motion.p variants={itemVariants} className="my-4">
                {selected.description}
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UnsplashGrid;
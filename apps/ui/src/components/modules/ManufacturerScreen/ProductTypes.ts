import {
  MdMedication,
  MdLocalPharmacy,
  MdScience,
  MdFace,
} from "react-icons/md";
import { GiPill, GiDrop, GiMedicines } from "react-icons/gi";
import { FaSyringe, FaEye, FaEarListen } from "react-icons/fa6";
import { BiSolidInjection } from "react-icons/bi";

export const productCategories = [
  {
    name: "Injectables",
    icon: FaSyringe,
    bgColor: "#0095ffff", // Light blue
  },
  {
    name: "Capsules",
    icon: GiPill,
    bgColor: "#00ff15ff", // Light green
  },
  {
    name: "Tablets",
    icon: MdMedication,
    bgColor: "#ff9d00ff", // Light orange
  },
  {
    name: "Softgel Capsules",
    icon: GiMedicines,
    bgColor: "#dd00ffff", // Light purple
  },
  {
    name: "Dry Syrup",
    icon: MdScience,
    bgColor: "#00e1ffff", // Aqua
  },
  {
    name: "Syrups",
    icon: MdLocalPharmacy,
    bgColor: "#ffea00ff", // Light yellow
  },
  {
    name: "Facewash",
    icon: MdFace,
    bgColor: "#0026ffff", // Soft indigo
  },
  {
    name: "Ointments",
    icon: MdFace,
    bgColor: "#88ff00ff", // Pastel green
  },
  {
    name: "Eye Drops",
    icon: FaEye,
    bgColor: "#00fff2ff", // Mint teal
  },
  {
    name: "Lotion",
    icon: GiDrop,
    bgColor: "#ffc400ff", // Cream
  },
  {
    name: "Ear Drops",
    icon: FaEarListen,
    bgColor: "#ff0055ff", // Light pink
  },
  {
    name: "And More",
    icon: BiSolidInjection,
    bgColor: "#0099ffff", // Grey
  },
];

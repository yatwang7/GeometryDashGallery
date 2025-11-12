// --- Import Non-Demon Difficulties ---
import auto from '../assets/difficulties/auto.png';
import easy from '../assets/difficulties/easy.png';
import normal from '../assets/difficulties/normal.png';
import hard from '../assets/difficulties/hard.png';
import harder from '../assets/difficulties/harder.png';
import insane from '../assets/difficulties/insane.png';

// --- Import Demon Difficulties ---
import easyDemon from '../assets/difficulties/easyDemon.png';
import mediumDemon from '../assets/difficulties/mediumDemon.png';
import hardDemon from '../assets/difficulties/hardDemon.png';
import insaneDemon from '../assets/difficulties/insaneDemon.png';
import extremeDemon from '../assets/difficulties/extremeDemon.png';

// --- Icons ---
import Auto_Icon from '../assets/icons/Auto_Icon.png';
import Easy_Icon from '../assets/icons/Easy_Icon.png';
import Normal_Icon from '../assets/icons/Normal_Icon.png';
import Hard_Icon from '../assets/icons/Hard_Icon.png';
import Harder_Icon from '../assets/icons/Harder_Icon.png';
import Insane_Icon from '../assets/icons/Insane_Icon.png';
import EasyDemon_Icon from '../assets/icons/EasyDemon_Icon.png';
import MediumDemon_Icon from '../assets/icons/MediumDemon_Icon.png';
import HardDemon_Icon from '../assets/icons/HardDemon_Icon.png';
import InsaneDemon_Icon from '../assets/icons/InsaneDemon_Icon.png';
import ExtremeDemon_Icon from '../assets/icons/ExtremeDemon_Icon.png';

export const nonDemonDifficulties = [
  { name: 'Auto', text: auto, icon: Auto_Icon },
  { name: 'Easy', text: easy, icon: Easy_Icon },
  { name: 'Normal', text: normal, icon: Normal_Icon },
  { name: 'Hard', text: hard, icon: Hard_Icon },
  { name: 'Harder', text: harder, icon: Harder_Icon },
  { name: 'Insane', text: insane, icon: Insane_Icon },
];

export const demonDifficulties = [
  { name: 'Easy Demon', text: easyDemon, icon: EasyDemon_Icon },
  { name: 'Medium Demon', text: mediumDemon, icon: MediumDemon_Icon },
  { name: 'Hard Demon', text: hardDemon, icon: HardDemon_Icon },
  { name: 'Insane Demon', text: insaneDemon, icon: InsaneDemon_Icon },
  { name: 'Extreme Demon', text: extremeDemon, icon: ExtremeDemon_Icon },
];

// Define order for sorting
export const difficultyOrder = [
  'Auto', 'Easy', 'Normal', 'Hard', 'Harder', 'Insane',
  'Easy Demon', 'Medium Demon', 'Hard Demon', 'Insane Demon', 'Extreme Demon',
];
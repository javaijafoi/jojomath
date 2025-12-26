// Fighter images for JoJo Math Fight mode
import bucciarati from './bucciarati.png';
import josuke from './josuke.png';
import kars from './kars.png';
import holhorse from './holhorse.png';
import pucci from './pucci.png';
import rohan from './rohan.png';
import kira from './kira.png';
import bruford from './bruford.png';

// Also use characters from Steel Ball Run
import { characterImages } from '../characters';

export const fighterImages = {
  // Part 5 - Golden Wind
  bucciarati,
  
  // Part 4 - Diamond is Unbreakable
  josuke,
  rohan,
  kira,
  
  // Part 2 - Battle Tendency
  kars,
  bruford,
  
  // Part 3 - Stardust Crusaders
  holhorse,
  
  // Part 6 - Stone Ocean
  pucci,
  
  // Steel Ball Run characters (reused)
  johnny: characterImages.johnny,
  gyro: characterImages.gyro,
  diego: characterImages.diego,
  valentine: characterImages.valentine,
};

export default fighterImages;

// Character images - local imports for caching
import johnny from './johnny.png';
import gyro from './gyro.png';
import diego from './diego.png';
import valentine from './valentine.png';
import hotpants from './hotpants.png';
import sandman from './sandman.png';
import ringo from './ringo.png';
import blackmore from './blackmore.png';
import pocoloco from './pocoloco.png';
import tim from './tim.png';
import lucy from './lucy.png';
import wekapipo from './wekapipo.png';

export const characterImages = {
  johnny,
  gyro,
  diego,
  valentine,
  hotpants,
  sandman,
  ringo,
  blackmore,
  pocoloco,
  tim,
  lucy,
  wekapipo,
} as const;

export type CharacterImageKey = keyof typeof characterImages;

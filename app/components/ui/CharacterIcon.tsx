import Image from 'next/image';

interface CharacterIconProps {
  character: string;
  size?: number;
  showName?: boolean;
}

export default function CharacterIcon({ character, size = 32, showName = true }: CharacterIconProps) {
  const getCharacterImage = (characterName: string) => {
    // Map character names to their folder names and slugs
    const characterData: { [key: string]: { folder: string; slug: string } } = {
      'Mario': { folder: '1 - Mario', slug: 'mario' },
      'Donkey Kong': { folder: '2 - Donkey Kong', slug: 'donkey' },
      'Link': { folder: '3 - Link', slug: 'link' },
      'Samus': { folder: '4 - Samus', slug: 'samus' },
      'Dark Samus': { folder: '4ε - Dark Samus', slug: 'samusd' },
      'Yoshi': { folder: '5 - Yoshi', slug: 'yoshi' },
      'Kirby': { folder: '6 - Kirby', slug: 'kirby' },
      'Fox': { folder: '7 - Fox', slug: 'fox' },
      'Pikachu': { folder: '8 - Pikachu', slug: 'pikachu' },
      'Luigi': { folder: '9 - Luigi', slug: 'luigi' },
      'Ness': { folder: '10 - Ness', slug: 'ness' },
      'Captain Falcon': { folder: '11 - Captain Falcon', slug: 'captain' },
      'Jigglypuff': { folder: '12 - Jigglypuff', slug: 'purin' },
      'Peach': { folder: '13 - Peach', slug: 'peach' },
      'Daisy': { folder: '13ε - Daisy', slug: 'daisy' },
      'Bowser': { folder: '14 - Bowser', slug: 'koopa' },
      'Ice Climbers': { folder: '15 - Ice Climbers', slug: 'ice_climber' },
      'Sheik': { folder: '16 - Sheik', slug: 'sheik' },
      'Zelda': { folder: '17 - Zelda', slug: 'zelda' },
      'Dr. Mario': { folder: '18 - Dr Mario', slug: 'mariod' },
      'Pichu': { folder: '19 - Pichu', slug: 'pichu' },
      'Falco': { folder: '20 - Falco', slug: 'falco' },
      'Marth': { folder: '21 - Marth', slug: 'marth' },
      'Lucina': { folder: '21ε - Lucina', slug: 'lucina' },
      'Young Link': { folder: '22 - Young Link', slug: 'younglink' },
      'Ganondorf': { folder: '23 - Ganondorf', slug: 'ganon' },
      'Mewtwo': { folder: '24 - Mewtwo', slug: 'mewtwo' },
      'Roy': { folder: '25 - Roy', slug: 'roy' },
      'Chrom': { folder: '25ε - Chrom', slug: 'chrom' },
      'Mr. Game & Watch': { folder: '26 - Mr Game and Watch', slug: 'gamewatch' },
      'Meta Knight': { folder: '27 - Meta Knight', slug: 'metaknight' },
      'Pit': { folder: '28 - Pit', slug: 'pit' },
      'Dark Pit': { folder: '28ε - Dark Pit', slug: 'pitb' },
      'Zero Suit Samus': { folder: '29 - Zero Suit Samus', slug: 'szerosuit' },
      'Wario': { folder: '30 - Wario', slug: 'wario' },
      'Snake': { folder: '31 - Snake', slug: 'snake' },
      'Ike': { folder: '32 - Ike', slug: 'ike' },
      'Pokémon Trainer': { folder: '33 - Pokémon Trainer', slug: 'ptrainer' },
      'Squirtle': { folder: '33 - Pokémon Trainer (Squirtle)', slug: 'pzenigame' },
      'Ivysaur': { folder: '34 - Pokémon Trainer (Ivysaur)', slug: 'pfushigisou' },
      'Charizard': { folder: '35 . Pokémon Trainer (Charizard)', slug: 'plizardon' },
      'Diddy Kong': { folder: '36 - Diddy Kong', slug: 'diddy' },
      'Lucas': { folder: '37 - Lucas', slug: 'lucas' },
      'Sonic': { folder: '38 - Sonic', slug: 'sonic' },
      'King Dedede': { folder: '39 - King Dedede', slug: 'dedede' },
      'Olimar': { folder: '40 - Olimar (Alph)', slug: 'pikmin' },
      'Lucario': { folder: '41 - Lucario', slug: 'lucario' },
      'R.O.B.': { folder: '42 - ROB', slug: 'robot' },
      'Toon Link': { folder: '43 - Toon Link', slug: 'toonlink' },
      'Wolf': { folder: '44 - Wolf', slug: 'wolf' },
      'Villager': { folder: '45 - Villager', slug: 'murabito' },
      'Mega Man': { folder: '46 - Mega Man', slug: 'rockman' },
      'Wii Fit Trainer': { folder: '47 - Wii Fit Trainer', slug: 'wiifit' },
      'Rosalina & Luma': { folder: '48 - Rosalina and Luma', slug: 'rosetta' },
      'Little Mac': { folder: '49 - Little Mac', slug: 'littlemac' },
      'Greninja': { folder: '50 - Greninja', slug: 'gekkouga' },
      'Mii Fighter Brawler': { folder: '51-53 - Mii', slug: 'miifighter' },
      'Mii Fighter Swordfighter': { folder: '51-53 - Mii', slug: 'miiswordsman' },
      'Mii Fighter Gunner': { folder: '51-53 - Mii', slug: 'miigunner' },
      'Palutena': { folder: '54 - Palutena', slug: 'palutena' },
      'Pac-Man': { folder: '55 - Pac-Man', slug: 'pacman' },
      'Robin': { folder: '56 - Robin', slug: 'reflet' },
      'Shulk': { folder: '57 - Shulk', slug: 'shulk' },
      'Bowser Jr.': { folder: '58 - Bowser Jr (Koopalings)', slug: 'koopajr' },
      'Duck Hunt Duo': { folder: '59 - Duck Hunt', slug: 'duckhunt' },
      'Ryu': { folder: '60 - Ryu', slug: 'ryu' },
      'Ken': { folder: '60ε - Ken', slug: 'ken' },
      'Cloud': { folder: '61 - Cloud', slug: 'cloud' },
      'Corrin': { folder: '62 - Corrin', slug: 'kamui' },
      'Bayonetta': { folder: '63 - Bayonetta', slug: 'bayonetta' },
      'Inkling': { folder: '64 - Inkling', slug: 'inkling' },
      'Ridley': { folder: '65 - Ridley', slug: 'ridley' },
      'Simon': { folder: '66 - Simon', slug: 'simon' },
      'Richter': { folder: '66ε - Richter', slug: 'richter' },
      'King K. Rool': { folder: '67 - King K Rool', slug: 'krool' },
      'Isabelle': { folder: '68 - Isabelle', slug: 'shizue' },
      'Incineroar': { folder: '69 - Incineroar', slug: 'gaogaen' },
      'Piranha Plant': { folder: '70 - Piranha Plant', slug: 'packun' },
      'Joker': { folder: '71 - Joker', slug: 'jack' },
      'Hero': { folder: '72 - Hero', slug: 'brave' },
      'Banjo & Kazooie': { folder: '73 - Banjo & Kazooie', slug: 'buddy' },
      'Terry': { folder: '74 - Terry Bogard', slug: 'dolly' },
      'Byleth': { folder: '75 - Byleth', slug: 'master' },
      'Min Min': { folder: '76 - Min Min', slug: 'tantan' },
      'Steve / Alex': { folder: '77 - Steve', slug: 'pickel' },
      'Sephiroth': { folder: '78 - Sephiroth', slug: 'edge' },
      'Pyra / Mythra': { folder: '79 - Pyra & Mythra', slug: 'element' },
      'Kazuya': { folder: '80 - Kazuya Mishima', slug: 'demon' }
    };
    
    const character = characterData[characterName];
    if (!character) {
      return '/characters/placeholder.png';
    }
    
    return `/characters/Super Smash Bros Ultimate Fighters/${character.folder}/chara_0_${character.slug}_00.png`;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-shrink-0">
        <Image
          src={getCharacterImage(character)}
          alt={`${character} icon`}
          width={size}
          height={size}
          className="rounded-full border-2 border-foreground/20"
          onError={(e) => {
            // Fallback to a placeholder when image fails to load
            const target = e.target as HTMLImageElement;
            target.src = '/characters/placeholder.png';
          }}
        />
      </div>
      {showName && (
        <span className="font-bold text-foreground">{character}</span>
      )}
    </div>
  );
}
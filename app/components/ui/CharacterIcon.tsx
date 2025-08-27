import Image from 'next/image';

interface CharacterIconProps {
  character: string;
  size?: number;
  showName?: boolean;
}

export default function CharacterIcon({ character, size = 32, showName = true }: CharacterIconProps) {
  const getCharacterImage = (characterName: string) => {
    // For now, return a placeholder path - you can replace these with actual images later
    const characterSlug = characterName.toLowerCase().replace(/\s+/g, '-');
    return `/characters/${characterSlug}.png`;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-shrink-0">
        <Image
          src={getCharacterImage(character)}
          alt={`${character} icon`}
          width={size}
          height={size}
          className="rounded-full border-2 border-gray-200"
          onError={(e) => {
            // Fallback to a placeholder when image fails to load
            const target = e.target as HTMLImageElement;
            target.src = '/characters/placeholder.png';
          }}
        />
      </div>
      {showName && (
        <span className="font-medium text-gray-800">{character}</span>
      )}
    </div>
  );
}
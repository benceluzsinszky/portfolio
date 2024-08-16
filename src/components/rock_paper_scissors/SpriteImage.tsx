interface SpriteProps {
  id: number;
  image: string;
  size: number;
  xPosition: number;
  yPosition: number;
}

export default function SpriteImage({
  id,
  image,
  size,
  xPosition,
  yPosition,
}: SpriteProps) {
  return (
    <div
      id={id.toString()}
      style={{ position: "absolute", top: yPosition, left: xPosition }}
      title={`x: ${xPosition}, y: ${yPosition}`}
    >
      <img src={image} width={size} height={size} />
    </div>
  );
}

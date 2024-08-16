import { useCallback, useEffect, useRef, useState } from "react";
import { SpriteType } from "./Constants";
import SpriteImage from "./SpriteImage";

interface SimulationProps {
  isRunning: boolean;
  spriteArray: Array<SpriteType>;
  groupSize: number;
}

type Sprite = {
  id: number;
  type: SpriteType;
  xPosition: number;
  yPosition: number;
  element: HTMLElement;
  rect: DOMRect;
};

export default function Simulation({
  isRunning,
  spriteArray,
  groupSize,
}: SimulationProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [walls, setWalls] = useState({
    topWall: 0,
    bottomWall: 0,
    leftWall: 0,
    rightWall: 0,
  });
  const numberOfSprites = groupSize * 3;
  const size = 20;

  const generateRandomPosition = () => {
    const xPosition =
      Math.floor(Math.random() * (walls.rightWall - walls.leftWall + 1)) +
      walls.leftWall;
    const yPosition =
      Math.floor(Math.random() * (walls.bottomWall - walls.topWall + 1)) +
      walls.topWall;
    return { xPosition, yPosition };
  };

  const parseSpriteType = (spriteType: SpriteType) => {
    switch (spriteType) {
      case SpriteType.ROCK:
        return "/rock.png";
      case SpriteType.PAPER:
        return "/paper.png";
      case SpriteType.SCISSORS:
        return "/scissors.png";
    }
  };

  const createSprites = () => {
    const sprites = new Array<JSX.Element>();
    spriteArray.map((spriteType, index) => {
      const image = parseSpriteType(spriteType);

      const { xPosition, yPosition } = generateRandomPosition();
      sprites.push(
        <SpriteImage
          key={index}
          id={index}
          image={image}
          size={size}
          xPosition={xPosition}
          yPosition={yPosition}
        />
      );
    });
    return sprites;
  };

  const parseSpriteFromId = useCallback(
    (id: number): Sprite => {
      const spriteType = spriteArray[id];
      const sprite = document.getElementById(id.toString());
      if (!sprite) {
        throw new Error("Sprite not found");
      }
      const rect = sprite.getBoundingClientRect();

      return {
        id: id,
        type: spriteType,
        xPosition: rect.left,
        yPosition: rect.top,
        element: sprite,
        rect: rect,
      };
    },
    [spriteArray]
  );

  const parsePrey = useCallback((spriteType: SpriteType): SpriteType => {
    switch (spriteType) {
      case SpriteType.ROCK:
        return SpriteType.SCISSORS;
      case SpriteType.PAPER:
        return SpriteType.ROCK;
      case SpriteType.SCISSORS:
        return SpriteType.PAPER;
    }
  }, []);

  const parseHunter = useCallback((spriteType: SpriteType): SpriteType => {
    switch (spriteType) {
      case SpriteType.ROCK:
        return SpriteType.PAPER;
      case SpriteType.PAPER:
        return SpriteType.SCISSORS;
      case SpriteType.SCISSORS:
        return SpriteType.ROCK;
    }
  }, []);

  const findClosest = useCallback(
    (spriteRect: DOMRect, otherSpriteType: SpriteType): Sprite | null => {
      let minDistance = Infinity;
      let closestSprite = null;
      for (let i = 0; i < numberOfSprites; i++) {
        if (spriteArray[i] === otherSpriteType) {
          const otherSprite = parseSpriteFromId(i);

          const distance = Math.sqrt(
            Math.pow(spriteRect.left - otherSprite.rect.left, 2) +
              Math.pow(spriteRect.top - otherSprite.rect.top, 2)
          );
          if (distance < minDistance) {
            minDistance = distance;
            closestSprite = otherSprite;
          }
        }
      }
      return closestSprite;
    },
    [spriteArray, numberOfSprites, parseSpriteFromId]
  );

  const makeRandomMovement = useCallback((sprite: Sprite): void => {
    const xPosition = sprite.rect.left + Math.floor(Math.random() * 3) - 1;
    const yPosition = sprite.rect.top + Math.floor(Math.random() * 3) - 1;

    sprite.element.style.left = `${xPosition}px`;
    sprite.element.style.top = `${yPosition}px`;
  }, []);

  const hunt = useCallback((sprite: Sprite, prey: Sprite): void => {}, []);

  const eat = useCallback((sprite: Sprite, prey: Sprite): void => {}, []);

  const run = useCallback((sprite: Sprite, hunter: Sprite): void => {}, []);

  const moveSprite = useCallback(
    (sprite: Sprite): void => {
      const closestPrey = findClosest(
        sprite.rect,
        parsePrey(spriteArray[sprite.id])
      );
      if (closestPrey) {
        hunt(sprite, closestPrey);
        eat(sprite, closestPrey);
      }

      const closestHunter = findClosest(
        sprite.rect,
        parseHunter(spriteArray[sprite.id])
      );
      if (closestHunter) {
        run(sprite, closestHunter);
      }

      makeRandomMovement(sprite);
    },
    [
      findClosest,
      spriteArray,
      parsePrey,
      parseHunter,
      hunt,
      eat,
      run,
      makeRandomMovement,
    ]
  );

  const sameTypeCollision = (
    sprite: HTMLElement,
    otherSprite: HTMLElement
  ): void => {};

  const wallCollision = (sprite: HTMLElement): void => {};

  const gameLoop = useCallback(() => {
    if (!isRunning) return;
    for (let i = 0; i < numberOfSprites; i++) {
      const sprite = parseSpriteFromId(i);
      moveSprite(sprite);
    }
  }, [isRunning, numberOfSprites, parseSpriteFromId, moveSprite]);

  useEffect(() => {
    if (parentRef.current && size) {
      const rect = parentRef.current.getBoundingClientRect();

      const topWall = rect.top;
      const bottomWall = rect.bottom - size;
      const leftWall = rect.left;
      const rightWall = rect.right - size;

      setWalls({ topWall, bottomWall, leftWall, rightWall });
    }
  }, [parentRef]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const timer = setInterval(() => {
      gameLoop();
    }, 1000 / 60); // 60 fps

    // Cleanup the timeout on component unmount
    return () => clearInterval(timer);
  }, [isRunning, gameLoop]);

  return (
    <div ref={parentRef} className="simulation">
      {isRunning && spriteArray && createSprites()}
    </div>
  );
}

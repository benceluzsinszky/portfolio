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

          const distance = getDistance(parseSpriteFromId(i), otherSprite);
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

  const getDistance = useCallback(
    (sprite: Sprite, otherSprite: Sprite): number => {
      return Math.sqrt(
        Math.pow(sprite.rect.left - otherSprite.rect.left, 2) +
          Math.pow(sprite.rect.top - otherSprite.rect.top, 2)
      );
    },
    []
  );

  const getAngle = useCallback(
    (sprite: Sprite, otherSprite: Sprite): number => {
      return Math.atan2(
        otherSprite.rect.top - sprite.rect.top,
        otherSprite.rect.left - sprite.rect.left
      );
    },
    []
  );

  const moveSpriteInAngle = useCallback(
    (
      sprite: Sprite,
      angle: number,
      direction: number,
      speed: number
    ): { xPosition: number; yPosition: number } => {
      const xPosition =
        sprite.xPosition + direction * speed * (Math.cos(angle) * 3);
      const yPosition =
        sprite.yPosition + direction * speed * (Math.sin(angle) * 3);

      return { xPosition, yPosition };
    },
    []
  );

  const chase = useCallback(
    (
      sprite: Sprite,
      prey: Sprite,
      direction: number,
      speed: number
    ): { xPosition: number; yPosition: number } => {
      const distance = getDistance(sprite, prey);
      if (distance === 0) {
        return { xPosition: sprite.xPosition, yPosition: sprite.yPosition };
      }
      const angle = getAngle(sprite, prey);
      return moveSpriteInAngle(sprite, angle, direction, speed);
    },
    [getDistance, getAngle, moveSpriteInAngle]
  );

  const eat = useCallback((sprite: Sprite, prey: Sprite): void => {}, []);

  const makeRandomMovement = useCallback(
    (sprite: Sprite): { xPosition: number; yPosition: number } => {
      const xPosition = sprite.xPosition + (Math.random() * 3 - 1) * 0.5;
      const yPosition = sprite.yPosition + (Math.random() * 3 - 1) * 0.5;

      return { xPosition, yPosition };
    },
    []
  );

  const moveSprite = useCallback(
    (sprite: Sprite): void => {
      const closestPrey = findClosest(
        sprite.rect,
        parsePrey(spriteArray[sprite.id])
      );

      if (closestPrey) {
        const { xPosition: newX, yPosition: newY } = chase(
          sprite,
          closestPrey,
          1,
          1.2
        );
        sprite.xPosition = newX;
        sprite.yPosition = newY;
        eat(sprite, closestPrey);
      }

      const closestHunter = findClosest(
        sprite.rect,
        parseHunter(spriteArray[sprite.id])
      );
      if (closestHunter) {
        const { xPosition: newX, yPosition: newY } = chase(
          sprite,
          closestHunter,
          -1,
          1
        );
        sprite.xPosition = newX;
        sprite.yPosition = newY;
      }

      const { xPosition: newX, yPosition: newY } = makeRandomMovement(sprite);
      sprite.xPosition = newX;
      sprite.yPosition = newY;

      sprite.element.style.left = `${sprite.xPosition}px`;
      sprite.element.style.top = `${sprite.yPosition}px`;
    },
    [
      findClosest,
      spriteArray,
      parsePrey,
      parseHunter,
      chase,
      eat,
      makeRandomMovement,
    ]
  );

  const sameTypeCollision = (sprite: Sprite, otherSprite: Sprite): void => {};

  const checkWalls = useCallback(
    (sprite: Sprite): void => {
      if (sprite.id === 0) {
        console.log(sprite.rect);
        console.log(walls);
      }
      if (sprite.rect.left <= walls.leftWall) {
        sprite.element.style.left = `${walls.leftWall}px`;
      }
      if (sprite.rect.right >= walls.rightWall) {
        sprite.element.style.left = `${walls.rightWall}px`;
      }
      if (sprite.rect.top <= walls.topWall) {
        sprite.element.style.top = `${walls.topWall}px`;
      }
      if (sprite.rect.bottom >= walls.bottomWall) {
        sprite.element.style.top = `${walls.bottomWall}px`;
      }
    },
    [walls]
  );

  const gameLoop = useCallback(() => {
    if (!isRunning) return;
    for (let i = 0; i < numberOfSprites; i++) {
      const sprite = parseSpriteFromId(i);
      moveSprite(sprite);

      // makeRandomMovement(sprite);
      checkWalls(sprite);
    }
  }, [isRunning, numberOfSprites, parseSpriteFromId, moveSprite, checkWalls]);

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
      {spriteArray && createSprites()}
    </div>
  );
}

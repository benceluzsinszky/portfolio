import FallingSandIcon from "../../assets/icons/games/falling_sand.png";
import GameOfLifeIcon from "../../assets/icons/games/game_of_life.gif";
import RockPaperScissorsIcon from "../../assets/icons/games/rock_paper_scissors.png";
import GameCard from "./GameCard";

export default function Games() {
  return (
    <div className="flex flex-row items-center justify-evenly flex-wrap w-full">
      <GameCard
        title="Falling Sand"
        description="A falling sand game simulation."
        icon={FallingSandIcon}
        link="/games/falling_sand"
      />
      <GameCard
        title="Game of Life"
        description="A cellular automaton by John Horton Conway."
        icon={GameOfLifeIcon}
        link="/games/game_of_life"
      />
      <GameCard
        title="Rock Paper Scissors"
        description="A Rock Paper Scissors simulation."
        icon={RockPaperScissorsIcon}
        link="/games/game_of_life"
        deactivated
      />
    </div>
  );
}

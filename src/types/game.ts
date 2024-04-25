export interface GameSettings {
  gameMode: "Singleplayer" | "2-Player";
  startingSymbol: "X" | "O";
  aiDifficulty?: "Easy" | "Medium" | "Hard";
  timePerMove: number;
}
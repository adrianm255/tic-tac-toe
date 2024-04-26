export interface GameSettings {
  gameMode: GameMode;
  startingSymbol: "X" | "O";
  aiDifficulty?: ComputerDifficulty;
  timePerMove: TimePerMove;
}

export enum GameMode {
  Singleplayer = "Singleplayer",
  TwoPlayer = "2-Player"
}

export enum ComputerDifficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard"
}

export enum TimePerMove {
  Unlimited = 0,
  OneSecond = 1,
  ThreeSeconds = 3,
  FiveSeconds = 5,
  TenSeconds = 10,
  ThirtySeconds = 30
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Position {
  x: number;
  y: number;
}

export type FoodType = 'NORMAL' | 'INVINCIBILITY' | 'GROWTH_BOOST' | 'SPEED_BOOST';

export interface Food {
  position: Position;
  type: FoodType;
}

export interface Player {
  id: 1 | 2;
  name: string;
  scoreHistory: number[];
}

export interface ActivePowerUp {
    type: FoodType;
    timeLeft: number;
}

export interface Snake {
  id: 1 | 2;
  body: Position[];
  direction: Direction;
  color: string;
  isAlive: boolean;
  activePowerUps: ActivePowerUp[];
}

export type GameState = 'MENU' | 'PLAYING' | 'HELP';

export type GameMode = 'SINGLE' | 'MULTI';

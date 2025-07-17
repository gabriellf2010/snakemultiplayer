import React from 'react';
import { FoodType } from './types';
import BoltIcon from './components/icons/BoltIcon';
import ShieldIcon from './components/icons/ShieldIcon';
import StarIcon from './components/icons/StarIcon';

export const BOARD_SIZE = 30;
export const INITIAL_SPEED = 150;
export const MIN_SPEED = 50;
export const SPEED_INCREMENT_INTERVAL = 15000; // ms
export const SPEED_DECREASE_AMOUNT = 5; // ms
export const POWERUP_DURATION = 10; // seconds

export const PLAYER_CONTROLS = {
  1: {
    'w': 'UP',
    's': 'DOWN',
    'a': 'LEFT',
    'd': 'RIGHT',
  },
  2: {
    '8': 'UP',
    '5': 'DOWN',
    '4': 'LEFT',
    '6': 'RIGHT',
  }
};

export const PLAYER_COLORS = {
  1: 'bg-cyan-400',
  2: 'bg-orange-400',
};

// A component that renders nothing, but conforms to the expected prop type for icons.
const NullIcon: React.FC<{ className?: string }> = () => null;

export const FOOD_PROPERTIES: { [key in FoodType]: { color: string; icon: React.ComponentType<{ className?: string }>; description: string; title: string; } } = {
  NORMAL: {
    color: 'bg-red-500',
    icon: NullIcon,
    title: 'Maçã Normal',
    description: 'Aumenta sua cobra em 1 segmento.'
  },
  INVINCIBILITY: {
    color: 'bg-yellow-400',
    icon: ShieldIcon,
    title: 'Escudo de Invencibilidade',
    description: `Garante 10 segundos de invencibilidade. Você não pode morrer por colisões.`
  },
  GROWTH_BOOST: {
    color: 'bg-purple-500',
    icon: StarIcon,
    title: 'Crescimento Rápido',
    description: `Dobra o crescimento da sua cobra por 10 segundos. Cada comida vale por 2 segmentos.`
  },
  SPEED_BOOST: {
    color: 'bg-blue-500',
    icon: BoltIcon,
    title: 'Impulso de Velocidade',
    description: `Aumenta drasticamente a sua velocidade por 10 segundos. Use com cuidado!`
  },
};

export const AUDIO_URLS = {
  background: 'https://cdn.pixabay.com/audio/2022/05/27/audio_18b969e3d9.mp3',
  foodNormal: 'https://cdn.pixabay.com/audio/2022/03/15/audio_74579c020a.mp3',
  foodPowerup: 'https://cdn.pixabay.com/audio/2022/11/17/audio_84f242d505.mp3',
};
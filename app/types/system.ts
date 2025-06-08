import { GameEngine } from 'react-native-game-engine';

export type System = (entities: any, update: GameEngine ) => any;

import type MoveFactory from './MoveFactory';
import {TypeMove} from '../types';
import type Grid from '../entities/Grid';

class GameOver {
	canMove(moveFactory: MoveFactory, grid: Grid): boolean {
		return Object.values(TypeMove).some(elem => moveFactory[elem].canMove(grid));
	}
}

export default GameOver;

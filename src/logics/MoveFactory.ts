import Move from './Move';
import type Grid from '../entities/Grid';
import {type CellsGrouped} from '../entities/Grid';
import Tile from '../entities/Tile';
import type Cell from '../entities/Cell';

class MoveFactory {
	ArrowUp: Move = new MoveUp();
	ArrowDown: Move = new MoveDown();
	ArrowLeft: Move = new MoveLeft();
	ArrowRight: Move = new MoveRight();
}

class MoveUp extends Move {
	public canMove(grid: Grid): boolean {
		return super.mainCanMove(grid.cellsGroupedByColumn);
	}

	public move(grid: Grid): void {
		super.mainMove(grid, grid.cellsGroupedByColumn);
	}
}

class MoveDown extends Move {
	public canMove(grid: Grid): boolean {
		return super.mainCanMove(grid.cellsGroupedByRevertColumn);
	}

	public move(grid: Grid): void {
		super.mainMove(grid, grid.cellsGroupedByRevertColumn);
	}
}

class MoveLeft extends Move {
	public canMove(grid: Grid): boolean {
		return super.mainCanMove(grid.cellsGroupedByRow);
	}

	public move(grid: Grid): void {
		super.mainMove(grid, grid.cellsGroupedByRow);
	}
}

class MoveRight extends Move {
	public canMove(grid: Grid): boolean {
		return super.mainCanMove(grid.cellsGroupedByRevertRow);
	}

	public move(grid: Grid): void {
		super.mainMove(grid, grid.cellsGroupedByRevertRow);
	}
}

export default MoveFactory;

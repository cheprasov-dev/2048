import type Grid from '../entities/Grid';
import {type CellsGrouped} from '../entities/Grid';
import Tile from '../entities/Tile';
import type Cell from '../entities/Cell';

class Move {
	public canMove(grid: Grid): boolean {
		console.log('Method undefined');
		return false;
	}

	public move(grid: Grid): void {
		console.log('Method undefined');
	}

	protected mainMove(grid: Grid, groupedCells: CellsGrouped): void {
		this.slideTiles(grid, groupedCells);
	}

	protected mainCanMove(groupedCells: CellsGrouped): boolean {
		return groupedCells.some(this.canMoveInGroup);
	}

	private slideTiles(grid: Grid, groupedCells: CellsGrouped) {
		groupedCells.forEach(this.slideTilesInGroup);
		grid.cells.forEach(cell => {
			if (cell.hasTileForMerge()) {
				cell.mergeTiles();
			}
		});
	}

	private slideTilesInGroup(group: Cell[]) {
		group.forEach((cell, index, array) => {
			if (index === 0) {
				return null;
			}

			if (cell.isEmpty()) {
				return null;
			}

			let targetCell;
			let j = index - 1;
			while (j >= 0 && group[j].canAccept(cell.linkedTile)) {
				targetCell = group[j];
				j--;
			}

			if (!targetCell) {
				return null;
			}

			if (targetCell.isEmpty() && cell.linkedTile) {
				targetCell.linkTile(cell.linkedTile);
			} else if (!targetCell.isEmpty() && cell.linkedTile) {
				targetCell.linkTileForMerge(cell.linkedTile);
			}

			cell.unlinkTell();
		});
	}

	private canMoveInGroup(group: Cell[]): boolean {
		return group.some((cell, index) => {
			if (index === 0) {
				return false;
			}

			if (cell.isEmpty()) {
				return false;
			}

			const targetCell = group[index - 1];
			return targetCell.canAccept(cell.linkedTile);
		});
	}
}

export default Move;

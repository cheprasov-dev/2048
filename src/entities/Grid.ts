import Cell from './Cell';

const GRID_SIZE = 4;
const CELL_COUNT = GRID_SIZE ** 2;

export type CellsGrouped = Cell[][];

class Grid {
	cells: Cell[] = [];
	cellsGroupedByColumn: CellsGrouped;
	cellsGroupedByRevertColumn: CellsGrouped;
	cellsGroupedByRow: CellsGrouped;
	cellsGroupedByRevertRow: CellsGrouped;

	constructor() {
		for (let i = 0; i < CELL_COUNT; i++) {
			const x = i % GRID_SIZE;
			const y = Math.floor(i / GRID_SIZE);
			this.cells.push(
				new Cell(x, y),
			);
		}

		this.cellsGroupedByColumn = this.groupCellsByColumn();
		this.cellsGroupedByRevertColumn = this.cellsGroupedByColumn.map(colum => [...colum].reverse());
		this.cellsGroupedByRow = this.groupCellsByRow();
		this.cellsGroupedByRevertRow = this.cellsGroupedByRow.map(colum => [...colum].reverse());
	}

	getRandomCell(): Cell {
		const emptyCell = this.cells.filter((cell: Cell) => cell.isEmpty());
		const randomIndex = Math.floor(Math.random() * emptyCell.length);
		return emptyCell[randomIndex];
	}

	groupCellsByColumn(): CellsGrouped {
		return this.cells.reduce((acc: CellsGrouped, cell) => {
			acc[cell.x] = acc[cell.x] || [];
			acc[cell.x][cell.y] = cell;
			return acc;
		}, []);
	}

	groupCellsByRow(): CellsGrouped {
		return this.cells.reduce((acc: CellsGrouped, cell) => {
			acc[cell.y] = acc[cell.y] || [];
			acc[cell.y][cell.x] = cell;
			return acc;
		}, []);
	}
}

export default Grid;

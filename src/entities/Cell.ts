import type Tile from './Tile';

class Cell {
	public readonly x: number;
	public readonly y: number;
	public linkedTile: Tile | undefined;
	public linkedTileForMerge: Tile | undefined;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	isEmpty() {
		return !this.linkedTile;
	}

	linkTile(tile: Tile) {
		this.linkedTile = tile;
		this.linkedTile.setCoordinates(this.x, this.y);
	}

	linkTileForMerge(tile: Tile) {
		tile.setCoordinates(this.x, this.y);
		this.linkedTileForMerge = tile;
	}

	hasTileForMerge() {
		return Boolean(this.linkedTileForMerge);
	}

	canAccept(newTile: Tile | undefined) {
		return this.isEmpty() || (!this.hasTileForMerge() && this.linkedTile?.value === newTile?.value);
	}

	unlinkTell() {
		this.linkedTile = undefined;
	}

	unlinkTileForMerge() {
		this.linkedTileForMerge = undefined;
	}

	mergeTiles() {
		if (this.linkedTile && this.linkedTileForMerge) {
			this.linkedTile.setValue(this.linkedTile.value + this.linkedTileForMerge.value);
			this.unlinkTileForMerge();
		}
	}
}

export default Cell;

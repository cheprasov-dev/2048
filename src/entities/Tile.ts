class Tile {
	public value: number;
	public x: number;
	public y: number;

	constructor() {
		this.x = 0;
		this.y = 0;
		this.value = Math.random() > 0.5 ? 2 : 4;
	}

	setCoordinates(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	getStyle(): Record<string, unknown> {
		const bgLightness = 100 - (Math.log2(this.value) * 9);
		const textLightness = bgLightness < 50 ? 90 : 10;
		return {
			'--x': this.x,
			'--y': this.y,
			'--bg-lightness': `${bgLightness}%`,
			'--text-lightness': `${textLightness}%`,
		};
	}

	setValue(value: number) {
		this.value = value;
	}
}

export default Tile;

import React, {useEffect, type KeyboardEvent, useCallback, useState, useRef} from 'react';
import Hammer from 'hammerjs';
import css from './App.module.css';
import Grid from './entities/Grid';
import Tile from './entities/Tile';
import MoveFactory from './logics/MoveFactory';
import {type Keys, TypeMove} from './types';
import GameOver from './logics/GameOver';
import bridge from '@vkontakte/vk-bridge';
import {
	EGetLaunchParamsResponsePlatforms,
	type GetLaunchParamsResponse,
} from '@vkontakte/vk-bridge';

function App() {
	const elementRef = useRef<HTMLDivElement>(null);
	const [grid, setGrid] = useState<Grid>(() => {
		const initTile = new Tile();
		const initGrid = new Grid();
		initGrid.getRandomCell().linkTile(initTile);
		return initGrid;
	});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const [platform, setPlatform] = useState<EGetLaunchParamsResponsePlatforms>(EGetLaunchParamsResponsePlatforms.DESKTOP_WEB);

	useEffect(() => {
		(async () => {
			try {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
				const config = await bridge.send<'VKWebAppGetLaunchParams'>('VKWebAppGetLaunchParams') as GetLaunchParamsResponse;
				setPlatform(config.vk_platform);
			} catch (err) {
				console.error(err);
				setPlatform(EGetLaunchParamsResponsePlatforms.DESKTOP_WEB);
			}
		})();
	}, []);

	const rerenderGrid = useCallback(() => {
		const newGrid = new Grid();
		newGrid.cells = [...grid.cells];
		setGrid(newGrid);
	}, []);

	useEffect(() => {
		(async () => {
			console.log(platform);
			if (platform === EGetLaunchParamsResponsePlatforms.DESKTOP_WEB) {
				// @ts-expect-error
				document.addEventListener('keydown', onKeyDown);
			} else {
				const element = elementRef.current!;
				const hammer = new Hammer(element);

				hammer.on('swipeup', () => {
					step(TypeMove.up);
				});
				hammer.on('swipedown', () => {
					step(TypeMove.down);
				});
				hammer.on('swipeleft', () => {
					step(TypeMove.left);
				});
				hammer.on('swiperight', () => {
					step(TypeMove.right);
				});

				hammer.get('swipe').set({enable: true, direction: Hammer.DIRECTION_ALL});
				element.addEventListener('touchmove', event => {
					event.preventDefault();
				});
			}
		})();

		return () => {
			// @ts-expect-error
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [platform]);

	function step(key: Keys) {
		const moveFactory = new MoveFactory();
		const gameOver = new GameOver();

		if (!gameOver.canMove(moveFactory, grid)) {
			// TODO: save result
			console.log('Game Over');
		}

		if (moveFactory[key]?.canMove(grid)) {
			moveFactory[key]?.move(grid);

			const randomCell = grid.getRandomCell();
			const newTile = new Tile();
			randomCell.linkTile(newTile);
			rerenderGrid();
		}
	}

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		const key = e.key as Keys;
		step(key);
	}, []);

	return (
		<div className={css.board} ref={elementRef}>
			{grid.cells.map(cell => (
				<>
					<div key={`cell_${cell.x}_${cell.y}`} className={css.cell}></div>
					{cell.linkedTile && <div
						key={`tile_${cell.x}_${cell.y}`}
						className={css.tile}
						style={cell.linkedTile.getStyle()}
					>
						{cell.linkedTile.value}
					</div>
					}
				</>
			))}
		</div>
	);
}

export default App;

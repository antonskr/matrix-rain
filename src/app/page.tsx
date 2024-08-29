'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from './page.module.css';
import MatrixRainClass from './matrixRain';

const MatrixRain: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [speed, setSpeed] = useState<number>(40);
	const matrixRainRef = useRef<MatrixRainClass | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		matrixRainRef.current = new MatrixRainClass(canvas, speed);

		return () => {
			if (matrixRainRef.current) {
				matrixRainRef.current.destroy();
			}
		};
	}, []);

	useEffect(() => {
		if (matrixRainRef.current) {
			matrixRainRef.current.updateSpeed(speed);
		}
	}, [speed]);

	return (
		<main className={styles.main}>
			<canvas ref={canvasRef} />
			<div className={styles.controls}>
				<label htmlFor='speed'>Speed: {Math.max(0, Math.round(1000 / speed))} fps</label>
				<input
					id='speed'
					type='range'
					min='10'
					max='100'
					value={speed}
					onChange={(e) => setSpeed(Number(e.target.value))}
				/>
			</div>
		</main>
	);
};

export default MatrixRain;

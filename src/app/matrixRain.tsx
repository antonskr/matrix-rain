import Alphabet from './alphabet';

interface IMatrixRainClass {
	canvas: HTMLCanvasElement;
	speed: number;
	fontSize: number;
	alphabet: string;
	rainDrops: number[];
	interval: NodeJS.Timeout | null;

	initialize(): void;
	draw(): void;
	handleResize(): void;
	updateSpeed(newSpeed: number): void;
	destroy(): void;
}

class MatrixRainClass implements IMatrixRainClass {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D | null;
	speed: number;
	fontSize: number;
	alphabet: string;
	rainDrops: number[];
	interval: NodeJS.Timeout | null;

	constructor(canvas: HTMLCanvasElement, speed: number = 40) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.speed = speed;
		this.fontSize = 16;
		this.alphabet = Alphabet.chars;
		this.rainDrops = [];
		this.interval = null;

		this.initialize();
	}

	initialize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		const columns = Math.floor(this.canvas.width / this.fontSize);
		this.rainDrops = Array(columns).fill(1);

		this.interval = setInterval(this.draw.bind(this), this.speed);

		window.addEventListener('resize', this.handleResize.bind(this));
		this.handleResize();
	}

	draw() {
		if (!this.ctx) return;

		this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.ctx.fillStyle = '#0F0';
		this.ctx.font = `${this.fontSize}px monospace`;

		for (let i = 0; i < this.rainDrops.length; i++) {
			const text = this.alphabet.charAt(Math.floor(Math.random() * this.alphabet.length));
			this.ctx.fillText(text, i * this.fontSize, this.rainDrops[i] * this.fontSize);

			if (this.rainDrops[i] * this.fontSize > this.canvas.height && Math.random() > 0.9) {
				this.rainDrops[i] = 0;
			}

			this.rainDrops[i] += 1;
		}
	}

	handleResize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}

	updateSpeed(newSpeed: number) {
		if (this.interval) {
			clearInterval(this.interval);
		}
		this.speed = newSpeed;
		this.interval = setInterval(this.draw.bind(this), this.speed);
	}

	destroy() {
		if (this.interval) {
			clearInterval(this.interval);
		}
		window.removeEventListener('resize', this.handleResize.bind(this));
	}
}

export default MatrixRainClass;

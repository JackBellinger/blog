<script lang="js">
	/*------------------------------*\
|* Fluid
\*------------------------------*/

	// Formula for updating the wave was taken from
	// http://jsfiddle.net/phil_mcc/sXmpD/8/#run
	// Also see: https://gamedev.stackexchange.com/a/45247

	// And another example of the spring motion:
	// https://codepen.io/jscottsmith/pen/dRyRWZ

	// Resolution of simulation
	const NUM_POINTS = 50;
	// Spring constant for forces applied by adjacent points
	const SPRING_CONSTANT = 0.1;
	// Sprint constant for force applied to baseline
	const SPRING_CONSTANT_BASELINE = 0.005;
	// Damping to apply to speed changes
	const DAMPING = 0.89;
	// Mass of each point
	const POINT_MASS = 1;
	// Draw points
	const SHOW_VERTS = false;
	// Draw radius for wave points
	const POINT_RADIUS = 4;
	// Number of points to affect when interacting
	const INTERACTIVE_SPREAD = Math.ceil(NUM_POINTS / 4);
	// Mouse Interactive Power
	const MOUSE_POW = 0.002;

	/*------------------------------*\
|* Main Canvas
\*------------------------------*/

	class Canvas {
		constructor() {
			// setup a canvas
			this.canvas = document.getElementById('canvas');
			this.dpr = window.devicePixelRatio || 1;

			this.ctx = this.canvas.getContext('2d');
			this.ctx.scale(this.dpr, this.dpr);

			this.mouse = {
				x: this.canvas.width / 2,
				y: this.canvas.height / 2,
				mousedown: false,
				power: 15 // initial wave power for demo purpose, resets to 1 in loop
			};

			this.setCanvasSize = this.setCanvasSize.bind(this);
			this.handleMousedown = this.handleMousedown.bind(this);
			this.handleMouseup = this.handleMouseup.bind(this);
			this.handleMouse = this.handleMouse.bind(this);
			this.handleClick = this.handleClick.bind(this);
			this.render = this.render.bind(this);

			this.setCanvasSize();
			this.setupListeners();

			this.constructWave();

			this.triggerWave(this.canvas.width, this.canvas.height * 1.4);
			this.triggerWave(this.canvas.width / 8, 0);

			this.tick = 0;
			this.render();
		}

		constructWave() {
			const padding = 60 * this.dpr;
			const points = NUM_POINTS;

			const y = this.canvas.height / 2;

			const p1 = new Point(0, y);

			const p2 = new Point(this.canvas.width, y);

			this.wave = new Wave(points, p1, p2);
		}

		setupListeners() {
			window.addEventListener('resize', this.setCanvasSize);
			window.addEventListener('mousedown', this.handleMousedown);
			window.addEventListener('mouseup', this.handleMouseup);
			window.addEventListener('mousemove', this.handleMouse);
			window.addEventListener('click', this.handleClick);
		}

		handleClick(event) {
			// const x = event.clientX * this.dpr;
			// const y = event.clientY * this.dpr;
			// this.mouse.x = x;
			// this.mouse.y = y;
		}

		handleMousedown(event) {
			this.mouse.mousedown = true;
		}

		handleMouseup(event) {
			this.mouse.mousedown = false;
		}

		handleMouse(event) {
			const x = event.clientX * this.dpr;
			const y = event.clientY * this.dpr;
			this.mouse.x = x;
			this.mouse.y = y;
		}

		updateWavePower() {
			const max = 10;
			const mouse = this.mouse;

			if (mouse.mousedown && mouse.power > max) {
				mouse.power = max;
				console.log(max);
			} else if (mouse.mousedown) {
				mouse.power += 0.1;
			} else {
				mouse.power = 1;
			}
		}

		triggerWave(x, y) {
			let closestPoint = {};
			let closestDistance = -1;

			const points = this.wave.points;
			let idx = 0;

			// Gets the closest point to the x coordinates
			for (var n = 0; n < points.length; n++) {
				const p = points[n];
				const distance = Math.abs(x - p.x);

				if (closestDistance === -1) {
					closestPoint = p;
					closestDistance = distance;
					idx = n;
				} else if (distance <= closestDistance) {
					closestPoint = p;
					closestDistance = distance;
					idx = n;
				}
			}

			const halfHeight = this.canvas.height / 2;
			const dy = y - halfHeight; // delta y from baseline

			const spread = INTERACTIVE_SPREAD; // number of points to affect from closest point
			const mod = (idx - spread) % points.length; // modulus
			const start = mod < 0 ? points.length + mod : mod; // starting idx accounting for negatives
			const length = spread * 2 + 1; // number of points total

			let rad = 0; // start radian
			const radInc = Math.PI / length; // radians bases on total length

			// updates the wave points at the start index applying a sin wave
			// so that it's peak is centered on the mouse
			for (let n = 0; n < length; n++) {
				const i = (start + n) % points.length;
				const point = points[i];
				const pow = Math.sin(rad) * dy * MOUSE_POW * this.mouse.power; // power determined by delta y from baseline
				point.vy += pow;
				// inc radians for sin
				rad += radInc;
			}
		}

		setCanvasSize() {
			this.canvas.width = window.innerWidth * this.dpr;
			this.canvas.height = window.innerHeight * this.dpr;
			this.canvas.style.width = window.innerWidth + 'px';
			this.canvas.style.height = window.innerHeight + 'px';

			this.constructWave();
		}

		drawBackground() {
			const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
			gradient.addColorStop(0, '#beb1ed');
			gradient.addColorStop(1, '#ea839b');
			this.ctx.fillStyle = gradient;
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}

		drawText() {
			const c7 = this.canvas.width / 7;
			const max = 200 * this.dpr;
			const size1 = c7 > max ? max : c7;
			this.ctx.font = `bold ${size1}px Futura`;
			this.ctx.textAlign = 'center';
			this.ctx.fillStyle = '#ffffff';
			this.ctx.fillText('Fluid', this.canvas.width / 2, this.canvas.height / 2 + size1 / 3);

			const size2 = 24 * this.dpr;
			this.ctx.font = `bold ${size2}px Futura`;
			this.ctx.textAlign = 'center';
			this.ctx.fillStyle = '#09203f';
			this.ctx.fillText(
				'Click and hold to interact.',
				this.canvas.width / 2,
				this.canvas.height / 3.5 + size2 / 3
			);
		}

		drawCurve() {
			this.ctx.lineCap = 'round';
			this.ctx.lineWidth = 3 * this.dpr;
			this.ctx.strokeStyle = '#b224ef';

			// handy ref for getting the max or min value of an array
			// https://stackoverflow.com/a/4020842
			const highestPoint = Math.min.apply(
				Math,
				this.wave.points.map((o) => o.y)
			);

			const gradient = this.ctx.createLinearGradient(
				0,
				highestPoint,
				20,
				this.canvas.height + highestPoint / 4
			);
			gradient.addColorStop(0, 'rgba(124, 231, 249, 0.7)');
			gradient.addColorStop(0.5, 'rgba(72, 197, 239, 0.8)');
			gradient.addColorStop(1, '#1380b2');
			this.ctx.fillStyle = gradient;

			this.ctx.beginPath();
			this.ctx.moveTo(this.wave.points[0].x, this.wave.points[0].y);

			for (let n = 0; n < this.wave.points.length - 1; n++) {
				const p1 = this.wave.points[n];
				const p2 = this.wave.points[n + 1];

				const cpx = (p1.x + p2.x) / 2;
				const cpy = (p1.y + p2.y) / 2;

				if (n === this.wave.points.length - 2) {
					this.ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
				} else {
					this.ctx.quadraticCurveTo(p1.x, p1.y, cpx, cpy);
				}
			}

			this.ctx.lineTo(this.canvas.width, this.canvas.height);

			this.ctx.lineTo(0, this.canvas.height);

			this.ctx.closePath();
			this.ctx.fill();
		}

		drawVerts() {
			this.ctx.lineWidth = 2 * this.dpr;
			this.ctx.strokeStyle = '#009efd';

			this.wave.points.forEach((p) => {
				this.ctx.beginPath();
				this.ctx.arc(p.x, p.y, POINT_RADIUS * this.dpr, 0, Math.PI * 2, true);
				this.ctx.closePath();
				this.ctx.fill();
				this.ctx.stroke();
			});
		}

		drawMouse() {
			this.ctx.lineWidth = 2 * this.dpr;

			if (this.mouse.mousedown) {
				this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
				this.ctx.strokeStyle = '#537895';
				this.ctx.beginPath();
				this.ctx.arc(
					this.mouse.x,
					this.mouse.y,
					16 * this.dpr * this.mouse.power,
					0,
					Math.PI * 2,
					true
				);
				this.ctx.closePath();
				this.ctx.stroke();
				this.ctx.fill();
			}

			this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
			this.ctx.strokeStyle = this.mouse.mousedown ? '#ed6ea0' : '#537895';

			this.ctx.beginPath();
			this.ctx.arc(this.mouse.x, this.mouse.y, 16 * this.dpr, 0, Math.PI * 2, true);
			this.ctx.closePath();
			this.mouse.mousedown && this.ctx.fill();
			this.ctx.stroke();
		}

		updateWave() {
			// http://jsfiddle.net/phil_mcc/sXmpD/8/#run
			// https://gamedev.stackexchange.com/a/45247

			const points = this.wave.points;

			for (var n = 0; n < points.length; n++) {
				const p = points[n];

				// force to apply to this point
				let force = 0;

				// forces caused by the point immediately to the left or the right
				let forceFromLeft;
				let forceFromRight;

				if (n === 0) {
					// wrap to left-to-right
					let dy = points[points.length - 1].y - p.y;
					forceFromLeft = SPRING_CONSTANT * dy;
				} else {
					// normally
					let dy = points[n - 1].y - p.y;
					forceFromLeft = SPRING_CONSTANT * dy;
				}
				if (n === points.length - 1) {
					// wrap to right-to-left
					let dy = points[0].y - p.y;
					forceFromRight = SPRING_CONSTANT * dy;
				} else {
					// normally
					let dy = points[n + 1].y - p.y;
					forceFromRight = SPRING_CONSTANT * dy;
				}

				// Also apply force toward the baseline
				let dy = this.canvas.height / 2 - p.y;
				const forceToBaseline = SPRING_CONSTANT_BASELINE * dy;

				// Sum up forces
				force = force + forceFromLeft;
				force = force + forceFromRight;
				force = force + forceToBaseline;

				// Calculate acceleration
				const acceleration = force / p.mass;

				// Apply acceleration (with damping)
				p.vy = DAMPING * p.vy + acceleration;

				// Apply speed
				p.y = p.y + p.vy;
			}
		}

		render() {
			this.drawBackground();
			this.drawText();
			this.drawCurve();
			SHOW_VERTS && this.drawVerts();
			this.drawMouse();

			// Trigger on mousedown
			if (this.mouse.mousedown) {
				const { x, y } = this.mouse;
				this.triggerWave(x, y);
			}

			this.updateWavePower();
			this.updateWave();

			this.tick++;

			window.requestAnimationFrame(this.render);
		}
	}

	/*------------------------------*\
|* Wave
\*------------------------------*/

	class Wave {
		constructor(points, p1, p2) {
			this.p1 = p1;
			this.p2 = p2;

			const dx = p2.x - p1.x;
			const dy = p2.y - p1.y;

			const vx = dx / (points - 1);
			const vy = dy / (points - 1);

			this.points = new Array(points)
				.fill(null)
				.map((p, i) => new Point(p1.x + vx * i, p1.y + vy * i));
		}
	}

	/*------------------------------*\
|* Point
\*------------------------------*/

	class Point {
		constructor(x = 0, y = 0) {
			this.x = x;
			this.y = y;

			this.vy = 0;
			this.vx = 0;

			this.mass = POINT_MASS;
		}

		get position() {
			return {
				x: this.x,
				y: this.y
			};
		}

		moveTo(...args) {
			this.x = args[0];
			this.y = args[1];
		}
	}

	new Canvas();
</script>

<body>
	<canvas id="canvas" />
</body>

<style>
	body {
		height: 100%;
		width: 100%;
		overflow: hidden;
		margin: 0;
		padding: 0;
		cursor: none;
	}
</style>

<script lang="ts">
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { onMount, onDestroy } from 'svelte'; // Import onDestroy
	import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force';
	import type { BlogPost } from '@lib/utils/types.ts';

	export let articles: BlogPost[];

	// --- Component State ---
	let container: HTMLDivElement;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let controls: OrbitControls;
	let points: THREE.Points | null = null; // Initialize as null
	let lines: THREE.LineSegments | null = null; // Initialize as null
	let animationFrameId: number;

	interface LightAnimation {
		update(
			particle: { position: THREE.Vector3 },
			time: number,
			color: THREE.Color,
			sizeAttribute: THREE.Float32BufferAttribute,
			index: number
		): void;
	}
	let lightAnimations: { [key: string]: LightAnimation } = {};
	let currentAnimation: string = 'firefly';
	let hoveredArticle: { title: string; description: string } | null = null;
	let hoveredPosition: { x: number; y: number } | null = null;

	// --- Basic Setup (Runs Once) ---
	onMount(() => {
		if (!container) return;

		// Scene, Camera, Renderer
		scene = new THREE.Scene();
		const axesHelper = new THREE.AxesHelper(50); // Length of 50 units
		scene.add(axesHelper);
		camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 2000); // Increased far plane
		camera.position.z = 250; // Start further back

		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(container.clientWidth, container.clientHeight);
		container.appendChild(renderer.domElement);

		// Controls
		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;

		// Event Listeners
		window.addEventListener('resize', onWindowResize, false);
		window.addEventListener('mousemove', onMouseMove, false); // Add listeners here
		window.addEventListener('click', onMouseClick, false);

		// Start animation loop
		setupAnimations();
		animate();

		// Cleanup function remains largely the same
		return () => {
			window.removeEventListener('resize', onWindowResize);
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('click', onMouseClick);
			cancelAnimationFrame(animationFrameId); // Stop animation loop
			controls?.dispose();
			if (renderer) {
				// Dispose geometries and materials if points/lines exist
				points?.geometry.dispose();
				(points?.material as THREE.Material)?.dispose();
				lines?.geometry.dispose();
				(lines?.material as THREE.Material)?.dispose();
				renderer.dispose();
			}
			if (container && renderer?.domElement) {
				container.removeChild(renderer.domElement);
			}
			scene?.clear(); // Clear scene children
		};
	});

	// --- Reactive Block for Scene Content (Runs when `articles` changes) ---
	$: if (articles && articles.length > 0 && scene && renderer) {
		console.log('Articles updated, rebuilding constellation...');
		createPointsAndLines(articles); // Pass articles explicitly
	} else if (scene) {
		// Clear scene if articles become empty after being populated
		cleanupSceneObjects();
	}

	function cleanupSceneObjects() {
		if (points) {
			scene.remove(points);
			points.geometry.dispose();
			(points.material as THREE.Material).dispose();
			points = null;
		}
		if (lines) {
			scene.remove(lines);
			lines.geometry.dispose();
			(lines.material as THREE.Material).dispose();
			lines = null;
		}
	}

	// --- Functions ---

	function createPointsAndLines(currentArticles: BlogPost[]) {
		// Accept articles as argument
		if (!scene) return; // Ensure scene exists

		// **Cleanup previous objects first**
		cleanupSceneObjects();

		// --- Geometry and Material Setup ---
		const geometry = new THREE.BufferGeometry();
		const positions = [];
		const colors = [];
		const sizes = [];
		// Links data will store slugs (strings) now
		const linksData: { source: string; target: string }[] = [];
		const linkMaterial = new THREE.LineBasicMaterial({ color: 0x888888, transparent: true, opacity: 0.4 }); // Slightly more transparent
		const linkGeometry = new THREE.BufferGeometry();
		const linkPositions = [];

		// --- Node and Link Processing ---
		const nodes = currentArticles.map((article) => ({
			id: article.slug, // This is the ID d3 will use
			x: Math.random() * 300 - 150,
			y: Math.random() * 300 - 150,
			z: Math.random() * 300 - 150,
			link: `/blog/articles/${article.slug}`,
			title: article.title,
			description: article.excerpt,
			// Store original article data for hover/click lookup
			originalArticle: article
		}));

		// Use a Set for efficient lookup of slugs present in this batch
		const currentSlugs = new Set(nodes.map((node) => node.id));
		// Map slugs back to their node objects for easy position lookup later
		const nodeMap = new Map(nodes.map((node) => [node.id, node]));

		currentArticles.forEach((article) => {
			const sourceSlug = article.slug; // Get the source slug
			if (Array.isArray(article.relatedPosts)) {
				article.relatedPosts.forEach((relatedPost) => {
					const targetSlug = relatedPost?.slug; // Get the target slug

					// Ensure both source and target slugs exist in the current nodes batch
					if (targetSlug && currentSlugs.has(sourceSlug) && currentSlugs.has(targetSlug)) {
						if (sourceSlug !== targetSlug) {
							// Avoid self-links
							// Push the slugs, not indices
							linksData.push({ source: sourceSlug, target: targetSlug });
						}
					}
				});
			}
		});

		// --- D3 Force Simulation ---
		const simulation = forceSimulation(nodes)
			// Now forceLink correctly uses the slugs provided in linksData
			// because the .id() accessor tells it to look for the 'id' property (slug)
			.force(
				'link',
				forceLink(linksData)
					.id((d: any) => d.id)
					.distance(60)
					.strength(0.5)
			)
			.force('charge', forceManyBody().strength(-50)) // Adjusted charge
			.force('center', forceCenter(0, 0))
			.stop(); // Stop simulation initially

		// Run simulation ticks synchronously
		for (
			let i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()));
			i < n;
			++i
		) {
			simulation.tick();
		}
		console.log('Simulation finished.');

		// --- Populate THREE Geometry ---
		nodes.forEach((node) => {
			// Check for NaN positions which can happen if simulation explodes
			if (isNaN(node.x) || isNaN(node.y) || isNaN(node.z)) {
				console.warn(`Node ${node.id} has invalid position after simulation. Setting to origin.`);
				node.x = 0;
				node.y = 0;
				node.z = 0;
			}
			positions.push(node.x, node.y, node.z);
			const hash = node.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
			const color = new THREE.Color().setHSL((hash % 100) / 100, 0.7, 0.6);
			colors.push(color.r, color.g, color.b);
			sizes.push(1.5);
		});

		// Populate link positions using the nodeMap for lookup by slug
		linksData.forEach((link) => {
			const sourceNode = nodeMap.get(link.source);
			const targetNode = nodeMap.get(link.target);
			if (sourceNode && targetNode && !isNaN(sourceNode.x) && !isNaN(targetNode.x)) {
				// Check nodes and positions
				linkPositions.push(sourceNode.x, sourceNode.y, sourceNode.z, targetNode.x, targetNode.y, targetNode.z);
			}
		});

		if (positions.length === 0) {
			console.warn('No valid node positions generated.');
			return; // Don't create empty geometries
		}

		geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
		geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
		geometry.computeBoundingSphere(); // Important for raycasting

		if (linkPositions.length > 0) {
			linkGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linkPositions, 3));
			lines = new THREE.LineSegments(linkGeometry, linkMaterial);
			scene.add(lines);
		}

		const material = new THREE.PointsMaterial({
			size: 0.15, // Slightly larger base size
			vertexColors: true,
			transparent: true,
			opacity: 0.9,
			sizeAttenuation: true
		});

		points = new THREE.Points(geometry, material);
		scene.add(points);
		console.log('Points and lines added to scene.');
	}

	function onWindowResize() {
		if (!camera || !renderer || !container) return;
		camera.aspect = container.clientWidth / container.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(container.clientWidth, container.clientHeight);
	}

	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();
	raycaster.params.Points.threshold = 0.5;

	function onMouseMove(event: MouseEvent) {
		// Guard clauses moved inside for clarity
		if (!renderer || !camera || !points || !container) return;

		const rect = container.getBoundingClientRect(); // Use container's rect
		mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
		mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObject(points); // Raycast against current points object

		if (intersects.length > 0) {
			intersects.sort((a, b) => a.distanceToRay - b.distanceToRay);
			const index = intersects[0].index;

			// Access article data directly from the prop using the index
			// This assumes the order of points in the geometry matches the order in the 'articles' prop
			const article = articles[index];
			if (article) {
				hoveredArticle = { title: article.title, description: article.excerpt };
				hoveredPosition = { x: event.clientX, y: event.clientY };
			} else {
				hoveredArticle = null;
				hoveredPosition = null;
			}
		} else {
			hoveredArticle = null;
			hoveredPosition = null;
		}
	}

	function onMouseClick(event: MouseEvent) {
		if (!renderer || !camera || !points || !container) return;

		const rect = container.getBoundingClientRect();
		mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
		mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObject(points);

		if (intersects.length > 0) {
			intersects.sort((a, b) => a.distanceToRay - b.distanceToRay);
			const index = intersects[0].index;
			// Access article data directly from the prop using the index
			const clickedArticle = articles[index];
			if (clickedArticle?.slug) {
				// Check if slug exists
				// Navigate using the constructed link or slug
				window.open(`/blog/articles/${clickedArticle.slug}`, '_blank');
			}
		}
	}

	function animate() {
		animationFrameId = requestAnimationFrame(animate); // Store the frame ID
		controls?.update(); // Use optional chaining
		updatePoints();
		if (renderer && scene && camera) {
			renderer.render(scene, camera);
		}
	}

	function updatePoints() {
		// Ensure points and attributes exist before updating
		if (
			!points?.geometry?.attributes?.position ||
			!points?.geometry?.attributes?.color ||
			!points?.geometry?.attributes?.size
		)
			return;

		const time = performance.now() * 0.001;
		const positionAttribute = points.geometry.attributes.position;
		const colorAttribute = points.geometry.attributes.color;
		const sizeAttribute = points.geometry.attributes.size as THREE.Float32BufferAttribute;

		// Check if count is valid
		if (positionAttribute.count === 0) return;

		// Avoid creating new objects in the loop
		const tempPosition = new THREE.Vector3();
		const tempColor = new THREE.Color();

		for (let i = 0; i < positionAttribute.count; i++) {
			tempPosition.fromBufferAttribute(positionAttribute, i);
			tempColor.fromBufferAttribute(colorAttribute, i);

			const animation = lightAnimations[currentAnimation];
			if (animation) {
				animation.update({ position: tempPosition }, time, tempColor, sizeAttribute, i);
				colorAttribute.setXYZ(i, tempColor.r, tempColor.g, tempColor.b);
			}
		}

		colorAttribute.needsUpdate = true;
		sizeAttribute.needsUpdate = true;
	}

	// setupAnimations remains the same
	function setupAnimations() {
		// Firefly Animation Example
		lightAnimations.firefly = {
			update: (particle, time, color, sizeAttribute, index) => {
				const flicker = Math.sin(time * 10 + particle.position.x * 0.1 + particle.position.y * 0.05) * 0.5 + 0.5;
				const baseSize = 0.15; // Match material base size
				const flickerSize = flicker * 0.05;
				color.setHSL(((time * 50 + particle.position.z * 0.02) % 360) / 360, 1.0, 0.5 * flicker + 0.1); // Ensure minimum brightness
				sizeAttribute.setX(index, baseSize + flickerSize);
			}
		};
		// Pulse Animation Example
		lightAnimations.pulse = {
			update: (particle, time, color, sizeAttribute, index) => {
				const pulse = Math.abs(Math.sin(time * 5 + particle.position.y * 0.1));
				const baseSize = 0.15;
				const pulseSize = pulse * 0.1;
				color.setRGB(pulse * 0.8 + 0.2, pulse * 0.6 + 0.1, pulse * 0.8 + 0.2); // Brighter pulse
				sizeAttribute.setX(index, baseSize + pulseSize);
			}
		};
		// Color Cycle Animation Example
		lightAnimations.colorCycle = {
			update: (particle, time, color, sizeAttribute, index) => {
				color.setHSL(((time * 80 + particle.position.x * 0.01) % 360) / 360, 0.9, 0.6); // Slightly desaturated/brighter
				sizeAttribute.setX(index, 0.15); // Set base size
			}
		};
	}
</script>

<!-- {@debug articles} -->
<!-- Keep this if helpful during dev -->
<div bind:this={container} style="width: 100%; height: 100%; position: relative; overflow: hidden;">
	{#if hoveredArticle && hoveredPosition}
		<div
			style="position: absolute; left: {hoveredPosition.x + 15}px; top: {hoveredPosition.y +
				15}px; background: rgba(0, 0, 0, 0.8); color: white; padding: 8px 12px; border-radius: 4px; font-size: 0.9em; pointer-events: none; z-index: 10; max-width: 250px; word-wrap: break-word; backdrop-filter: blur(2px);"
		>
			<h3 style="margin: 0 0 5px 0; font-size: 1em;">{hoveredArticle.title}</h3>
			<p style="margin: 0;">{hoveredArticle.description}</p>
		</div>
	{/if}
</div>

<style>
	div[style*='width: 100%; height: 100%;'] {
		min-height: 400px;
	}
</style>

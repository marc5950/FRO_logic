document.addEventListener("mousemove", (e) => {
	// Beregn saturation ud fra musens Y-position (0-100%)
	const saturation = Math.round((e.clientY / window.innerHeight) * 100);
	const h = Math.round((e.clientX / window.innerHeight) * 100);
	const l = 60;
	document.body.style.background = `hsl(${h}, ${saturation}%, ${l}%)`;
	console.log(saturation, h, l);
});

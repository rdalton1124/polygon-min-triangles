let canvas; 
let context; 
let centerX, centerY; 
let path; 
let input;
init();

function init() {
	canvas = document.getElementById('canvas'); 
	context = canvas.getContext('2d'); 
	context.strokeStyle = '#000000';
	context.strokeRect(1, 1, 639, 479);
	centerX = parseInt(canvas.width) / 2; 
	centerY = parseInt(canvas.height) / 2; 
	input = document.getElementById('sides');

}
function process(event) {
	console.log("process called");
	let sides = input.value; 
	sides = parseInt(sides);
	context.fillStyle='#FFFFFF'; 
	context.fillRect(2, 2, 637, 477); 
	let arr = createStandardPolygon(sides,200); 
	drawOptPolygon(arr);
	event.preventDefault();
}
function createStandardPolygon(sides, radius) {
	arr = new Array(); 

	for (let i = 0; i <= sides; i++) {
		arr.push([centerX + radius * Math.cos((i / sides) * 2 * Math.PI), 
			centerY - radius * Math.sin((i / sides) * 2 * Math.PI)]); 
	}
	return arr; 
}

function drawOutOfArr(arr) {
	let pth = new Path2D(); 
	for(let i = 0; i < arr.length; i++) {
		pth.lineTo(arr[i][0], arr[i][1]);
	}
	context.stroke(pth);
 }
function drawStandardPolygon(sides, radius) {
	path = new Path2D(); 
	//path.moveTo(centerX, centerY - radius); 
	context.strokeStyle='#000000';
	for(let i = 0; i <= sides; i++) {
		path.lineTo(centerX + radius * Math.cos((i / sides) * 2 * Math.PI), centerY - radius * Math.sin((i / sides) * 2 * Math.PI));
	}

	context.stroke(path); 
}
function drawTriangle(x1, y1, x2, y2, x3, y3) {
	let trin = new Path2D(); 
	trin.moveTo(x1, y1); 
	trin.lineTo(x2, y2); 
	trin.lineTo(x3, y3); 
	trin.lineTo(x1, y1); 

	context.stroke(trin);
}
function drawOptPolygon(arr) {
	let pth = new Path2D(); 
	for(let i = 0; i <= arr.length - 3; i++) {
		drawTriangle(arr[i][0], arr[i][1],
			arr[i + 1][0], arr[i + 1][1],
			arr[i + 2][0], arr[i + 2][1]);
		arr.splice(i + 1, 1);
	}
	console.log(arr);
	if(arr.length >= 3)
		drawOptPolygon(arr);
	
}
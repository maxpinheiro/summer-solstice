// TODO:
// 0. load/save from localstorage
// 1. zoom
// 2. get /r/pam
// 3. menu resize so can add many more icons $("div.parent a").css("width", (($("div.parent").width() / $("div.parent a").length ) -2) + "px");

// -load in image and pixelate: http://stackoverflow.com/questions/164181/how-to-fetch-a-remote-image-to-display-in-a-canvas

function v2FormatToPixelArray(v2Format) {
	let pixelArray = [];
	let invertedPalette = Object.fromEntries(Object.entries(v2Format.palette).map(e => [e[1],e[0]]));
	for(let streakRow of v2Format.rows) {
		let streaks = streakRow.split(",");
		let pixelRow = [];
		for(let streak of streaks) {
			let [colorId, length] = streak.split("*");
			let cells = Array.from({length}, _ => invertedPalette[colorId]);
			pixelRow.push(...cells);
		}
		pixelArray.push(pixelRow);
	}
	return pixelArray;
}



function Editor(canvas, gridCanvas, toolCanvas) {
	this.canvas = canvas;
	this.gridCanvas = gridCanvas;
	this.toolCanvas = toolCanvas;

	this.pixelSize = 8;
	this.gridSize = 500;

	let canvasSizeInActualPixels = this.pixelSize * this.gridSize;
	this.toolCanvas.width = this.canvas.width = this.gridCanvas.width = canvasSizeInActualPixels;
	this.toolCanvas.height = this.canvas.height = this.gridCanvas.height = canvasSizeInActualPixels;

	this.cW = canvas.width;
	this.cH = canvas.height;

	this.ctx = this.canvas.getContext('2d');
	this.gridCtx = this.gridCanvas.getContext('2d');
	this.toolCtx = this.toolCanvas.getContext('2d');


	if(localStorage["gridType"] !== undefined) this.gridType = parseInt(localStorage["gridType"]);
	else this.gridType = 1;

	this.loading_offshoot = loading_offshoot;

	this.gridLineWidth = 0.3;
	this.mouseGridPos = [0,0];
	this.mouseIsDown = false;
	this.currentTool = 'pen';
	this.prevTool = '';

	this.saveCoords = [0,0,0,0];//x1,y1,x2,y2
	this.saveStage = 0;
	this.marqueeCoords = [0,0,0,0];//x1,y1,x2,y2
	this.marqueeStage = 1;
	this.marqueePixelArray = [];

	this.penColor = "1EC7FA";
	this.backgroundColor = "0";
	this.gridColor = "bbbbbb";

	this.historyArray = [];

	this.time_elapsed = 0;
	setInterval(
		$.proxy(function(){this.time_elapsed++},this),
		1000);

	//Build pixel array
	this.pixelArray = new Array(this.gridSize); //[x][y]
	for(var i = 0; i < this.pixelArray.length; i++) {
		this.pixelArray[i] = new Array(this.gridSize);
		for(var j = 0; j < this.pixelArray[i].length; j++) {
			//pixelArray[i][j] = String(Math.floor(Math.random()*10)) + String(Math.floor(Math.random()*10)) + String(Math.floor(Math.random()*10));
			this.pixelArray[i][j] = this.backgroundColor;
		}
	}

	this.zoom=zoom;
	function zoom(dir) {
		if(dir == 'out') {


		} else if(dir == 'in') {

		} else {
			console.log("Zoom dir not recognised.")
		}
	}

	this.loadPixelArray=loadPixelArray;
	function loadPixelArray(pixelArray) {
		// this function is needed (instead of just editor.pixelArray=newPixelArray) because it's possible for the pixel array to be smaller than this editor's grid size, so we need to extend the pixel array to fit the grid size
		for(let row of pixelArray) {
			while(row.length < this.gridSize) row.push("0"); // add transparent pixels
		}
		while(pixelArray.length < this.gridSize) {
			let row = new Array(this.gridSize).fill("0");
			pixelArray.push(row);
		}
		this.pixelArray = pixelArray;
	}

	/*======================
	        RENDERING
	  ======================*/
	this.renderAll=renderAll;
	function renderAll() {
		//Clear pixel canvas:
		this.ctx.beginPath(); this.ctx.clearRect(0, 0, this.cW, this.cH);

		this.renderPixelArray();
		//this.renderGrid();
		this.renderCursor();
		this.renderTools();//##? just added this
	}
	this.renderPixelArray=renderPixelArray;
	function renderPixelArray() {

		// for(var i = 0; i < this.pixelArray.length; i++) {
		// 	for(var j = 0; j < this.pixelArray[i].length; j++) {
		// 		this.renderPixel([i,j], this.pixelArray[i][j]);
		// 	}
		// }

		// render in streaks because it's faster:
		for(var i = 0; i < this.pixelArray.length; i++) {
    	let streakLength = 1;
    	let streakStartPos = [i, 0];
    	let streakColor = this.pixelArray[i][0];
    	for(var j = 1; j < this.pixelArray[i].length; j++) {
    		if(this.pixelArray[i][j] === streakColor) {
    			streakLength++;
    		} else {
    			this.renderPixelStreak(streakStartPos, streakLength, streakColor);
    			streakLength = 1;
    			streakStartPos = [i, j];
    			streakColor = this.pixelArray[i][j];
    		}
    	}
    	this.renderPixelStreak(streakStartPos, streakLength, streakColor);
    }

	}
	this.renderGrid=renderGrid;
	function renderGrid() {
		this.gridCtx.beginPath(); this.gridCtx.clearRect(0, 0, this.cW, this.cH);
		for(var x = 0; x <= this.cW; x += this.pixelSize) {
			this.gridCtx.moveTo(x, 0);
			this.gridCtx.lineTo(x, this.cH);
		}
		for(var y = 0; y <= this.cH; y += this.pixelSize) {
			this.gridCtx.moveTo(0, y);
			this.gridCtx.lineTo(this.cW, y);
		}
		this.gridCtx.strokeStyle = "#"+this.gridColor;
		this.gridCtx.lineWidth = this.gridLineWidth;
		this.gridCtx.stroke();
	}

	this.renderCursor=renderCursor;
	function renderCursor() {
		if(this.currentTool == 'pen') {
			this.renderToolPixel(this.mouseGridPos,this.penColor);
		} else if(this.currentTool == 'eraser' || this.currentTool == 'eyedropper') {
			this.toolCtx.clearRect(this.mouseGridPos[0]*this.pixelSize+1, this.mouseGridPos[1]*this.pixelSize+1, this.pixelSize-2, this.pixelSize-2);
			this.toolCtx.beginPath();
			this.toolCtx.rect(this.mouseGridPos[0]*this.pixelSize+1,this.mouseGridPos[1]*this.pixelSize+1,this.pixelSize-2,this.pixelSize-2);
			this.toolCtx.lineWidth = 2;
			this.toolCtx.strokeStyle = 'black';
			this.toolCtx.stroke();
		} else if(this.currentTool == 'bucket') {
			this.toolCtx.fillStyle="#"+this.penColor;
			this.toolCtx.fillRect(this.mouseGridPos[0]*this.pixelSize + 0.25*this.pixelSize,this.mouseGridPos[1]*this.pixelSize + 0.25*this.pixelSize,0.5*this.pixelSize,0.5*this.pixelSize);
		}
	}

	this.renderTools=renderTools;
	function renderTools() {
		this.toolCtx.beginPath(); this.toolCtx.clearRect(0, 0, this.cW, this.cH);
		//render 'save' marquee
		if(this.currentTool == 'save' && this.saveStage == 3) {
			this.toolCtx.rect(this.saveCoords[0]*this.pixelSize,this.saveCoords[1]*this.pixelSize,this.saveCoords[2]*this.pixelSize-this.saveCoords[0]*this.pixelSize,this.saveCoords[3]*this.pixelSize-this.saveCoords[1]*this.pixelSize);
			if (!this.toolCtx.setLineDash) {this.toolCtx.setLineDash = function () {}}
			else this.toolCtx.setLineDash([5]);
			this.toolCtx.lineWidth = 3;
			this.toolCtx.strokeStyle = 'black';
			this.toolCtx.stroke();
		}
		//render marqueed pixels
		if(this.currentTool == 'marquee' && (this.marqueeStage == 5 || this.marqueeStage == 6) ) {//##
			for(var i = 0; i < this.marqueePixelArray.length; i++) {
				for(var j = 0; j < this.marqueePixelArray[i].length; j++) {
					if(this.marqueePixelArray[i][j] !== this.backgroundColor) this.renderToolPixel([i+this.marqueeCoords[0],j+this.marqueeCoords[1]], this.marqueePixelArray[i][j]);
				}
			}
		}
		//render marquee
		if(this.currentTool == 'marquee' && (this.marqueeStage == 3 || this.marqueeStage == 4 || this.marqueeStage == 5 || this.marqueeStage == 6) ) {
			this.toolCtx.rect(this.marqueeCoords[0]*this.pixelSize,this.marqueeCoords[1]*this.pixelSize,this.marqueeCoords[2]*this.pixelSize-this.marqueeCoords[0]*this.pixelSize,this.marqueeCoords[3]*this.pixelSize-this.marqueeCoords[1]*this.pixelSize);
			if (!this.toolCtx.setLineDash) {this.toolCtx.setLineDash = function () {}}
			else this.toolCtx.setLineDash([5]);
			this.toolCtx.lineWidth = 3;
			this.toolCtx.strokeStyle = 'black';
			this.toolCtx.stroke();
		}
	}

	//just render it (not changing the pixel array)
	this.renderPixel=renderPixel;
	function renderPixel(pos,color, forceClear) {
		if(color == this.backgroundColor) {//zero means blank (transparent) so clear the pixel
			this.ctx.clearRect(pos[0]*this.pixelSize,pos[1]*this.pixelSize,this.pixelSize,this.pixelSize);
		} else if(color !== -1) {
			this.ctx.fillStyle="#"+color.toLowerCase(); //toLowerCase because it may or may not solve a performance problem that I'm debugging
			this.ctx.fillRect(pos[0]*this.pixelSize,pos[1]*this.pixelSize,this.pixelSize,this.pixelSize);
		} else if(forceClear === true) { //i.e. it is -1, now chekc if we need to clear
			this.ctx.clearRect(pos[0]*this.pixelSize,pos[1]*this.pixelSize,this.pixelSize,this.pixelSize);
		} else {
			console.log("Error in renderPixel 1")
		}
	}
	this.renderPixelStreak=renderPixelStreak;
	function renderPixelStreak(pos, length, color, forceClear) {
		// NOTE: These are VERTICAL streaks.
		if(color == this.backgroundColor) {//zero means blank (transparent) so clear the pixel
			this.ctx.clearRect(pos[0]*this.pixelSize,pos[1]*this.pixelSize,this.pixelSize,this.pixelSize*length);
		} else if(color !== -1) {
			this.ctx.fillStyle="#"+color.toLowerCase(); //toLowerCase because it may or may not solve a performance problem that I'm debugging
			this.ctx.fillRect(pos[0]*this.pixelSize,pos[1]*this.pixelSize,this.pixelSize,this.pixelSize*length);
		} else if(forceClear === true) { //i.e. it is -1, now chekc if we need to clear
			this.ctx.clearRect(pos[0]*this.pixelSize,pos[1]*this.pixelSize,this.pixelSize,this.pixelSize*length);
		} else {
			console.log("Error in renderPixel 1")
		}
	}
	//just render it (not changing the pixel array)
	this.renderToolPixel=renderToolPixel;
	function renderToolPixel(pos,color,forceClear) {
		if(color !== -1) {
			this.toolCtx.fillStyle="#"+color;
			this.toolCtx.fillRect(pos[0]*this.pixelSize,pos[1]*this.pixelSize,this.pixelSize,this.pixelSize);
		} else if(forceClear === true) { //i.e. it is -1, now chekc if we need to clear
			this.toolCtx.clearRect(pos[0]*this.pixelSize,pos[1]*this.pixelSize,this.pixelSize,this.pixelSize);
		}
	}

	/*================================
	          GENERAL FUNTIONS
	  ================================*/

	this.getPixelsFromArray=getPixelsFromArray;
	function getPixelsFromArray(coords) {
		var arrayTo = new Array(coords[2]-coords[0]);
		for(var i = 0; i < arrayTo.length; i++) arrayTo[i] = new Array(coords[3]-coords[1]);
		for(var x = coords[0]; x >= coords[0] && x < coords[2]; x++ ) {
			for(var y = coords[1]; y >= coords[1] && y < coords[3]; y++ ) {
				arrayTo[x-coords[0]][y-coords[1]] = this.pixelArray[x][y];
				//console.log(arrayTo[x][y]);
			}
		}
		return arrayTo;
	}



	//change the pixel array and render it:
	this.drawPixel=drawPixel;
	function drawPixel(pos, color) {
		this.pixelArray[pos[0]][pos[1]] = color;
		this.renderPixel(pos, color);
	}

	this.changeTool=changeTool;
	function changeTool(tool) {
		this.prevTool = this.currentTool;
		this.currentTool = tool;

		//reset 'process' tools
		if(this.currentTool !== 'marquee') {this.marqueeStage = 1;} //accidently started at 1 for this
		if(this.currentTool !== 'save') {this.saveStage = 0;}

		$('.menu-bar .item div.tint').hide();
		$('.menu-bar .'+tool+'-button div.tint').show();

		this.renderTools();
		this.renderCursor();
	}
	this.erasePixel=erasePixel;
	function erasePixel(pos) {
		this.pixelArray[pos[0]][pos[1]] = this.backgroundColor;
		this.renderPixel(pos,this.backgroundColor);
	}

	this.getColorAtPos=getColorAtPos;
	function getColorAtPos(pos) {
		if(pos[0] < this.gridSize-1 && pos[1] < this.gridSize-1 && pos[0] >= 0 && pos[1] >= 0) {
			if(this.pixelArray[pos[0]][pos[1]] === this.backgroundColor) return "ffffff";
			else return this.pixelArray[pos[0]][pos[1]];
		}
		else {
			return -1; //outside of canvas
		}
	}

	this.clearAllPixels=clearAllPixels;
	function clearAllPixels() {
		for(var i = 0; i < this.pixelArray.length; i++) {
			for(var j = 0; j < this.pixelArray[i].length; j++) {
				this.pixelArray[i][j] = this.backgroundColor;
			}
		}
		this.renderAll();
	}
	this.toggleGrid=toggleGrid;
	function toggleGrid() {
		if(this.gridType == 1) {
			$(this.canvas).css('background','transparent');
			this.gridType = 2;
		} else if(this.gridType == 2) {
			$(this.gridCanvas).hide();
			this.gridType = 3;
		} else if(this.gridType == 3) {
			$(this.canvas).css('background-image',"url('../img/transparent-square.png')");
			$(this.canvas).css('background-size',this.pixelSize+"px");
			this.gridType = 4;
		} else if(this.gridType == 4) {
			$(this.gridCanvas).show();
			this.gridType = 1;
		} else {
			this.gridType = 1;
		}
		localStorage["gridType"] = this.gridType;
	}

	this.cancelFill = false;
	this.fillingInProgress = false;
	this.bucketFill=bucketFill;
	function bucketFill(startPos,targetColor,fillColor) {

		var maxFillDistance = 100; // <-- because the algorithm isn't optimised

		if(targetColor == fillColor) {
			console.log("Target color == fill color");
			return;
		}
		if(!this.fillingInProgress) {
			console.log("Beginning fill");
			this.fillingInProgress = true;
			this.pushPixelsToHistoryArray();
			var que = [];
			que.push(startPos);
			var node;
			function fillLoop() {
				if(editor.cancelFill === true) {
					editor.cancelFill = false;
					editor.fillingInProgress = false;
					return;
				}
				var loopCount = 0;
				while(que.length > 0) {
					node = que[que.length-1];
					que.pop();
					var isCloseEnoughToStart = Math.abs(node[0]-startPos[0]) < maxFillDistance && Math.abs(node[1]-startPos[1]) < maxFillDistance;
					if(isCloseEnoughToStart && editor.getColorAtPos(node) === targetColor) {
						editor.pixelArray[node[0]][node[1]] = fillColor;
						que.push([node[0]+1,node[1]]);
						que.push([node[0]-1,node[1]]);
						que.push([node[0],node[1]+1]);
						que.push([node[0],node[1]-1]);
					}
					loopCount++;
					if(loopCount > 10000) {
						if(editor.cancelFill === true) {
							editor.cancelFill = false;
							editor.fillingInProgress = false;
							return;
						}
						setTimeout(fillLoop,10);
						editor.renderAll();
						break;
					}
				}
				if(que.length <= 0) editor.fillingInProgress = false;
				editor.renderAll();
			}
			fillLoop();

		} else {
			alert("Please wait for the previous fill to finish.");
		}
	}
	/*this.bucketFill=bucketFill;
	function bucketFill(pos,targetColor,fillColor) {
		this.pushPixelsToHistoryArray();
		var que = [];
		que.push(pos);
		var node;
		while(que.length > 0) {
			node = que[que.length-1];
			que.pop();
			if(this.getColorAtPos(node) === targetColor) {
				this.pixelArray[node[0]][node[1]] = fillColor;
				que.push([node[0]+1,node[1]]);
				que.push([node[0]-1,node[1]]);
				que.push([node[0],node[1]+1]);
				que.push([node[0],node[1]-1]);
			}
		}
		this.renderAll();
		return;
	}*/

	this.transparentBG=transparentBG;
	function transparentBG() {
		this.pushPixelsToHistoryArray();
		this.backgroundColor = -1;
		this.refreshBackground();
		this.renderAll();
	}

	this.refreshBackground=refreshBackground;
	function refreshBackground() {
		for(var i = 0; i < this.pixelArray.length; i++) {
			for(var j = 0; j < this.pixelArray[i].length; j++) {
				if( this.pixelArray[i][j] === "ffffff" ) this.pixelArray[i][j] = this.backgroundColor;
			}
		}
	}

	/*======================
	    STRAIGHT LINE TOOL
	  ======================*/
	this.lineToolCoords = [0,0,0,0];
	this.lineToolStage = -1;
	this.lineTool=lineTool;
	function lineTool() {
		switch(this.lineToolStage) {
			case 1: //user moused down at first postion
				this.lineToolCoords[0] = this.mouseGridPos[0];
				this.lineToolCoords[1] = this.mouseGridPos[1];
				this.lineToolStage = 2;
				break;
			case 2: //user is moving mouse to second position TODO CALL AT EACH GIRD PIXEL NOT EACH SCREEN PIXEL
				this.drawLine('tool',-1,this.lineToolCoords);  //clear old line (from tool canvas)
				this.lineToolCoords[2] = this.mouseGridPos[0];
				this.lineToolCoords[3] = this.mouseGridPos[1];
				this.drawLine('tool',this.penColor,this.lineToolCoords); //draw new line (on tool canvas)
				break;
			case 3: //user let go of mouse at second position
				this.lineToolCoords[2] = this.mouseGridPos[0];
				this.lineToolCoords[3] = this.mouseGridPos[1];
				this.drawLine('main',this.penColor,this.lineToolCoords); //draw FINAL line on main canvas
				this.lineToolStage = -1;
				break;
			default:
			  console.log("Error: straight line tool stage not recognised.");
		}
	}

	this.drawLine=drawLine;
	function drawLine(canvas,color,coords) {
		//canvas == 'tool' or 'main'
		var x0 = coords[0];
		var y0 = coords[1];
		var x1 = coords[2];
		var y1 = coords[3];
		var dx = Math.abs(x1-x0);
		var dy = Math.abs(y1-y0);
		var sx = x0 < x1 ? 1 : -1;
		var sy = y0 < y1 ? 1 : -1;
		var err = dx-dy;

		var ray = [];
		while(x0!=x1 || y0!=y1){
			if(canvas == 'tool') this.renderToolPixel([x0,y0],color);
			else if(canvas == 'main') this.drawPixel([x0,y0],color);
			var e2 = 2*err;
			if(e2>-dy){
				err = err - dy;
				x0 += sx;
			}
			if(e2<dx){
				err = err + dx;
				y0 += sy;
			}
		}
	}

	/*======================
	          UNDO
	  ======================*/
	this.pushPixelsToHistoryArray=pushPixelsToHistoryArray;
	function pushPixelsToHistoryArray() {
		this.historyArray.push( JSON.stringify(this.pixelArray) );
		if(this.historyArray.length > 50) this.historyArray.shift(); //max of 50 undo states so memory doesn't go through the roof
	}
	this.undo=undo;
	function undo() {
		// stop filling:
		this.cancelFill = true;
		if(this.historyArray.length >= 1) {
			this.pixelArray = JSON.parse(this.historyArray[ this.historyArray.length-1 ]);
			this.historyArray.pop();
			this.renderAll();
		}
	}


	/*======================
	      RESIZE CANVAS
	  ======================*/
		// EDIT: this code was for when we didn't have scrolling in the editor
	// this.resizeCanvas=resizeCanvas;
	// function resizeCanvas() {
	// 	//main:
	// 	this.canvas.width = $(this.canvas).width();
	// 	this.canvas.height = $(this.canvas).height();
	// 	//grid:
	// 	this.gridCanvas.width = $(this.gridCanvas).width();
	// 	this.gridCanvas.height = $(this.gridCanvas).height();
	// 	//tools:
	// 	this.toolCanvas.width = $(this.toolCanvas).width();
	// 	this.toolCanvas.height = $(this.toolCanvas).height();

	// 	this.cW = this.canvas.width;
	// 	this.cH = this.canvas.height;

	// 	this.renderAll();
	// 	this.renderGrid();
	// }
	// $(window).resize($.proxy(this.resizeCanvas,this));


	// this is so that when they move the mouse fast it draws a line between the mousemove event positions
	this.drawPenGapLine=drawPenGapLine;
	function drawPenGapLine(coords, color) {
		var x0 = coords[0];
		var y0 = coords[1];
		var x1 = coords[2];
		var y1 = coords[3];
		var dx = Math.abs(x1-x0);
		var dy = Math.abs(y1-y0);
		var sx = x0 < x1 ? 1 : -1;
		var sy = y0 < y1 ? 1 : -1;
		var err = dx-dy;

		while(x0!=x1 || y0!=y1){
			this.drawPixel([x0,y0],color);
			var e2 = 2*err;
			if(e2>-dy){
				err = err - dy;
				x0 += sx;
			}
			if(e2<dx){
				err = err + dx;
				y0 += sy;
			}
		}
	}


	/*======================
	          CURSOR
	  ======================*/

	this.lastMouseMovePenDrawPosition = null;

	let mouseMoveHandlerFunction = $.proxy(function(e){

		if(e.touches) e = e.touches[0];

		//Update position:
		var oldX = this.mouseGridPos[0];
		var oldY = this.mouseGridPos[1];
		var x = e.pageX - $(this.canvas).offset().left;
		var y = e.pageY - $(this.canvas).offset().top;
		this.mouseGridPos[0] = Math.floor(x/this.pixelSize);
		this.mouseGridPos[1] = Math.floor(y/this.pixelSize);

		//Re-render cursor:
		if(this.mouseGridPos[0] !== oldX || this.mouseGridPos[1] !== oldY) {
			//Fill in last one with pixelArray color and render cursor in new pos
			this.renderToolPixel([oldX,oldY],-1,true);
			this.renderTools();
			this.renderCursor();
		}

		//change cursor for 'move' during marquee
		if(this.currentTool == 'marquee') {
			if(	this.mouseGridPos[0] >= this.marqueeCoords[0] &&
				this.mouseGridPos[1] >= this.marqueeCoords[1] &&
				this.mouseGridPos[0] < this.marqueeCoords[2] &&
				this.mouseGridPos[1] < this.marqueeCoords[3] &&
				this.marqueeStage == 4 || this.marqueeStage == 6) {
				$('body').css('cursor','move');
			} else {
				$('body').css('cursor','auto');
			}
		} else if($('body').css('cursor') !== 'auto') $('body').css('cursor','auto');

		//Apply tool:
		if(this.mouseIsDown) {
			if(this.mouseGridPos[0] !== oldX || this.mouseGridPos[1] !== oldY) { //only if actual grid pos has changed
				switch(this.currentTool) {
					case 'pen':
						if(this.lastMouseMovePenDrawPosition) this.drawPenGapLine([...this.lastMouseMovePenDrawPosition, ...this.mouseGridPos], this.penColor);
						this.drawPixel(this.mouseGridPos, this.penColor);
						this.lastMouseMovePenDrawPosition = [...this.mouseGridPos];
						break;
					case 'eyedropper':
						this.penColor = this.getColorAtPos(this.mouseGridPos);
						$('#color-picker')[0].color.fromString(this.penColor)
						// $('#color-picker')[0].value = "#"+this.penColor;
						break;
					case 'eraser':
						this.erasePixel(this.mouseGridPos);
						break;
					case 'save':
						if(this.saveStage == 3) this.saveImage();
						break;
					case 'marquee':
						if(this.marqueeStage == 3) this.marqueeTool();
						if(this.marqueeStage == 6) this.marqueeTool(); //##
						break;
					case 'bucket':
						break;
					case 'line':
						this.lineTool();
						break;
					default:
					  console.log("Error: No tool selected.");
				}
			}
		}

	},this);

	let mouseDownHandlerFunction = $.proxy(function(e) {

		// e.which == 0 is for touch events
		// we need to do this because touch screens haven't been firing mouse-move event, so the mouse position is "old" (based on last touch)
		if(e.which == 0) {
			var x = e.touches[0].pageX - $(this.canvas).offset().left;
			var y = e.touches[0].pageY - $(this.canvas).offset().top;
			this.mouseGridPos[0] = Math.floor(x/this.pixelSize);
			this.mouseGridPos[1] = Math.floor(y/this.pixelSize);
		}

		if(e.which == 1 || e.which == 0) { 
			switch(this.currentTool) {
				case 'pen':
					this.lastMouseMovePenDrawPosition = [...this.mouseGridPos];
					this.pushPixelsToHistoryArray();
					this.drawPixel(this.mouseGridPos, this.penColor);
					break;
				case 'eyedropper':
					//todo: put these two lines onto 'change color' method
					this.penColor = this.getColorAtPos(this.mouseGridPos);
					$('#color-picker')[0].color.fromString(this.penColor);
					// $('#color-picker')[0].value = "#"+this.penColor;
					break;
				case 'eraser':
					this.pushPixelsToHistoryArray();
					this.erasePixel(this.mouseGridPos);
					break;
				case 'save':
					this.saveStage = 2;
					this.saveImage();
					break;
				case 'marquee':
					if(this.marqueeStage == 1) {this.marqueeStage = 2;this.marqueeTool();}
					else if(this.marqueeStage == 4) {this.marqueeStage = 5;this.marqueeTool();}//##i.e. they moused down after they have selected an area
					else if(this.marqueeStage == 5) {this.marqueeTool();}
					break;
				case 'bucket':
					this.pushPixelsToHistoryArray();
					try { this.bucketFill(this.mouseGridPos,this.getColorAtPos(this.mouseGridPos),this.penColor); } catch(e) { console.error("Problem during fill:", e); this.fillingInProgress = false; }
					break;
				case 'line':
					this.pushPixelsToHistoryArray();
					this.lineToolStage = 1;
					this.lineTool();
					break;
				default:
				  console.log("Error: No tool selected.");
			}

			this.mouseIsDown = true;
		} else if(e.which == 3) {
			//todo: put these two lines onto 'change color' method
			this.penColor = this.getColorAtPos(this.mouseGridPos);
			$('#color-picker')[0].color.fromString(this.penColor);
			// $('#color-picker')[0].value = "#"+this.penColor;
		}
	},this);

	let mouseUpHandlerFunction = $.proxy(function(e){

		this.lastMouseMovePenDrawPosition = null;

		this.mouseIsDown = false;

		if(this.currentTool == 'save') {
			if(this.saveStage == 3) {
				this.saveStage = 4;
				this.saveImage();
			}
		} else if(this.currentTool == 'marquee') {
			if(this.marqueeStage == 3) {this.marqueeStage = 4;this.marqueeTool();}
			if(this.marqueeStage == 6) {this.marqueeStage = 5;}//##
		} else if(this.currentTool == 'line') {
			if(this.lineToolStage == 2) { this.lineToolStage = 3; this.lineTool(); }
		} else if(this.currentTool == 'eyedropper') {
			if(this.prevTool == 'bucket') this.changeTool('bucket');
			else this.changeTool('pen');
		}
	},this);

	$('canvas').mousemove(mouseMoveHandlerFunction);
	document.querySelector("canvas.tools").addEventListener("touchmove", mouseMoveHandlerFunction);
	$('canvas').mousedown(mouseDownHandlerFunction);
	document.querySelector("canvas.tools").addEventListener("touchstart", mouseDownHandlerFunction);
	$('canvas').mouseup(mouseUpHandlerFunction);
	document.querySelector("canvas.tools").addEventListener("touchend", mouseUpHandlerFunction);

	$('canvas').mouseout($.proxy(function(e){
		//when the mouse leaves the screen, remove the cursor:
		this.renderPixel(this.mouseGridPos,this.pixelArray[this.mouseGridPos[0]][this.mouseGridPos[1]])
	},this));


	/*======================
	       OTHER EVENTS
	  ======================*/

	//INITIALISE
	$(document).ready($.proxy(
		function() {
			// this.resizeCanvas();
			this.renderAll();
			this.renderGrid();
		}
	,this));

	$('canvas').mousedown(function(e) {
		e.preventDefault();
	});

	//disable context menu
	//$('body').on('contextmenu', 'canvas', function(e){ return false; });

	//SHORTCUTS
	$(document).keypress(function(e){
		var c = String.fromCharCode(e.which).toLowerCase()
		switch (c) {
			case 'p':
				editor.changeTool('pen');
				break;
			case 'l':
				editor.changeTool('line');
				break;
			case 'f':
				editor.changeTool('bucket');
				break;
			case 'e':
				editor.changeTool('eraser');
				break;
			case 's':
				editor.changeTool('eyedropper');
				break;
			default:
				break;
		}
	});

	//Mouse leaves window
	$(window).mouseleave(function() {
		this.mouseIsDown = false;
	});

	/* CTRL+__ events */
	$(window).bind('keydown', $.proxy(function(event) {
		if (event.ctrlKey || event.metaKey) {
			switch (String.fromCharCode(event.which).toLowerCase()) {
			case 'z':
				event.preventDefault();
				this.undo();
				break;
			default:
				break;
			}
		}
	},this));

	//ENTER/DELETE PRESSED
	$(document).bind('keydown', $.proxy(function(e) {
		if(e.keyCode == 13){
			if(this.currentTool == 'marquee' && this.marqueeStage == 5) {
				this.marqueeStage = 8;
				this.marqueeTool();
			}
		}
		if(e.keyCode == 8 || e.keyCode == 46){
			if(this.currentTool == 'marquee' && this.marqueeStage == 4) {
				this.marqueeStage = 7;
				this.marqueeTool();
			}
		}
	},this));

	//Hide color picker (Edit: not needed with new browser-native color picker)
	$('canvas').mousedown(function() {
		$('#color-picker')[0].color.hidePicker()
		$('#color-picker').blur();
	});

	//Color change
	$('#color-picker').change($.proxy(function() {
		this.penColor = $('#color-picker').val();
		// this.penColor = $('#color-picker')[0].value.slice(1); // slice(1) to remove hash
		if(this.currentTool == 'eraser') this.changeTool('pen');
	},this));

	//Clear canvas:
	$('.menu-bar .clearcanvas-button').click($.proxy(function(){
		if(confirm('Warning: Are you sure you want to clear the all pixels?')) {
			this.clearAllPixels();
		}
	},this));

	//Toggle grid
	$('.menu-bar .grid-button').click($.proxy(function(){ this.toggleGrid(); },this))

	//Save:
	$('.menu-bar .save-button').click($.proxy(function(){
		if(confirm("First click 'okay' on this pop-up, then click and drag to save a section of the canvas.")) {
			this.saveStage = 1;
			this.saveImage();
		}
	},this));

	//Undo
	$('.menu-bar .undo-button').click($.proxy(function(){
		this.undo();
	},this));

	//Disable drag menu icon:
	$('img.icon').on('dragstart', function(event) { event.preventDefault(); });

	//Disable context menu on canvs:
	$('body').on('contextmenu', 'canvas', function(e){ return false; });

	this.toggleMenu=toggleMenu;
	function toggleMenu() {
		if( $('.menu-bar-outer').height() == 50 ) {
			$('.menu-bar-outer').css('height','auto');
			$('.menu-bar .menu-toggle-button .icon').attr('src','/img/icons/up-arrow-icon-white.png');
		} else {
			$('.menu-bar-outer').height(50);
			$('.menu-bar .menu-toggle-button .icon').attr('src','/img/icons/pam-icon-white.png');
		}
	}

	/*======================
	       Marquee tool
	  ======================*/
	this.marqueeOrigMouseGridPos;//when the user clicks the marquee to move it
	//this.marqueePos;//for when the user moves the marquee
	this.origMarqueeCoords;
	this.marqueeTool=marqueeTool;
	function marqueeTool() {
	console.log(this.marqueeStage)
		var origMouseGridPos;
		switch(this.marqueeStage) {
			case 1: //user just selected tool
				this.changeTool('marquee');
				this.marqueeStage = 2;
				break;
			case 2: //user moused down at first postion
				//this.renderTools();
				this.marqueeCoords[0] = this.mouseGridPos[0];
				this.marqueeCoords[1] = this.mouseGridPos[1];
				this.marqueeStage = 3;
				break;
			case 3: //user is moving mouse to second position
				this.marqueeCoords[2] = this.mouseGridPos[0];
				this.marqueeCoords[3] = this.mouseGridPos[1];
				this.renderTools();
				break;
			case 4: //user let go of mouse at second position
				this.marqueeCoords[2] = this.mouseGridPos[0];
				this.marqueeCoords[3] = this.mouseGridPos[1];

				//now we must get the top right corner as x1,y1 and bottom left: x2,y2:
				var tempCoords = this.marqueeCoords.slice(0);
				if(tempCoords[0] > tempCoords[2]) {this.marqueeCoords[0] = tempCoords[2]; this.marqueeCoords[2] = tempCoords[0];}
				if(tempCoords[1] > tempCoords[3]) {this.marqueeCoords[1] = tempCoords[3]; this.marqueeCoords[3] = tempCoords[1];}

				this.marqueePixelArray = this.getPixelsFromArray(this.marqueeCoords);
				this.renderTools();
				break;
			case 5: //user clicks somewhere (maybe not in marquee area)
				if(	this.mouseGridPos[0] >= this.marqueeCoords[0] &&
					this.mouseGridPos[1] >= this.marqueeCoords[1] &&
					this.mouseGridPos[0] < this.marqueeCoords[2] &&
					this.mouseGridPos[1] < this.marqueeCoords[3]) {
					this.marqueeOrigMouseGridPos = this.mouseGridPos.slice(0);
					this.origMarqueeCoords = this.marqueeCoords.slice(0);
					this.marqueeStage = 6;
				} else {
					this.marqueeStage = 8;
					this.marqueeTool();
				}
				break;
			case 6: //mouse moving after clicking area
				this.marqueeCoords[0] = this.origMarqueeCoords[0] + (this.mouseGridPos[0] - this.marqueeOrigMouseGridPos[0]);
				this.marqueeCoords[1] = this.origMarqueeCoords[1] + (this.mouseGridPos[1] - this.marqueeOrigMouseGridPos[1]);
				this.marqueeCoords[2] = this.origMarqueeCoords[2] + (this.mouseGridPos[0] - this.marqueeOrigMouseGridPos[0]);
				this.marqueeCoords[3] = this.origMarqueeCoords[3] + (this.mouseGridPos[1] - this.marqueeOrigMouseGridPos[1]);
				this.renderTools();
				break;
			case 7: //user presses del/backspace key after making selection
				this.pushPixelsToHistoryArray();
				for(var x = this.marqueeCoords[0]; x >= this.marqueeCoords[0] && x < this.marqueeCoords[2]; x++ ) {
					for(var y = this.marqueeCoords[1];  y >= this.marqueeCoords[1] && y < this.marqueeCoords[3]; y++ ) {
						if(	x < this.pixelArray.length && y < this.pixelArray[0].length &&
							x >= 0 && y >= 0)
							this.pixelArray[x][y] = this.backgroundColor;
					}
				}
				this.renderPixelArray();
				this.renderTools();
				this.marqueeStage = 1;
				break;
			case 8: //they pressed enter - so paste the pixels to the pixelArray
				this.pushPixelsToHistoryArray();
				for(var x = 0; x < this.marqueePixelArray.length; x++ ) {
					for(var y = 0; y < this.marqueePixelArray[0].length; y++ ) {
						if(	x+this.marqueeCoords[0] < this.pixelArray.length && y+this.marqueeCoords[1] < this.pixelArray[0].length &&
							x+this.marqueeCoords[0] >= 0 && y+this.marqueeCoords[1] >= 0)
							//if marquee pixel not transparent, then replace pixelarray color with marqueearray color:
							if(this.marqueePixelArray[x][y] !== this.backgroundColor) this.pixelArray[x+this.marqueeCoords[0]][y+this.marqueeCoords[1]] = this.marqueePixelArray[x][y];
					}
				}
				this.renderPixelArray();
				this.renderTools();
				this.marqueeStage = 1;
				break;
			default:
			  console.log("Error: Marquee tool stage not recognised.");
		}
	}



	/*======================
	       SAVE IMAGE
	  ======================*/
	function pixelArrayToV2Format(pixelArray) {
		let lastColorId = -1;
		let palette = {};
		for(let row of pixelArray) {
			for(let cell of row) {
				if(palette[cell] === undefined) {
					palette[cell] = ++lastColorId;
				}
			}
		}
	
		let rowStrings = [];
		for(let row of pixelArray) {
			let streaks = [];
			let currentStreakColor = row[0];
			let currentStreakLength = 1;
			for(let cell of row.slice(1)) {
				if(cell !== currentStreakColor) {
					streaks.push(`${palette[currentStreakColor]}*${currentStreakLength}`);
					currentStreakLength = 1;
					currentStreakColor= cell;
				} else {
					currentStreakLength++;
				}
			}
			streaks.push(`${palette[currentStreakColor]}*${currentStreakLength}`);
			rowStrings.push(streaks.join(","));
		}
	
		return {
			format:"v2",
			palette,
			rows:rowStrings,
		};
	}
	
	// data1 = editor.pixelArray;
	// data2 = pixelArrayToV2Format(data1);
	// console.log(LZString.compressToBase64(JSON.stringify(data1)).length);
	// console.log(LZString.compressToBase64(JSON.stringify(data2)).length);
	// data3 = v2FormatToPixelArray(data2);
	// data4 = pixelArrayToV2Format(data3);
	// console.log(LZString.compressToBase64(JSON.stringify(data3)).length);
	// console.log(LZString.compressToBase64(JSON.stringify(data4)).length);

	this.saveImage=saveImage;
	async function saveImage() {
		switch(this.saveStage) {
			case 1: //user just selected tool
				this.changeTool('save');
				this.saveStage = 2;
				break;
			case 2: //user moused down at first postion
				this.saveCoords[0] = this.mouseGridPos[0];
				this.saveCoords[1] = this.mouseGridPos[1];
				this.saveStage = 3;
				break;
			case 3: //user is moving mouse to second position
				this.saveCoords[2] = this.mouseGridPos[0];
				this.saveCoords[3] = this.mouseGridPos[1];
				this.renderTools();
				break;
			case 4: //user let go of mouse at second position
				this.saveCoords[2] = this.mouseGridPos[0];
				this.saveCoords[3] = this.mouseGridPos[1];

				//now we must get the top right corner as x1,y1 and bottom left: x2,y2:
				var tempCoords = this.saveCoords.slice(0);
				if(tempCoords[0] > tempCoords[2]) {this.saveCoords[0] = tempCoords[2]; this.saveCoords[2] = tempCoords[0];}
				if(tempCoords[1] > tempCoords[3]) {this.saveCoords[1] = tempCoords[3]; this.saveCoords[3] = tempCoords[1];}

				$('.save-window').show();
				this.renderTools();
				this.changeTool('pen');
				break;
			case 5: //user clicked the button in the save dialogue
				var saveCanvas = $('canvas.save')[0];
				var customPixelSize = $('#custom-pixel-size').val();
				customPixelSize = Math.round(customPixelSize);
				if(typeof customPixelSize === "undefined" || customPixelSize < 1) customPixelSize = 10;

				/*var originalPixelSize = this.pixelSize;
				this.pixelSize = customPixelSize;
				this.canvas.width = this.pixelArray.length*this.pixelSize;
				this.canvas.height = this.pixelArray[0].length*this.pixelSize;
				this.ctx.beginPath(); this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
				this.renderPixelArray();*/

				/*saveCanvas.width = Math.abs(this.saveCoords[2]-this.saveCoords[0])*customPixelSize;
				saveCanvas.height = Math.abs(this.saveCoords[3]-this.saveCoords[1])*customPixelSize;
				var originalWidth = Math.abs(this.saveCoords[2]-this.saveCoords[0])*this.pixelSize;
				var originalHeight = Math.abs(this.saveCoords[3]-this.saveCoords[1])*this.pixelSize;*/

				//check for ridiculous sized images (which wil overload server etc.)
				if(saveCanvas.width*saveCanvas.height > 100000000) { alert("Whoa, this image is a bit too big, please try decreasing the pixel size."); this.saveStage = 0; return false;}

				this.renderSaveCanvas(this.saveCoords, customPixelSize);

				//saveCanvas.getContext('2d').drawImage(this.canvas,this.saveCoords[0]*this.pixelSize,this.saveCoords[1]*this.pixelSize,originalWidth,originalHeight,0,0,saveCanvas.width,saveCanvas.height);

				var image = saveCanvas.toDataURL("image/png");

				// see server notes for why we send both of these:
				var pixel_array_v1 = LZString.compressToBase64(JSON.stringify(this.pixelArray)); //"data:text/plain;base64,"+
				var pixel_array = LZString.compressToBase64(JSON.stringify(pixelArrayToV2Format(this.pixelArray)));
				
				var title = $('#save-art-title').val();
				var description = $('#save-art-desc').val();
				if( $('#save-art-private').prop('checked') ) {var is_private = 1} else {var is_private = 0}
				var channel_name = $('#save-art-gallery-channel-name').val().trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "").trim() ||  "main";
				//parent_unique_name is in index.php
				var time_taken = this.time_elapsed;

				//local download link
				$('#data-url-save-link').attr('href',image);
				$('#data-url-save-link').attr('download',title.replace(/[^a-zA-Z0-9_\-]+/g,""));

				var password = "";
				var needsPass = await fetch(`/php/checkIfChannelNeedsPassword.php?channel_name=${channel_name}`).then(r => r.text());
				if(needsPass === "yes") {
					if(localStorage["channelPassword____"+channel_name]) {
						password = localStorage["channelPassword____"+channel_name];
					} else {
						password = prompt(`Posting to the '${channel_name}' channel requires a password. Please enter the password below. Your browser will remember the password for future saves to this channel, but you'll need to re-enter it if you clear your browser data or use a different computer.`);
					}
				}

				console.log(parent_unique_name);
				console.log("Saving image to server...");
				$.ajax({
				  type: "POST",
				  url: "/php/saveArt.php",
				  data: {password:password,image:image,pixel_array:pixel_array,pixel_array_v1:pixel_array_v1,title:title,description:description,is_private:is_private,parent_unique_name:parent_unique_name,time_taken:time_taken, channel_name:channel_name}
				}).done(function( unique_name ) {
					if(unique_name === "incorrect_password") {
						alert("Incorrect password :/");
						$('.save-window').hide();
						$('.save-window .details').show();
						$('.save-window .saved-output').hide();
						$('.save-window .loader').hide();
						this.saveStage = 0;
					} else if(!unique_name.trim() || unique_name.includes("_")) { // since error messages contain "_"
						alert("Server error! :|");
						$('.save-window .save-link')[0].href = "http://pixelartmaker.com/art/"+unique_name;
						$('.save-window .save-link').text("http://pixelartmaker.com/art/"+unique_name);
						$('.save-window .details').hide();
						$('.save-window .loader').hide();
						$('.save-window .saved-output').show();
					} else {
						console.log("Saved. Response: "+unique_name)
						$('.save-window .save-link')[0].href = "http://pixelartmaker.com/art/"+unique_name;
						$('.save-window .save-link').text("http://pixelartmaker.com/art/"+unique_name);
						$('.save-window .details').hide();
						$('.save-window .loader').hide();
						$('.save-window .saved-output').show();

						// check that it definitely saved, and if so, save their password:
						fetch("/art/"+unique_name).then(r => {
							if(r.ok) localStorage["channelPassword____"+channel_name] = password;
						}).catch(e => console.error(e));
					}
				});
				break;
			default:
			  console.log("Error: Save stage not recognised.");
		}
	}

	this.renderSaveCanvas=renderSaveCanvas;
	function renderSaveCanvas(saveCoords, pixel_size) {
		var saveCanvas = $('canvas.save')[0];
		saveCanvas.width = Math.abs(saveCoords[2]-saveCoords[0])*pixel_size;
		saveCanvas.height = Math.abs(saveCoords[3]-saveCoords[1])*pixel_size;
		var saveCtx = saveCanvas.getContext('2d');

		for(var i = saveCoords[0]; i < saveCoords[2]; i++) {
			for(var j = saveCoords[1]; j < saveCoords[3]; j++) {
					var color = this.pixelArray[i][j];
					var save_x = i-saveCoords[0];
					var save_y = j-saveCoords[1];
					if(color == this.backgroundColor) {//background color is transparent
						saveCtx.clearRect(save_x*pixel_size,save_y*pixel_size,pixel_size,pixel_size);
					} else if(color !== -1) {
						saveCtx.fillStyle = "#"+color;
						saveCtx.fillRect(save_x*pixel_size,save_y*pixel_size,pixel_size,pixel_size);
					} else {
						console.log("Error in renderSaveCanvas 1")
					}
			}
		}
	}

	//SAVE WINDOW:
	$('#save-art-close-button, .save-art-window-shadow').click($.proxy(function(){
		$('.save-window').hide();
		$('.save-window .details').show();
		$('.save-window .saved-output').hide();
		this.saveStage = 0;
	},this));
	$('#save-art-submit-button').click($.proxy(function(){
		this.saveStage = 5;
		this.saveImage();
		$('.save-window .details').hide();
		$('.save-window .loader').show();
	},this));





	/* ===================================================
						SAVE AND LOAD
	====================================================== */
	window.localForageInstance = localforage.createInstance({
		name: "pam1",
	});


	this.saveToLocalStorage=saveToLocalStorage;
	async function saveToLocalStorage() {
		// localStorage["pixelArray"] = JSON.stringify(this.pixelArray);
		console.log("before:", localStorage["pixelArray"])
		await localForageInstance.setItem("pixelArray", this.pixelArray);
		console.log("after:", localStorage["pixelArray"]);
	}
	this.loadFromLocalStorage=loadFromLocalStorage;
	async function loadFromLocalStorage() {
		// this.pixelArray = JSON.parse(localStorage["pixelArray"]);
		this.pixelArray = await localForageInstance.getItem("pixelArray");
		this.renderAll();
	}
	//Save every N seconds
	document.addEventListener("DOMContentLoaded", async () => {
		/*var saveTimeout;
		$(this.canvas).mouseup(function(e){
			clearTimeout(saveTimeout);
			saveTimeout = setTimeout(function() {
				this.saveToLocalStorage();
			},1000*5);
		});*/
		setInterval(() => {
			if(document.hasFocus()) this.saveToLocalStorage(); // need focus because otherwise other tabs that they have open could overwrite it
		},1000*10); //save every N seconds

		// load localstorage into localforage (only temporarily needed to transition people over - can delete this code after a month or two)
		if(localStorage["pixelArray"] && localStorage["pixelArray"] !== "" && typeof localStorage["pixelArray"] !== 'undefined' && localStorage["pixelArray"] !== "undefined") {
			await localForageInstance.setItem("pixelArray", JSON.parse(localStorage["pixelArray"]));
			localStorage["pixelArray"] = "";
		}

		// initial load:
		if(await localForageInstance.getItem("pixelArray")) {
		  if(!this.loading_offshoot) {
				this.loadFromLocalStorage();
			} else {
				//(warning to user about overwiriting their localstorage is on index.php where the offshoot pixels get loaded in)
			}
		}
	});
}


var editor = new Editor(
		$('canvas.main')[0],
		$('canvas.grid')[0],
		$('canvas.tools')[0]
	);

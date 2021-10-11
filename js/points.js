var pointsNumber = 5;           // Number of starting points
var iterationsPerFrame = 500;   // Something like an animation speed
var pointsOpacity = 128;         // Drawn points opacity 0-255
var gridCellSize = 0;          // Grid cell size in pixels, 0 to disable grid
var snapToGrid = false;          // Corners snap to grid when dragging

var cornerPoints;
var drawnPoint;
var randomPoint;
var selectedPoint;
var isMouseDragged;

function setup() {
    var canvas = createCanvas(800, 600);
    canvas.parent('sketch-holder')
    background(255);
    drawGrid();
    cornerPoints = new Array(pointsNumber);
    for (var i = 0; i < cornerPoints.length; i++) {
        cornerPoints[i] = createVector();
        cornerPoints[i].x = randomInt(0, width);
        cornerPoints[i].y = randomInt(0, height);
    }
    var startPoint = cornerPoints[0];
    drawnPoint = createVector();
    drawnPoint.x = startPoint.x;
    drawnPoint.y = startPoint.y;
}

function draw() {
    if(isMouseDragged){
        return;
    }
    drawCorners();
    stroke(0, pointsOpacity);
    strokeWeight(1);
    for (var i = 0; i < iterationsPerFrame; i++) { 
        randomPoint = cornerPoints[randomInt(0, pointsNumber)];
        drawnPoint.x = (drawnPoint.x + randomPoint.x)/2;
        drawnPoint.y = (drawnPoint.y + randomPoint.y)/2;
        point(drawnPoint.x, drawnPoint.y);
    }
}

function drawGrid(){
    if (gridCellSize == 0){
        return;
    }
    stroke("#DFDFDF");
    noFill();

    for (var x = 0; x <= width; x += gridCellSize) {
        line(x, 0, x, height);
    }
    for (var y = 0; y <= height; y += gridCellSize) {
        line(0, y, width, y);
    }
}

function drawCorners(){
    noStroke();
    fill(200, 0, 0);
    for (var i = 0; i < cornerPoints.length; i++) {
        ellipse(cornerPoints[i].x, cornerPoints[i].y, 5, 5);
    }
}

function isMouseOnPoint(point){
    if(gridCellSize == 0){
        if (mouseX <= point.x + 10 && mouseX >= point.x - 10) {
            if (mouseY <= point.y + 10 && mouseY >= point.y - 10) {
                return true;
            }
        }
    }
    else{
        if (mouseX <= point.x + gridCellSize/2 && mouseX >= point.x - gridCellSize/2) {
            if (mouseY <= point.y + gridCellSize/2 && mouseY >= point.y - gridCellSize/2) {
                return true;
            }
        }
    }
    return false;
}

function mousePressed() {
    for (var i = 0; i < cornerPoints.length; i++) {
        selectedPoint = cornerPoints[i];
        if(isMouseOnPoint(cornerPoints[i])) {
            return;
        }
        else{
            selectedPoint = null;
        }
    }
}

var prevX, prevY;

function mouseReleased(){
    isMouseDragged = false;
}

function mouseDragged() {
    if(selectedPoint == null){
        return;
    }
    if(snapToGrid){
        prevX = selectedPoint.x;
        prevY = selectedPoint.y;
        selectedPoint.x = (mouseX + gridCellSize/2) - ((mouseX + gridCellSize/2) % gridCellSize);
        selectedPoint.y = (mouseY + gridCellSize/2) - ((mouseY + gridCellSize/2) % gridCellSize);
        if(selectedPoint.x != prevX || selectedPoint.y != prevY){
            background(255);
            drawGrid();
            drawCorners();
        }
        isMouseDragged = true;
    }
    else {
        selectedPoint.x = mouseX;
        selectedPoint.y = mouseY;    
        background(255);
        drawGrid();
        drawCorners();
        isMouseDragged = true;
    }
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
  
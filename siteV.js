/*======= My canvas setup =========*/    
var canvas = document.querySelector("canvas");
    try {
      gl = canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
    } catch(e) {
    }
    if (gl == null) {
      this.log("Could not initialise WebGL, sorry :-( ");
    } 
     
var gl = canvas.getContext('webgl'); 
const p = document.querySelector("p");
// props
 var attributes = {};
 var gl_Position;
 var coord; 
 let program;
 let buffer;
 let initLineBuffer;
 let origin = 0;
 var vertex_buffer;
 var vertShader;
 var fragShader;
 var shaderProgram;
 var lineWidth = 1.0;
 var lastC;
 var vali = 1;
 var x = 1;
 var y = 1;
 var zm = 0;
 let x2 = 0 
 let y2 = 0;  
 const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;  

 /*== == Defining and storing the geometry == ==*/
 // Create an empty buffer object
 vertex_buffer = gl.createBuffer();

// initial position 
  initLineBuffer = [0, 0, 0, 0];
// Vertex shader source code
var vertCode =
   'attribute vec3 coordinates;' + 
   'void main(void) {' +  
      'gl_Position = vec4(coordinates, 7.2) ;' +
   '}';
// Fragment shader source code
var fragCode =
   'void main(void) {' +
      'gl_FragColor = vec4(0.0, 4.0, 4.0, 0.1);' +
   '}';

function log(s) {
   p.innerHTML = s;
}   
// functions 
function glBufferProps(vertex_buffer, shaderProgram) {
   /*= = Associating shaders to buffer objects = =*/ 

   // Bind vertex buffer object
   gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

   // Get the attribute location
   coord = gl.getAttribLocation(shaderProgram, "coordinates");
   
   // Point an attribute to the currently bound VBO
   gl.vertexAttribPointer(coord, 2, gl.FLOAT, true, 0, 0); // 2, 3

   // Enable the attribute
   gl.enableVertexAttribArray(coord); 
}

function glDraw() {
    /*=== = Drawing the lines == ==*/   
   gl.clearColor(0.0, 0.5, 0.5, 0.9);

   gl.lineWidth(lineWidth);
   // Enable the depth test
   gl.enable(gl.DEPTH_TEST);

   // Clear the color and depth buffer
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

   // Set the view port
   gl.viewport(-690, -140, gl.canvas.width + 520, gl.canvas.height);
   // Draw the Lines
   gl.drawArrays(gl.LINES, 0, 120); 

}

function bufferSetup(data, vertB){
   // Bind appropriate array buffer to it
   gl.bindBuffer(gl.ARRAY_BUFFER, vertB);

   // Pass the vertex data to the buffer
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

   // Unbind the buffer
   gl.bindBuffer(gl.ARRAY_BUFFER, null);
}
 
function initShaders(vertCode, fragCode, vertShader, fragShader) {
      // Create a vertex shader object
   vertShader = gl.createShader(gl.VERTEX_SHADER);

   // Attach vertex shader source code
   gl.shaderSource(vertShader, vertCode);

   // Compile the vertex shader
   gl.compileShader(vertShader); 

   // Create fragment shader object
   fragShader = gl.createShader(gl.FRAGMENT_SHADER);

   // Attach fragment shader source code
   gl.shaderSource(fragShader, fragCode);

   // Compile the fragmentt shader
   gl.compileShader(fragShader);

   // Create a shader program object to store
   // the combined shader program
   shaderProgram = gl.createProgram();

   // Attach a vertex shader
   gl.attachShader(shaderProgram, vertShader);

   // Attach a fragment shader
   gl.attachShader(shaderProgram, fragShader);

   // Link both the programs
   gl.linkProgram(shaderProgram);

   // Use the combined shader program object
   gl.useProgram(shaderProgram);
}

function Start(){ 
   // function calls 
   initShaders(vertCode, fragCode, vertShader, fragShader);  
   bufferSetup(initLineBuffer, vertex_buffer);  
   glBufferProps(vertex_buffer, shaderProgram); 
   glDraw();
}

// cake dressings
const br = document.createElement("br");
const xStr = document.createElement("p");
const yStr = document.createElement("p");
const xStr2 = document.createElement("p");
const yStr2 = document.createElement("p");
const drawButton = document.createElement("button"); 
const clearButton = document.createElement("button");
// warning
const desDecimals = document.createElement("p");
const widthSelector = document.createElement("input");
widthSelector.id = 'lineWidthSet'; 
const widthFace = document.createElement("h4");
const titlePlane = document.createElement("h3");
const root = document.getElementById("root");
drawButton.id = 'lineGen';
drawButton.innerHTML = "Generate Line ";
widthFace.innerHTML = "Line Width"; 
clearButton.innerHTML = "clear";
clearButton.id = "clearb"; 

// xy input addon

const xSelector = document.createElement("input");
xSelector.id = 'xSet';

const ySelector = document.createElement("input");
ySelector.id = 'ySet';

const xSelector2 = document.createElement("input");
xSelector2.id = 'xSet2';

const ySelector2 = document.createElement("input");
ySelector2.id = 'ySet2';

desDecimals.textContent = `Try using '-.##' decimal numbers before using '##.##' decimals or whole numbers. It helps keep it in the canvas.`;
xStr.textContent= 'x';
xStr2.textContent= 'x';
yStr.textContent= 'y'; 
yStr2.textContent = 'y';

// lookup event listners 
xSelector2.addEventListener("input", function (){
   x2 = xSelector2.value; 
});
ySelector2.addEventListener("input", function (){ 
   y2 = ySelector2.value;  
});
widthSelector.addEventListener("input", function (){
   vali = widthSelector.value;
}); 
 
// ev listeners
// button call
drawButton.addEventListener("click", function(){  
   
   lineWidth = vali;  
   let lasto = origin;
   origin += lasto;
   var objA = [x, y, x2, y2];
   initLineBuffer = initLineBuffer.concat(objA);
   x = x2;
   y = y2;
   // at the end you have to start or this wont work
   Start();
});
 
// site structure
root.appendChild(titlePlane);
titlePlane.appendChild(widthFace)
titlePlane.appendChild(br); 
titlePlane.appendChild(drawButton); 
widthFace.appendChild(br);
widthFace.appendChild(widthSelector); 
widthFace.appendChild(br); 
widthFace.appendChild(xStr2);
widthFace.appendChild(xSelector2);
widthFace.appendChild(br); 
widthFace.appendChild(yStr2);
widthFace.appendChild(ySelector2);

Start();
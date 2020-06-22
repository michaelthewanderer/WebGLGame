
var vertexShaderText = [
    'precision mediump float;',
    '',
    'attribute vec3 vertPosition;',
    'attribute vec3 vertColor;',
    'varying vec3 fragColor;',
    'uniform mat4 mWorld;',
    'uniform mat4 mView;',
    'uniform mat4 mProj;',
    '',
    'void main()',
    '{',
    'fragColor = vertColor;',
    'gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
    '}'
].join('\n');

var fragmentShaderText = [
    'precision mediump float;',
    'varying vec3 fragColor;',
    "",
    'void main()',
    '{',
    'gl_FragColor = vec4(fragColor, 1.0);',
    '}'
].join('\n');


//var glMatrix = require("gl-matrix.js");


window.addEventListener("DOMContentLoaded", event=>{

    let canvas = document.getElementById("game-surface");
    let gl = canvas.getContext("webgl");

    if (!gl){
        window.alert("Web GL not supported, falling back on experimental");
        gl = canvas.getContext("experimenttal-webgl");
    }

    if (!gl){
        alert("Your browser does not support WebGL")
    }

   // canvas.width = window.innerHeight;
   // canvas.height = window.innerHeight;

   // gl.viewport(0,0,window.innerWidth, window.innerHeight);
   let bgCol = {"r":0.3, "g":0.0, "b":0.85, "a":0.5};
   gl.clearColor(bgCol.r, bgCol.g, bgCol.b, bgCol.a);
   gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
   gl.enable(gl.DEPTH_TEST)
   gl.enable(gl.CULL_FACE)
   gl.frontFace(gl.CCW);
   gl.cullFace(gl.BACK);
;
   let vertShader = gl.createShader(gl.VERTEX_SHADER);
   let fragShader = gl.createShader(gl.FRAGMENT_SHADER);

   gl.shaderSource(vertShader, vertexShaderText);
   gl.shaderSource(fragShader, fragmentShaderText);

   gl.compileShader(vertShader);
   if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)){
       console.error("Error compiling vertex shader!", gl.getShaderInfoLog(vertShader));
       return;
   }
   gl.compileShader(fragShader);
   if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)){
    console.error("Error compiling fragment shader!", gl.getShaderInfoLog(fragShader));
    return;
    }

    let program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);

    gl.linkProgram(program);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
        console.error("ERROR linking program!", gl.getProgramInfoLog(program));
        return;
    }
    gl.validateProgram(program);
    if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
        console.error("ERROR validating program!", gl.getProgramInfoLog(program));
        return;
    }

    let box = new Cube([3,0,0], 1);

    
    
    let boxVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
    //TODO change static draw to dynamic draw
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array (box.vertices), gl.STATIC_DRAW);

    let boxIndexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(box.indices), gl.STATIC_DRAW);

    let positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    let colorAttribLocation = gl.getAttribLocation(program, "vertColor");

    gl.vertexAttribPointer(
        positionAttribLocation,
        3, //Num of elements per attribute, update
        gl.FLOAT,
        gl.FALSE,
        6*Float32Array.BYTES_PER_ELEMENT,
        0
    )

    gl.vertexAttribPointer(
        colorAttribLocation,
        3, //Num of elements per attribute, update
        gl.FLOAT,
        gl.FALSE,
        6*Float32Array.BYTES_PER_ELEMENT,
        3*Float32Array.BYTES_PER_ELEMENT,
    )

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    gl.useProgram(program);

    let matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    let matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    let matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

    let worldMatrix = new Float32Array(16);
    let viewMatrix = new Float32Array(16);
    let projMatrix = new Float32Array(16);
    
    glMatrix.mat4.identity(worldMatrix);
    glMatrix.mat4.lookAt(viewMatrix, [0,0,-10], [0,0,0],[0,1,0]);
    glMatrix.mat4.perspective(projMatrix, glMatrix.glMatrix.toRadian(45), canvas.width/canvas.height, 0.1, 1000.0);
    
    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);


/*
    while(true){
        updateWorld();

    }
    */
    let angle = 0;
    let identityMatrix = new Float32Array(16);
    glMatrix.mat4.identity(identityMatrix);

    let translationMatrix = new Float32Array(16);
    let xRotationMatrix = new Float32Array(16);
    let yRotationMatrix = new Float32Array(16);

    var loop = function(){
        
        angle = performance.now() / 1000 / 6 * 2 * Math.PI;
        glTranslatef(-box.x,-box.y,-box.z)
        glMatrix.mat4.rotate(xRotationMatrix, identityMatrix, angle, [0,1,0]);
        glMatrix.mat4.rotate(yRotationMatrix, identityMatrix, angle, [1,0,0]);
        glMatrix.mat4.mul(worldMatrix, xRotationMatrix, yRotationMatrix);
        //let translation = gl.getUniformLocation(program, 'translation');
        //gl.uniform4f(translation, -box.x, box.y, box.z, 0.0);

        //gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

        gl.clearColor(bgCol.r, bgCol.g, bgCol.b, bgCol.a);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, box.indices.length,  gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame(loop);

    };

    requestAnimationFrame(loop);
    //numVerts
    

});
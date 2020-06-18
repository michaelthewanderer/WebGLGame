var vertexShaderText = [
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    '',
    'void main()',
    '{',
    'gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'
].join('\n');

var fragmentShaderText = [
    'precision mediump float;',
    "",
    'void main()',
    '{',
    'gl_FragColor = vec4(1.0,0.0,0.0, 1.0);',
    '}'
].join('\n');

window.addEventListener("DOMContentLoaded", event=>{

    let canvas = document.getElementById("game-surface");
    let gl = canvas.getContex("webgl");

    if (!gl){
        window.alert("Web GL not supported, falling back on experimental");
        gl = canvas.getConttext("experimenttal-webgl");
    }

    if (!gl){
        alert("Your browser does not support WebGL")
    }

    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;

   // gl.viewport(0,0,window.innerWidth, window.innerHeight);
   gl.clearColor(0.0, 0.0, 0.75, 1.0);
   gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

   let vertShader = gl.createShader(gl.VERTETX_SHADER);
   let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    

});
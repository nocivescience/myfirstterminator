const container = document.getElementById('endo');
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const scanvas = document.getElementById('c2');
const sctx = scanvas.getContext('2d');
let initialised = false;
let xdone = false;
let ydone = false;
let done = [false, false, false, false];
const grid = { x: [], y: [] };
const gsize = 50;
const animatables= [];
const elements = ['#first', '#second', '#third', '#fourth'];
const targets = [];
const audio = new Audio('./audio.mp3');
audio.onload = init;
audio.volume = 0.5;
// audio.crossOrigin = 'anonymous';
// const stats = new Stats();
window.addEventListener('resize', resize, false);
document.addEventListener('DOMContentLoaded', init, false);
resize();
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    scanvas.width = window.innerWidth;
    scanvas.height = window.innerHeight;
    getGrid();
}
function init() {
    getGrid();
    // stats.showPanel( 0 );
    // stats.domElement.style.zIndex = 10000;
    // stats.domElement.style.left = 0;
    // stats.domElement.style.top = 0;
    // stats.domElement.style.position = 'fixed';
    // document.body.appendChild( stats.domElement );
    container.classList.add('active');
    for (let i = 0; i < elements.length; i++) {
        const id = elements[i];
        targets[i] = [
            `${id} path, ${id} circle, ${id} line, ${id} polyline, ${id} ellipse`
        ];
    }
    for (let i = 0; i < targets.length; i++) {
        const delay = 200;
        animatables[i] = anime({
            targets: targets[i],
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 300,
            delay: delay+(i*delay),	
            autoplay: false,
            complete: function(anim) {
                done[i] = true;
            }
        });
    }
    var app = document.getElementById('text');
    var app2 = document.getElementById('text2');
    var typewriter = new Typewriter(app, {
        delay: 10,
    });
    typewriter.typeString('ChatGPT4 CYBERDYNE SYSTEMS').start();
    var typewriter2 = new Typewriter(app2, {
        delay: 10,
        loop: true,
    })
    typewriter2.typeString('Series 800: I will go for your throat')
        .pauseFor(2500)
        start();
}
resize();
render();
setTimeout(()=>{
    for(const animatable of animatables){
        animatable.play()
    }
},600)
function getGrid(){
    const x= Math.ceil(canvas.width/gsize);
    const y= Math.ceil(canvas.height/gsize);
    for(let i=0; i<x; i++){
        grid.x[i]={
            x: -1 + (gsize*i),
            y: 0,
            h: initialised? window.innerHeight:0, inc:y
        }
    }
    for(let i=0; i<y; i++){
        grid.y[i]={
            x:0,
            y: -1+(gsize*i),
            w: initialised? window.innerWidth:0, inc:x
        }
    }
}
function renderGrid(){
    sctx.strokeStyle='rgba(225,255,255,.4';
    sctx.lineWidth=2;
    sctx.beginPath()
    sctx.clearRect(0,0,scanvas.width, scanvas.height);
    if(!initialised){
        for (let i=0; i<grid.x.length; i++){
            const line= grid.x[i];
            if(line.h<canvas.height){
                line.h+=line.inc
            }else{
                xdone=true
            }
            sctx.moveTo(line.x, line.y);
            sctx.lineTo(line.x, line.h);
        }
        for (let i=0; i<grid.y.length; i++){
            const line= grid.y[i];
            if(line.w<canvas.width){
                line.w+=line.inc
            }else{
                ydone=true
            }
            sctx.moveTo(line.x, line.y);
            sctx.lineTo(line.w, line.y);
        }
    }else{
        for (let i=0; i<grid.x.length; i++){
            const line= grid.x[i];
            sctx.moveTo(line.x, line.y);
            sctx.lineTo(line.x, line.h);
        }
        for (let i=0; i<grid.y.length; i++){
            const line= grid.y[i];
            sctx.moveTo(line.x, line.y);
            sctx.lineTo(line.w, line.y);
        }
    }
    sctx.stroke();
    if(xdone && ydone){
        initialised=true
    }
}
function render(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    sctx.clearRect(0,0,scanvas.width, scanvas.height);
    renderGrid();
    requestAnimationFrame(render);
}
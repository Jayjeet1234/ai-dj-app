song="";
rightwristx=0;
rightwristy=0;
leftwristx=0;
leftwristy=0;
scorerightwrist=0;
scoreleftwrist=0;
function preload(){
song=loadSound("music.mp3");
}
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
x=ml5.poseNet(video,modelloaded);
x.on('pose',gotpoases);
}
function modelloaded(){
console.log("posenet is loaded");
}
function gotpoases(result){
if(result.length>0){
console.log(result);
rightwristx=result[0].pose.rightWrist.x;
rightwristy=result[0].pose.rightWrist.y;
leftwristx=result[0].pose.leftWrist.x;
leftwristy=result[0].pose.leftWrist.y;
scoreleftwrist=result[0].pose.keypoints[9].score;
scorerightwrist=result[0].pose.keypoints[10].score;
console.log("rightwristx value is"+rightwristx+"rightwristy value is"+rightwristy);
console.log("leftwristx value is"+leftwristx+"leftwristy value is"+leftwristy);
console.log("scorerightwrist value is"+scorerightwrist+"scoreleftwrist value is"+scoreleftwrist);
}
}
function draw(){
image(video,0,0,600,500);
fill("red");
stroke("red");
if(scorerightwrist>0.2){
circle(rightwristx,rightwristy,20);
if(rightwristy>0 && rightwristy<=100){
document.getElementById("speed").innerHTML="speed = 0.5x";
song.rate(0.5);
}
else if(rightwristy>100 && rightwristy<=200){
    document.getElementById("speed").innerHTML="speed = 1x";
    song.rate(1);
}
else if(rightwristy>200 && rightwristy<=300){
    document.getElementById("speed").innerHTML="speed = 1.5x";
    song.rate(1.5);
}
else if(rightwristy>300 && rightwristy<=400){
    document.getElementById("speed").innerHTML="speed = 2x";
    song.rate(2);
}
else if(rightwristy>400){
    document.getElementById("speed").innerHTML="speed = 2.5x";
    song.rate(2.5);
}

}
if(scoreleftwrist>0.2){
circle(leftwristx,leftwristy,20);
w=Number(leftwristy);
removedecimal=floor(w);
volume=removedecimal/500;
song.setVolume(volume);
document.getElementById("volume").innerHTML="volume = "+volume;
}
}
function play(){
song.play();
song.rate(1); 
}
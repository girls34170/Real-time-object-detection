song="";
object=[];
status="";
function preload(){
    song=loadSound("rain_alarm.mp3");
}
function setup(){
    canvas=createCanvas(550,550);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML= "Status : Detecting Objects";
}
function modelloaded(){
    console.log("model has loaded");
    status=true;
}
function gotresults(error,results){
if(error){
    console.error(error);
}
console.log(results);
object=results;
}
function draw(){
    image(video,0,0,550,550);
if(status!=""){
    objectdetector.detect(video,gotresults);
for(i=0;i<object.length;i++){
    document.getElementById("status").innerHTML= "Status : Objects Detected";
    document.getElementById("number_of_objects").innerHTML= "Number of objects- "+object.length;
    fill(0,0,0);
    percent=floor(object[i].confidence*100);
    text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
    noFill();
    stroke(0,0,0);
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
}
}
}
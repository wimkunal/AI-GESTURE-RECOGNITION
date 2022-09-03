noseY = 0;
noseX = 0;
difference = 0;
LeftwristX = 0;
RightwristX = 0;
function setup() {
    video = createCapture(VIDEO);
    video.size(550,500);
    canvas = createCanvas(550,550);
    canvas.position(600,150);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('poseNet is initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX =" + noseX + "noseY =" + noseY);
        LeftwristX = results[0].pose.leftWrist.x;
        RightwristX = results[0].pose.rightWrist.x
        difference = floor(LeftwristX - RightwristX);
        console.log("LeftwristX =" +LeftwristX + "RightwristX =" + RightwristX + "difference =" + difference);
    }
}

function draw() {
    background('#FFFFFF');
    fill('#000080');
    stroke('#00FFFF');
    square(noseX,noseY,difference);
    document.getElementById("square_sides").innerHTML = "Height and width of the square will be = " + difference +"px";
}
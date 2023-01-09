mind=""
inside=""
right_x = 0;
right_y = 0;
left_x = 0;
left_y = 0;
score_leftWrist = 0;
score_rightWrist = 0;
status_m = "";
status_i = "";
function preload(){
   c = loadSound('inside.mp3');
  ls = loadSound('er.mp3');
}
function setup(){
    canvas = createCanvas(500 , 400);
    canvas.position(500 , 310);
    webcam = createCapture(VIDEO);
    webcam.hide();
    posenet = ml5.poseNet(webcam , modelLoaded);
    posenet.on('pose' , gotPoses);
}

function modelLoaded(){
    console.log("PoseNet Initialized!");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        right_x = results[0].pose.rightWrist.x;
        right_y = results[0].pose.rightWrist.y;
        left_x = results[0].pose.leftWrist.x;
        left_y = results[0].pose.leftWrist.y;
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.rightWrist.confidence;
        console.log("Score Right Wrist --> "+ score_rightWrist + " Score Left Wrist ", score_leftWrist);

    }
}
function draw(){
    image(webcam , 0 , 0 , 500 , 400);

    status_m = c.isPlaying();
    status_i = ls.isPlaying();
    
    fill('#42f5b9');
    stroke('#42f5b9');

    if(score_leftWrist > 0.02){

        circle(left_x , left_y , 20);

        if(status_m == false){
            ls.stop();
            c.play();
            document.getElementById("song_name").innerHTML = "Playing Life Inside";

        }

    } 

    if(score_rightWrist > 0.02){

        circle(right_x , right_y , 20);

        if(status_i == false){
            c.stop();
            ls.play();
            document.getElementById("song_name").innerHTML = "Playing In my mind";

        }

    } 

}
function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}


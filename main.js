song= "";
song2 = "";
rightWristY = 0;
scoreRightWrist =0;
scoreLeftWrist = 0;
rightWristX = 0;

leftWristX = 0;
leftWristY = 0;

song1_status = "";
song2_status = "";
function preload()
{
    song = loadSound("music.mp3" );
    song2 = loadSound("faded.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('poseNet is initialized');
} 

function draw()
{
    image(video, 0, 0, 600, 500);
    song1_status = song.isPlaying();
    song2_status = song2.isPlaying();
    fill('red');
    stroke("red");
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song1_status == false)
        {
            song.play();
            document.getElementById("song").innerHTML = "playing - HARRY POTTER THEME SONG"


        } 
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song.stop();
        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "playing - faded THEME SONG"

            
        } 
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log('results');
        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;

        leftWristY = results[0].pose.leftWrist.y;
        leftWristx = results[0].pose.leftWrist.x;
         scoreRightWrist = results[0].pose.keypoints[10].score;
         scoreLeftWrist = results[0].pose.keypoints[9].score;

        console.log("rightWristY = " + rightWristY);
    }
    
}
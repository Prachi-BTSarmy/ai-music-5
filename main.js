x_rightwrist = 0;
y_rightwrist = 0;
x_leftwrist = 0;
y_leftwrist = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song_harry_potter_theme = "";
song_peter_pan = "";
peter_pan_song = "";
harry_potter_theme_song= "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.position(650,250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function draw(){
    image(video,0,0,600,530);
    fill("#FFFF00");
    stroke("#FFFF00");

    song_peter_pan = peter_pan_song.isplaying();
    console.log("peter pan song =" + song_peter_pan);

    song_harry_potter_theme = harry_potter_theme_song.isplaying();
    console.log("harry potter theme song ="+song_harry_potter_theme);


    if(scoreLeftWrist > 0.2){
        circle(x_leftwrist , y_leftwrist , 20);
        harry_potter_theme_song.stop();

        if(song_peter_pan == false){
            peter_pan_song.play();
        }
        else{
            document.getElementById("song_id").innerHTML = "song name : peter pan song";
        }
    }
    if(scoreRightWrist > 0.2){
        circle(x_rightwrist , y_rightwrist , 20);
        peter_pan_song.stop();

        if(song_harry_potter_theme == false){
            harry_potter_theme_song.play();
        }
        else{
            document.getElementById("song-id").innerHTML = "song name : Harry potter theme song";
        }
    }
}

function preload(){
    peter_pan_song = loadSound("music2.mp3");
    harry_potter_theme_song = loadSound("music.mp3");
}

function modelLoaded(){
    console.log('pose net is initialized!')
}

function gotposes(results){
if(results.length > 0){
    console.log(results);

    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("leftWrist_score ="+ scoreLeftWrist);

    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("rightWrist_score" + scoreRightWrist);

    x_leftwrist = results[0].pose.leftwrist.x;
    y_leftwrist = results[0].pose.leftwrist.y;
    console.log("x_leftwrist =" + x_leftwrist + "y_leftwrist =" + y_leftwrist);

    x_rightwrist = results[0].pose.rightwrist.x;
    y_rightwrist = results[0].pose.rightwrist.y;
    console.log("x_rightwrist =" + x_rightwrist + "y_rightwrist =" + y_rightwrist);
}
}
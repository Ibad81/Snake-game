//Game Constants &Variables
let inputDir={x:0,y:0};
let foodSound=new Audio('./music/food.mp3');
let gameOverSound=new Audio('./music/gameover.mp3');
let moveSound=new Audio('./music/move.mp3');
let musicSound=new Audio('./music/music.mp3');
let score=0;
let speed=5;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
food={x:6,y:7};
 


//Game function

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    //how we decrese the fps
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    //if u bumb in your self

    for (let index = 1; index < snakeArr.length; index++) {
        if(snake[index].x===snake[0].x && snake[index].y===snake[0].y){
             return true;

        }
    }
    // if you  bump into the wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
    return false; 
}


function gameEngine(){
    //part1: Upating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over Press any key to play again");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
    }

    //If you have eaten the fool increament the score and regenerate the food

    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="Highscore :" + hiscoreval;
        }
        scoreBox.innerHTML= "Score"+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})  ;                  //add at the starting of the snake
        let a=2;
        let b=16;
        
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }


    // move the snake
    for (let index = snakeArr.length-2; index >= 0; index--) {
        // const element = array[index];
        snakeArr[index+1]={...snakeArr[index]};
        
    } 

    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;



    //part2:Display the food
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        // snakeElement.classList.add('snake');
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display the snake and food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

}


  






//main logic

let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="Highscore" + hiscore;
}
window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}// Start the game

    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            console.log("ArrowUp");
            break;

        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            console.log("ArrowDown");
            break;



        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            console.log("ArrowLeft");
            break;

        case "ArrowRight":
            inputDir.x=1;                           //inputDir=velocity
            inputDir.y=0;
        console.log("ArrowRight");
        break;
    }
})
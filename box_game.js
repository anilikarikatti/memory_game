
window.onload=function(){



    function getBox(box){
        return `<div  id=${box.id} class ="box ${box.color ? box.color : ""}"> </div>`  //``
    }

    level=1;
    const map1= new Map();
    map1.set(1,'grid2x2');
    map1.set(2,'grid3x3');
    map1.set(3,'grid4x4');



    function makebox(id){
        return {
            selected :false,
            id,
            setColor(color){
                this.color=color
            },
            select(){
                this.selected=true;
            }
        }
    }

    const boxes =[];

    function loadBoxes(numBoxes){
        for(let i=0;i<numBoxes;i++){
            boxes[i]=makebox(i);
        }
    }

    function draw(){
        let html="";
        for (let box of boxes) {
            
            html+=getBox(box)
        
        document.querySelector('.container').classList.add(map1.get(level));
       
}
        document.querySelector('.container').innerHTML=html;
      
    }
    

    function applyColor(){
        return Math.floor(Math.random()*10)%2;
    }
    
    function colorBoxes(){
        for (const box of boxes) {
            if(applyColor())
                box.setColor("red");
        }
        if(!colored()){
            colorBoxes();
        }
    }



    function colored(){

        for(let box of boxes){
            if(box.color){
                return true
            }

        }
        return false;
    }


    function toggleColor(duration){
        setTimeout(function(){
            let redBoxes = document.querySelectorAll(".red");

            for(let box of redBoxes){
                box.classList.remove("red");
            }
            setUpClicks()
        },duration);
        
    }

    


    function setUpClicks(){
        let count=0;
        let divs = document.querySelectorAll(".box");

        let redColoredBoxCount=0
        for(let b of boxes){
            if(b.color){
                redColoredBoxCount+=1;
            }
        }

       for(let box of divs){
           
          box.onclick = function(e){
            
            const index = e.target.id;
            const selectedBox=boxes[index];
            if(!selectedBox.selected){

                if(selectedBox.color){
                    e.target.classList.add(selectedBox.color);
                    count++;
                    
                }
                else{
                    alert("you loose the game");
                    start();
                }

                }
                selectedBox.select();
               
               

                if(count === redColoredBoxCount){
                    alert("you win the game");
                    level+=1;
                    if(time > 1000)
                        time-=1000;
                    
                    start();
                    console.log(level);
                }
                
        
          }
           
       }
    }

    let time = 3000;
    
    function start(){
        loadBoxes((level+1)**2)
        colorBoxes()
        draw();
        toggleColor(time);
        

        
    }
    start();

    console.log(boxes);

    


}
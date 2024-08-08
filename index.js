let boxes = document.querySelectorAll(".btn"); //accessing all the buttons or boxes
// console.log(boxes);
let resetBtn = document.querySelector("#reset-btn"); //accessing reset button
let newGameBtn = document.querySelector("#new-btn"); //accessing new game btn
let msgContainer = document.querySelector(".msg-container"); //accessing msg-container to show win or draw game
let msg = document.querySelector("#msg"); // accessing specific msg which we want to print
let gameContainer = document.querySelector(".container"); //accessing the game container in which all game is displayed 

let turnO = true; //player O , Player X 
let count = 0; //count to 9 btns clicks to track the draw game

const winPatterns = // All win patterns in the game . we stored them in a 2D array or array of arrays
    [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

const resetGame = () => { //reset game functionality
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const gameDraw = () => { //draw game functionality
    msg.innerText = "Game Was A Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

boxes.forEach((btn) => { //chunky hmny tmam btns ko boxes mai access kiya hai to wo ek collection ki form mai a gye hai sb kyunky sb btns/boxes ko same class di hai ! ab hum hr ek box ko access krna chhaty hai ek ek bar to is liye boxes ky sath forEach ka method lgaya hai ! jis sy ek ek kr ky hr box with btn class acces shu ga !
    btn.addEventListener("click", () => { //event listner "click" lgaya hai btn pr . ky jaisy hi click hu ! to arrow function ky ander jo function likha hai wo execute hu jaye !
        if (turnO) { //chunk hum ny upr O ko true set kiya hai . to agr O true hai to phr O print krwa do boc mai ! r o-player class add kr do ! taky O ka color green hu jaye !
            btn.innerText = "O";
            btn.classList.add("o-player");
            btn.classList.remove("x-player");
            turnO = false; // jaisy hi ye kam kro to turnO ko false kr do !
        }
        else {
            btn.innerText = "X"; // X print krwao 
            btn.classList.add("x-player"); //x-player class ko add kr do r pichli o-player class ko emove kr do !
            btn.classList.remove("o-player");
            turnO = true; //jiays hi ye kamhu to turnO ko dobara true kr do ! 
        }

        btn.disabled = true; // tmam buttons ky liye disable function ko true set kr do ! 
        count++; //jaisy hi click ho ! to hr click ky sath count ko increment krty jao ! 


        let isWinner = chkWinner(); //chkWinner function sy chk kro ky winner kon hai ! r phr jo value aaye usy isWinner ko pss kr do !

        if(count===9 && !isWinner) //agr to count == 9 hai r isWinner mai koi value nhi aaye ! to gameDraw ky function ko call kr do ! jis ky mutaqbiq game draw print hu jaye ga !
        {
            gameDraw();
        }
    });
});

const disableBoxes = () => { //tmam boxes ko diable krny ka function hai ! 
    for(let box of boxes) // for of loop sy tmam btns ko access kiya ja rha hai ! 
    {
        box.disabled = true;
    }
};

const enableBoxes = () => { //tmam boxes ko enable krny ka function ! ye functions aagy use hu gy ! 
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => { //winner ko show krwany ka function
    msg.innerText = `Congratulations , the winner is ${winner}`;
    msgContainer.classList.remove("hide"); //jaisy hi koi winner a jaye to msg container sy hide class ko remove kr dya jaye ga jis sy msg show hu jaye ga ! ky you are winner
    disableBoxes(); //r jab ye kam hu jaye to boxes ko disable kr do ! taky ek bar game khtem hny ky bdd bakiya bachy huy boxes ko koi dobara click kr ky change na kr paye 
}

const chkWinner = () => { //ye chkWinner ka function hai jo given winning patterns ky hisab sy chk kry ga ky kon winner hai ! 
    for (let patterns of winPatterns) { //chunky winPatterns ek double array hai ! to hum for of loop sy us ko access krty hai r ye loop ek ek kr ky us winPatterns ky hr index pr pri array ko patterns ko pss krta jaye ga r nichy function chalta jaye ga !
        // console.log(patterns[0], patterns[1], patterns[2]); ab chunky patterns bhi ek array hai ! to phli bar patterns mai winPatterns ki phli array aye gi ! to phli array ka 0 , 1 , 2 index print hu jaye ga ! r isi trha winPatterns ki baqi sb arrays ka ! 
        // console.log(boxes[patterns[0]].innerText, boxes[patterns[1]].innerText, boxes[patterns[2]].innerText);
        let pos1Val = boxes[patterns[0]].innerText ; //ab hmny chunky boxes/btns pr dekhna hai apny winPatterns ko ! to patterns mai jab for of loop sy phli array aayi winPatterns ki ! to phli array ky 0 index pr 0 para hai , 1 index pr 1 para hai r 2 index pr 2 para hai ! hum dekh skty hai winPatterns mai ja kr ! to phly patterns[0] pr 0 a jaye ga , patterns[1] pr 1 r patterns[2] pr 2 a jaye ga ! ab boxes chunky ek nodeList ki form mai print hua hai ! to boxes[patterns[0]] ka matlab hai boxes[0] . to boxes ky 0 index pr pri value chk hu gi ! phr boxes ky 1 index pr pri value r phr boxes ky 2 index pr pri value . 
        let pos2Val = boxes[patterns[1]].innerText ;
        let pos3Val = boxes[patterns[2]].innerText ;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") //agr to 1 index pr pri value , boxes ky 2 r 3 index pr pri value empty value na hui yaini empty na hhuy ! 
        {
            if(pos1Val == pos2Val && pos2Val == pos3Val) // to chk kro ky kya teeno pri pri value same hai ! 
            {
                showWinner(pos1Val); //agr to same hai ! to showWinner ky function ko call kr do r usy winner ki value pss kr do ! 
                return true;//  r foran sy return true kr do ! 
            }
        }
    }
    return false;//  agr aisa kch nhi hta condition ky hisab sy ! to return false kr do !
};

newGameBtn.addEventListener("click", resetGame); //newGame btn pr eventListner laga hai ! click ka ! r sath mai resetGame ka callback function pss kr dya gya hai ! 
resetBtn.addEventListener("click", resetGame); //resetBtn pr eventListner laga hai ! 
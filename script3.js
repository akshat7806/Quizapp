const QNA = [
    {
        question:"A segment of a track in a mass storage system",
        answers:[
                {text:"pixel",correct:false},
                {text:"Address",correct:false},
                {text:"sector",correct:true},
                {text:"Flip-flop",correct:false}
        ]
    },
    {
        question:"A numeric value used to identify a memory cell",
        answers: [
                {text:"Hexadecimal notation",correct:false},
                {text:"Boolean operation",correct:false},
                {text:"Bit",correct:false},
                {text:"Address",correct:true}
        ]
    },
    {
        question:"A means of encoding text in which each symbol is represented by 16 bits",
        answers: [
                {text:"ISO",correct:false},
                {text:"ASCII",correct:false},
                {text:"Unicode",correct:true},
                {text:"LZW",correct:false}
        ]
    },
    {
        question:"A digital circuit capable of holding a single digit",
        answers: [
                {text:"pixel",correct:false},
                {text:"Bit",correct:false},
                {text:"Key field",correct:false},
                {text:"Flip-flop",correct:true}
        ]
    },
]
const question = document.getElementById("question");
const answerParent = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
let currentQNAindex = 0;
let score = 0;

function start(){
    nextBtn.innerHTML = "Next";
    currentQNAindex = 0;
    score = 0;
    showData();
}
function showData(){
    resetState();
    const qna = QNA[currentQNAindex];
    question.innerHTML = qna.question + ".";

    qna.answers.forEach(ans=>{
        let btn = document.createElement("button");
        btn.innerHTML = ans.text;
        btn.classList.add("btn");
        answerParent.appendChild(btn);
        if(ans.correct){
            btn.dataset.istrue = ans.correct;
        }
        btn.addEventListener("click",checkAnwer);
    });
}
function resetState(){
     nextBtn.style.display = "none"
    while(answerParent.firstChild){
        answerParent.removeChild(answerParent.firstChild);
    }   
}
function checkAnwer(e){
    let answerButtons = e.target;
    let isCorrect = answerButtons.dataset.istrue;
    if(isCorrect){
        answerButtons.classList.add("correct");
        score++;
    }
    else{
        answerButtons.classList.add("incorrect");
    }
    Array.from(answerParent.children).forEach(button=>{
        if(button.dataset.istrue){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}
function showScore(){
    resetState();
    question.innerHTML = `Your scored ${score} out of → ${QNA.length}  `;
    nextBtn.innerHTML = "playAgain";
    nextBtn.style.display = "block"
}
function handleNextButton(){
    currentQNAindex++;
    if(currentQNAindex<QNA.length){
        showData();
    }
    else{
        showScore();
    }
}
nextBtn.addEventListener('click',()=>{
    if(currentQNAindex<QNA.length){
        handleNextButton();
    }
    else{
        start();
    }
});
start();
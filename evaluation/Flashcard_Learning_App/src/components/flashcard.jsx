import { useEffect, useState } from "react";

const flashcards = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    id: 2,
    question: "What is 5 + 7?",
    answer: "12",
  },
  {
    id: 3,
    question: "Who wrote 'To Kill a Mockingbird'?",
    answer: "Harper Lee",
  },
  {
    id: 4,
    question: "What is the chemical symbol for water?",
    answer: "H2O",
  },
  {
    id: 5,
    question: "What is the speed of light in a vacuum?",
    answer: "299,792,458 meters per second",
  }
];

const localStorageKeys = {
  CORRECT_ANSWERS: "flashcardCorrectAnswers", // Correct answers count
  INCORRECT_ANSWERS: "flashcardIncorrectAnswers", // Incorrect answers count
  UNATTEMPTED_CARDS: "unattemptedFlashcards", // Tracks skipped flashcards
  CURRENT_CARD_INDEX: "currentFlashcardIndex", // Keeps track of last studied flashcard
  TIMER: "studySessionTimer", // Stores remaining session time
};



function FlashcardsData(){
    const [index,setIndex]= useState(0)
    const [flip,setFlip] = useState(false)
    const [timerleft,setTimer]=useState(600)

    useEffect(()=>{
        if (timerleft<=0) return;
        const timer = setTimeout(()=>{
            setTimer((pre)=>pre - 1)
        },1000)

        return ()=>clearInterval(timer)
    },[timerleft])

    const timeFormate=(second)=>{
        const m = Math.floor(second/60).toString().padStart(2,"0")
        const s = (second%60).toString().padStart(2,"0")
        return `${m}:${s}`
    }

    const handleNext=()=>{
        setFlip(false)
        setIndex((pre)=>(pre+1)%flashcards.length)
    }

    const handlePrev=()=>{
        setFlip(false)
        setIndex((pre)=> pre===0 ? flashcards.length-1 : pre-1)
    }

    const currentCard = flashcards[index]
    return(
        <>
        <h1>flashCards Learning App</h1>
        <div>
            <div className="studyTime">
                <h1>study time left : {timeFormate(timerleft)}</h1>
            </div>
        <div className={`flashcard ${flip ? flip : ""}`} onClick={()=>setFlip(!flip)}>
       <div className="front"> Q. {currentCard.question}</div>
       <div className="back"> Ans. {currentCard.answer}</div>
        </div>
        <div className="button">
            <button onClick={handlePrev}>previous</button>
            <button onClick={handleNext}>Next</button>
        </div>
        <p>Card {index+1} of {flashcards.length}</p>


        </div>
        </>
    )
}
export default FlashcardsData
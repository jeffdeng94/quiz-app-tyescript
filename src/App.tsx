import React, { useState } from 'react'
import { fetchQuestions } from './API'
//components
import QuestionCard from './components/QuestionCard'
//types
import { QuestionState, Difficulty } from './API'
//style
import { GlobalStyle, Wrapper } from './App.style'

const TOTAL_QUESTIONS = 10

export type AnswerObj = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

function App() {
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)
    try {
      const newQuestions = await fetchQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY,
      )

      setQuestions(newQuestions)
      setScore(0)
      setUserAnswers([])
      setNumber(0)
      setIsError(false)
      setLoading(false)
    } catch (error) {
      setIsError(true)
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    //user answer
    const userAnswer = e.currentTarget.value
    //check user answer against correct answer
    const isCorrect = questions[number].correct_answer === userAnswer
    //score + 1
    if (isCorrect) setScore(prev => prev + 1)
    //save userAnswer into answerArray
    const userAnswerObj = {
      question: questions[number].question,
      answer: userAnswer,
      correct: isCorrect,
      correctAnswer: questions[number].correct_answer,
    }
    setUserAnswers(prev => [...prev, userAnswerObj])
  }

  const nextQuestion = () => {
    //move on to next question
    const nextQuestion = number + 1
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        )}

        {!gameOver && <p className='score'>Score: {score}</p>}
        {loading && <p>Loading Questions ...</p>}

        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 && (
            <button className='next' onClick={nextQuestion}>
              Next Question
            </button>
          )}

        {isError && (
          <p className='error'>
            Oops, looks like there is an error fetching questions
          </p>
        )}
      </Wrapper>
    </>
  )
}

export default App

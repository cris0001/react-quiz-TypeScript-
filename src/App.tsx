import React, { useState } from 'react'
import QuestionCard from './components/QuestionCard'
import { fetchQuestions, Difficulty, QuestionsState } from './API'
import { GlobalStyle } from './App.style'
import styled from 'styled-components'

const TOTAL_QUESTIONS = 10

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startQuiz = async () => {
    setLoading(true)
    setGameOver(false)
    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY)

    setQuestions(newQuestions)

    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value

      const correct = questions[number].correct_answer === answer

      if (correct) setScore((prev) => prev + 1)

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }

      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  return (
    <>
      <Wrapper>
        <GlobalStyle />
        <div className='app'>
          <h1>React quizz</h1>
          {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className='start' onClick={startQuiz}>
              Start
            </button>
          ) : null}

          {!gameOver ? <p className='score'>Score: {score}</p> : null}
          {loading ? <p>loading questions</p> : null}
          {!loading && !gameOver && (
            <QuestionCard
              questionNbr={number + 1}
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
          number !== TOTAL_QUESTIONS - 1 ? (
            <button className='next' onClick={nextQuestion}>
              Next question
            </button>
          ) : null}
        </div>
      </Wrapper>
    </>
  )
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: #fff;
  }
  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }
  p {
    color: white;
  }
  h1 {
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    font-weight: 400;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }
  .start,
  .next {
    cursor: pointer;

    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }
  .start {
    max-width: 200px;
  }
`

export default App

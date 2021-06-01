import React from 'react'
import { AnswerObject } from '../App'
import styled from 'styled-components'

type Props = {
  question: string
  answers: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerObject | undefined
  questionNbr: number
  totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNbr,
  totalQuestions,
}) => {
  return (
    <Wrapper>
      <div>
        <p className='number'>
          Question: {questionNbr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        {/* <p>{question}</p> */}
        <div>
          {answers.map((answer, index) => {
            return (
              <div key={index}>
                <button
                  className='question'
                  disabled={!!userAnswer}
                  value={answer}
                  onClick={callback}
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  max-width: 1100px;
  padding: 20px;
  text-align: center;
  p {
    font-size: 1rem;
  }

  .question {
    border-color: transparent;
    margin: 0.5em 0;
    width: 100%;
  }
  .question:hover {
    opacity: 0.5;
  }
`

export default QuestionCard

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import GitHubCorner from '../../components/GithubCorner';
import Widget from '../../components/Widget';
import Button from '../../components/Button';
import AlternativesForm from '../../components/AlternativesForm';
import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Resultado
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          { results.filter((result) => result).length }
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => {
            const resultId = `result__${index}`;
            return (
              <li key={resultId}>
                {`#${index + 1} Resultado: ${result === true ? 'Acertou' : 'Errou'} `}
              </li>
            );
          })}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, totalQuestions, questionIndex, onSubmit, addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const isCorrect = selectedAlternative === question.answer;
  const questionId = `question__${questionIndex}`;
  const hasAlteranativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativesForm onSubmit={(event) => {
          event.preventDefault();
          setIsQuestionSubmited(true);
          setTimeout(() => {
            addResult(isCorrect);
            onSubmit();
            setIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
          }, 3 * 1000);
        }}
        >
          {
            question.alternatives.map((alternative, index) => {
              const alternativeId = `alternative__${index}`;
              const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
              const isSelected = selectedAlternative === index;
              return (
                <Widget.Topic
                  as="label"
                  htmlFor={alternativeId}
                  key={alternativeId}
                  data-status={isQuestionSubmited && alternativeStatus}
                  data-selected={isSelected}
                >
                  <input name={questionId} id={alternativeId} type="radio" onChange={() => setSelectedAlternative(index)} />
                  {alternative}
                </Widget.Topic>
              );
            })
          }
          <Button type="submit" disabled={!hasAlteranativeSelected}>
            Confirmar
          </Button>

          {isQuestionSubmited && isCorrect && <p>Está correto</p>}
          {isQuestionSubmited && !isCorrect && <p>Está errado</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  Loading: 'Loading',
  Quiz: 'Quiz',
  Result: 'Result',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.Loading);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = externalQuestions.length;
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.Quiz);
    }, 1 * 1000);
  }, []);

  function addResult(result) {
    setResults([...results, result]);
  }

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.Result);
    }
  }

  return (
    <QuizBackground backgroundImage={externalBg}>
      <QuizContainer>
        <QuizLogo />
        {
          screenState === screenStates.Quiz && (
            <QuestionWidget
              question={question}
              totalQuestions={totalQuestions}
              questionIndex={questionIndex}
              onSubmit={handleSubmitQuiz}
              addResult={addResult}
            />
          )
        }
        { screenState === screenStates.Loading && <LoadingWidget /> }
        { screenState === screenStates.Result && <ResultWidget results={results} /> }
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/samuel-lf/TecnoQuiz" />
    </QuizBackground>
  );
}

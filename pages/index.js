import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import db from '../db.json';
import Footer from '../src/components/Footer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import GitHubCorner from '../src/components/GithubCorner';
import Widget from '../src/components/Widget';
import Input from '../src/components/Input';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  function defineName(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    router.push(`/quiz?name=${name}`);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Input
                onChange={(e) => defineName(e)}
                placeholder="Digite seu nome"
                name="nome_usuario"
                value={name}
              />
              <Widget.Button type="submit" disabled={name.length === 0}>
                Jogar como
                {' '}
                {name}
              </Widget.Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>Dê uma olhada em outros quizes incriveis que o pessoal da Imersão fez:</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/samuel-lf/TecnoQuiz" />
    </QuizBackground>
  );
}

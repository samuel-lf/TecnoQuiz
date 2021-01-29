import React, { useState } from 'react';
import { useRouter } from 'next/router';
import db from '../db.json';
import Footer from '../src/components/Footer';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import GitHubCorner from '../src/components/GithubCorner';
import Widget from '../src/components/Widget';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

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
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar como ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>Dê uma olhada em outros quizes incriveis que o pessoal da imersão fez:</p>
            <ul>
              {
                db.external.map((linxExternal, index) => {
                  const linkExternalId = `linkExternal__${index}`;
                  const [project, username] = linxExternal.replace(/\//g, '')
                    .replace('https:', '')
                    .replace('.vercel.app', '')
                    .split('.');
                  return (
                    <li key={linkExternalId}>
                      <Widget.Topic href={linxExternal}>
                        {`${project}/${username}`}
                      </Widget.Topic>
                    </li>
                  );
                })
              }
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/samuel-lf/TecnoQuiz" />
    </QuizBackground>
  );
}

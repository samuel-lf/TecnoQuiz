import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { route } from 'next/dist/next-server/server/router';
import db from '../db.json';
import Footer from '../src/components/Footer';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import GitHubCorner from '../src/components/GithubCorner';
import Widget from '../src/components/Widget';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState(router.query.name);

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Perguntas</h1>
          </Widget.Header>
          <Widget.Content>
            <h1>{name}</h1>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/samuel-lf/TecnoQuiz" />
    </QuizBackground>
  );
}

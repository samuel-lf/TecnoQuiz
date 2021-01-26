import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground'


export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
    </QuizBackground>
  )
}

import { MainLayout } from './layouts/MainLayout';
import { Hero } from './sections/Hero';
import { Metrics } from './sections/Metrics';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Education } from './sections/Education';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <MainLayout>
      <Hero />
      <Metrics />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </MainLayout>
  );
}

export default App;

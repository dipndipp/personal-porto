import { MainLayout } from './layouts/MainLayout';
import { Hero } from './sections/Hero';
import { Metrics } from './sections/Metrics';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Education } from './sections/Education';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { SmoothScroll } from './components/SmoothScroll';

function App() {
  return (
    <SmoothScroll>
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
    </SmoothScroll>
  );
}

export default App;

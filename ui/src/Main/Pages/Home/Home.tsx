import { Cards } from "./Cards/Cards";
import { CardContainer } from "./CardContainer/CardContainer";
import { ProjectSteps } from "./ProjectSteps/ProjectSteps";
import { Hero } from "./Hero/Hero";
import { Contact } from "./Contact/Contact";
import About from "./About/About";

const Home = () => {
  return (
    <>
      <Hero />

      <CardContainer>
        <Cards />
      </CardContainer>

      <ProjectSteps />

      <About />

      <Contact />
    </>
  );
};

export default Home;

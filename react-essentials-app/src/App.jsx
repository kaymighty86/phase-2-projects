import Header from "./components/header";
import CoreConceptsSection from "./components/CoreConceptsSection";
import ConceptsExamples from "./components/ConceptsExamples";

export default function App() {

  return (
    <>
      <Header />
      <main>
        <CoreConceptsSection />
        <ConceptsExamples />
      </main>
    </>
  )
}

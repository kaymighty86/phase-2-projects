import Style from "./ConceptsExamples.module.css";
import { useState } from "react";

import TabButton from "./UI/TabButton";
import Card from "./UI/Card";
import { EXAMPLES } from "../data-with-examples";

export default function ConceptsExamples(){
    const [currentConcept, setViewedConcept] = useState();

    return(
        <section className={Style.ConceptsExamples}>
            <h2>Examples</h2>
            <nav>
                {/* if the "currentConcept" state is not blank and its title is the same as the title of the concept a button represents, then the button/tab has been selected */}
                <TabButton selected={currentConcept && currentConcept.title == EXAMPLES.components.title? true : false} onClick={()=>setViewedConcept(EXAMPLES.components)}>{EXAMPLES.components.title}</TabButton>
                <TabButton selected={currentConcept && currentConcept.title == EXAMPLES.jsx.title? true : false} onClick={()=>setViewedConcept(EXAMPLES.jsx)}>{EXAMPLES.jsx.title}</TabButton>
                <TabButton selected={currentConcept && currentConcept.title == EXAMPLES.props.title? true : false} onClick={()=>setViewedConcept(EXAMPLES.props)}>{EXAMPLES.props.title}</TabButton>
                <TabButton selected={currentConcept && currentConcept.title == EXAMPLES.state.title? true : false} onClick={()=>setViewedConcept(EXAMPLES.state)}>{EXAMPLES.state.title}</TabButton>
            </nav>
            <Card className={Style.conceptDetails}>
                {
                    currentConcept == undefined? <p>Click any concept tab to see its detais.</p> :
                    <>
                        <h3>{currentConcept.title}</h3>
                        <p>{currentConcept.description}</p>
                        <pre>
                            <code>{currentConcept.code}</code>
                        </pre>
                    </>
                }
            </Card>
        </section>
    );
}
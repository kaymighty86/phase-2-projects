import Style from "./CoreConceptsSection.module.css";
import Card from "./UI/Card";
import CoreConcept from "./CoreConcept";
import {CORE_CONCEPTS} from "../data-with-examples.js";

export default function CoreConceptsSection(){
    return(
    <Card className={Style.CoreConceptsSection}>
        <h2>Core Concepts</h2>
        <main>
            {CORE_CONCEPTS.map((item)=><CoreConcept {...item}/>)}
        </main>
    </Card>
);}


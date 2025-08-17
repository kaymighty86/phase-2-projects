import { useActionState, useOptimistic, use } from "react";

import { OpinionsContext } from "../store/opinions-context";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {

  const {upvoteOpinion, downvoteOpinion} = use(OpinionsContext);

  //we will declare a "useOptimistic" hook that provides a temporary state which allows us update the votes count temporarily until the upvote action is completed at the backend then it will set its state to the real synchronised state of the votes
  const [votesState, optimisticallyUpdate] = useOptimistic(votes, (prevState, mode)=>(mode == "upvote"? prevState + 1 : prevState - 1));
  
  async function upvoteAction(){
    optimisticallyUpdate("upvote");
    await upvoteOpinion(id);//initiate the real update
  }

  async function downvoteAction(){
    optimisticallyUpdate("downvote");
    await downvoteOpinion(id);//initiate the real update
  }

  const [upvoteState, dispatchUpvote, pendingUpvote] = useActionState(upvoteAction);
  const [downvoteState, dispatchDownvote, pendingDownvote] = useActionState(downvoteAction);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button formAction={dispatchUpvote} disabled={pendingUpvote || pendingDownvote}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{votesState}</span>

        <button formAction={dispatchDownvote} disabled={pendingUpvote || pendingDownvote}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}

import { useState } from "react";
import {
  FeelbackTaggedMessage,
  FeelbackValueDefinition,
  Question,
  PRESET_YESNO_LIKE_DISLIKE,
} from "@feelback/react";
import "@feelback/react/styles/feelback.css";

const YES_TAGS = [
  { value: "accurate", title: "Accurate" },
  { value: "problem-solved", title: "Solved my problem" },
  { value: "clear", title: "Easy to understand" },
  { value: "product-chosen", title: "Helped me decide to use this tech" },
  { value: "other-yes", title: "Other" },
];

const NO_TAGS = [
  { value: "inaccurate", title: "Inaccurate" },
  { value: "missing-info", title: "Couldn't find what I was looking for" },
  { value: "unclear", title: "Hard to understand" },
  { value: "bad-examples", title: "Code samples errors" },
  { value: "other-no", title: "Other" },
];

const FEEDBACK_CONTENT_SET_ID = "6d4fac2e-6797-47aa-8d5c-b9318a0655e8";

export function FeedbackComponent() {
  const [choice, setChoice] = useState();

  return (
    <div className="feelback-container">
      {!choice ? (
        <Question
          text="Was this page helpful?"
          items={PRESET_YESNO_LIKE_DISLIKE}
          showLabels
          onClick={setChoice}
        />
      ) : (
        <FeelbackTaggedMessage
          contentSetId={FEEDBACK_CONTENT_SET_ID}
          layout="radio-group"
          tags={choice === "y" ? YES_TAGS : NO_TAGS}
          title={choice === "y" ? "What did you like?" : "What went wrong?"}
          placeholder="(optional) Please, further detail the feedback"
        />
      )}
    </div>
  );
}

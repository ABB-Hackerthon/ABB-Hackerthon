import React, { useState } from "react";
import data from "./data";
import SingleQuestion from "./Question";

const App = () => {
  const [questions, setQuestions] = useState(data);

  return (
    <main>
      <div className="container">
        <div className="headline">관리자 페이지</div>
        <div className="info">
          {questions.map((question) => (
            <SingleQuestion key={question.id} {...question} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default App;

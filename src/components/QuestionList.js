import { useState, useEffect } from "react";
import  QuestionItem from "./QuestionItem"


function QuestionList() {

const [questions, setQuestions]=useState([]);


//use the useEffect hook to fetch the questions from the API endpoint and update the state when 
//the component mounts:
useEffect(() =>{
  fetch("http://localhost:3000/questions")
  .then((response) => response.json())
  .then((data) => setQuestions(data));




},[]);

//useEffect is used with an empty dependency array ([]) so that it only runs once when the component mounts


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
      
        {questions.map((question) => (
            <QuestionItem  key={question.id} question={question} />
        ))}
         
          

       {/* //This code is using the map function to iterate over an array called questions.
       // For each item in the array, it is creating a new QuestionItem component with the question prop set to the current item, 
       //and a unique key prop set to the id of the current item. */}
        </ul>
    </section>
  );
}

export default QuestionList;

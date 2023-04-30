import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions,setQuestions]= useState([]);

useEffect(()=>{

fetch("http://localhost:3000/questions")
.then((response) => response.json())
.then((data) => setQuestions(data))
.catch((error) => console.error(error));

  }, []);

  //useEffect is used with an empty dependency array ([]) so that it only runs once when the component mounts
  //posting new questions
function handleAddQuestion (newQuestion){

fetch("http://localhost:3000/questions",{
 method:"POST",
 headers:{
  "Content-Type":"application/json",

 } ,
body:JSON.stringify(newQuestion),
})

.then((response) => response.json())
.then((data)=> setQuestions([...questions,data]))
.catch((error) => console.error(error));
};

// function to delete an item


function  handleDeleteQuestion(id){
fetch("http://localhost:3000/questions/${id}",{
   method :"DELETE",
  })
  .then(()=> setQuestions(questions.filter(questions)))
   .then((error) => console.error(error)); 
 
  //The function call appears to be asynchronous and returns a Promise object.
//When the promise is resolved, it will call the setQuestions() function with an argument that is the result of filtering the questions array with the filter() method.
// filter() method is called on the questions array and returns a new array that contains only elements that meet a certain condition. In this case, it seems that the filter() method is not actually filtering anything, as it is passing in the questions array as the filtering condition, which will always return true for every element in the questions array
};


function handleUpdateQuestion(id,updatedQuestion){

 fetch("http://localhost:3000/questions/${id}",{

   method:"PUT",
   headers:{
  "content-Type":"application/json",
   },
   body:JSON.stringify(updatedQuestion),
 })

 .then((response) => response.json())
// calling response from json server
 .then((data)=> setQuestions(questions.map((question) =>
  question.id ===id ?{...data,id}:question
 
 )) )

 .catch((error)=> console.error(error));

// map method is used above to iterate over  array of question and return a new array

//function to update
};
  return (
   
    //rendering a component
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}
export default App;

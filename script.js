/* 
=========================
Promise.all() example
=========================
*/
/*
 const USERS_API = "https://jsonplaceholder.typicode.com/users";
const TODO_API = "https://jsonplaceholder.typicode.com/todos";

async function getUserAndTodo() {
  const [userRes, todoRes] = await Promise.all([
    fetch(USERS_API),
    fetch(TODO_API)
  ])

  const [userData, todoData] = await Promise.all([userRes.json(), todoRes.json()])
  console.log(userData, todoData)
}
getUserAndTodo();
*/


/* 
=========================
main app coding
=========================
*/
import { questionsData } from "./data.js";
import {submissionsData} from './data.js'

appendQuestionAndSubmission();

function appendQuestionAndSubmission() {
  const questionAndSubmission = getQuestionAndSubmission(questionsData, submissionsData);

  const questionAndSubmissionByCategory = getQuestionAndSubmissionByCategory(questionAndSubmission)

  console.log(questionAndSubmissionByCategory)
}



function getQuestionAndSubmission (questions, submissions) {
  let questionAndSubmission = questions.map(question => {
    const findSubmissionOfQuestion = submissions.find(submission => submission.questionId == question.id)

    if(findSubmissionOfQuestion) {
      const mergedQuestionAndSubmission = {
        ...question,
        ...findSubmissionOfQuestion
      }
      delete mergedQuestionAndSubmission.questionId

      return mergedQuestionAndSubmission

    } else {
      return {...question}
    }
    
  })


  return questionAndSubmission;
}


function getQuestionAndSubmissionByCategory (questionAndSubmission) {
  const categoryQuestions = {}
  questionAndSubmission.forEach(( question) => {
    if(categoryQuestions[question.category]) {
      categoryQuestions[question.category].push(question)
    } else {
      categoryQuestions[question.category] = [question]
    }
  })

  return categoryQuestions
}

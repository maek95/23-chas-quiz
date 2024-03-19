// TODO: Clean this code up

// TODO: When the question is long, the box will not align properly, fix!

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomQuiz,
  addFinishedQuiz,
  selectAllQuizzes,
  selectAllFinishedQuizzes,
  setCurrentQuiz,
  editCustomQuiz,
} from "@/redux/CustomQuizSlice";
import AddQuestionForm from "@/Components/AddQuestionForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Footer from "@/Components/footer";

export default function CustomQuizPage() {
  const [newQuestion, setNewQuestion] = useState("");
  const [quizName, setQuizName] = useState(""); // State to store quiz name
  const [questions, setQuestions] = useState([]); // State to store questions in array
  const [editingIndex, setEditingIndex] = useState(null);

  const dispatch = useDispatch();
  const finishedQuizzes = useSelector(selectAllFinishedQuizzes);
  const userQuiz = useSelector((state) => state.customQuiz.allQuizzes);

  const handleAddQuestion = (newQuestionData) => {
    const updatedQuestions = [
      ...questions,
      { id: Date.now(), ...newQuestionData },
    ];
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (questionIdToRemove) => {
    const updatedQuestions = questions.filter(
      (question) => question.id !== questionIdToRemove
    );
    setQuestions(updatedQuestions);
  };

  const handleEditQuestion = (index) => {
    dispatch;
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    if (editingIndex === null) return;
    const updatedQuestions = [...questions];
    updatedQuestions[editingIndex] = {
      ...updatedQuestions[editingIndex],
      id: Date.now(), // Generate a new ID for the updated question
    };
    // Make sure the updated questions are saved in Redux
    dispatch(
      editCustomQuiz({
        id: updatedQuestions[editingIndex].id,
        updatedQuestion: updatedQuestions[editingIndex],
      })
    );
    setEditingIndex(null);
  };

  const handleMakeQuiz = () => {
    if (questions.length === 0 || quizName.trim() === "") return;

const newQuizId = Date.now();

    const newQuiz = {
      id: newQuizId,
      name: quizName,
      results: [...questions],
    };

    dispatch(addFinishedQuiz(newQuiz)); // Add finished quiz to redux store
    dispatch(setCurrentQuiz(newQuiz));

    // Reset quiz name and empty the array of questions
    // when click on "Make Quiz" button
    setQuizName("");
    setQuestions([]);
  };

  console.log(questions);
  console.log(finishedQuizzes);

  return (
    <div className="flex flex-col justify-between min-h-screen">
    <div className="flex justify-center flex-col">
      <h1 className="text-center mt-20">Make your own quiz!</h1>
      <div className="flex justify-center ">
        <div className="flex flex-col">
          <h2 className="flex justify-center">Quiz Name:</h2>
          <input
            className="w-64 mb-10 px-3 py-3 text-center rounded-3xl border-solid border-blue-400 focus:outline-none"
            type="text"
            placeholder="Enter Quiz Name"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
          />
        </div>
      </div>
      <AddQuestionForm
        onAddQuestion={(newQuestionData) => {
          handleAddQuestion(newQuestionData);
          dispatch(addCustomQuiz(newQuestionData)); // Dispatch action to add question to Redux store
        }}
        newQuestion={newQuestion}
        setNewQuestion={setNewQuestion}
      />

      <div className="flex justify-center flex-col mb-16">

        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 p-6">
          {questions.map((question, index) => (
            <li
              key={index}
              className="flex flex-col content-center px-4 pb-4 border rounded-lg shadow-xl border-blue-900 border-solid shadow-outline bg-indigo-800 overflow-hidden h-80"
            >
              {editingIndex === index ? (
                <>
                  <div className="flex flex-col w-full h-full justify-center space-y-6">
                    <input
                      className="w-full mt-1 py-2 rounded-lg border border-gray-300 focus:outline-none border-solid"
                      type="text"
                      value={question.question}
                      onChange={(e) => {
                        const updatedQuestion = e.target.value;
                        setQuestions((prevQuestions) => {
                          const updatedQuestions = [...prevQuestions];
                          updatedQuestions[index].question = updatedQuestion;
                          return updatedQuestions;
                        });
                      }}
                    />
                    <input
                      className="w-full mt-1 py-2 rounded-lg border border-gray-300 focus:outline-none border-solid"
                      type="text"
                      value={question.incorrect_answers[0]}
                      onChange={(e) => {
                        const updatedAnswer = e.target.value;
                        setQuestions((prevQuestions) => {
                          const updatedQuestions = prevQuestions.map((q, i) => {
                            if (i === index) {
                              return {
                                ...q,
                                incorrect_answers: [
                                  updatedAnswer,
                                  q.incorrect_answers[1],
                                  q.incorrect_answers[2],
                                ],
                              };
                            }
                            return q;
                          });
                          return updatedQuestions;
                        });
                      }}
                    />
                    <input
                      className="w-full mt-1 py-2 rounded-lg border border-gray-300 focus:outline-none border-solid"
                      type="text"
                      value={question.incorrect_answers[1]}
                      onChange={(e) => {
                        const updatedAnswer = e.target.value;
                        setQuestions((prevQuestions) => {
                          const updatedQuestions = prevQuestions.map((q, i) => {
                            if (i === index) {
                              return {
                                ...q,
                                incorrect_answers: [
                                  q.incorrect_answers[0],
                                  updatedAnswer,
                                  q.incorrect_answers[2],
                                ],
                              };
                            }
                            return q;
                          });
                          return updatedQuestions;
                        });
                      }}
                    />

                    <input
                      className="w-full mt-1 py-2 rounded-lg border border-gray-300 focus:outline-none border-solid"
                      type="text"
                      value={question.incorrect_answers[2]}
                      onChange={(e) => {
                        const updatedAnswer = e.target.value;
                        setQuestions((prevQuestions) => {
                          const updatedQuestions = prevQuestions.map((q, i) => {
                            if (i === index) {
                              return {
                                ...q,
                                incorrect_answers: [
                                  q.incorrect_answers[0],
                                  q.incorrect_answers[1],
                                  updatedAnswer,
                                ],
                              };
                            }
                            return q;
                          });
                          return updatedQuestions;
                        });
                      }}
                    />

                    <input
                      className="w-full mt-1 py-2 rounded-lg border border-gray-300 focus:outline-none border-solid"
                      type="text"
                      value={question.correct_answer}
                      onChange={(e) => {
                        const updatedAnswer = e.target.value;
                        setQuestions((prevQuestions) => {
                          const updatedQuestions = [...prevQuestions];
                          updatedQuestions[index].correct_answer =
                            updatedAnswer;
                          return updatedQuestions;
                        });
                      }}
                    />
                  </div>
                  <button
                    className="rounded-lg shadow-lg w-16"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div className="flex justify-center">
                    <p className="font-bold">{question.question}</p>
                  </div>
                  <div>
                    <div className="flex space-x-2">
                      <p className="text-green-600 font-bold">Correct: </p>
                      <p>{question.correct_answer}</p>
                    </div>

                    <div className="flex space-x-2">
                      <p className="text-red-600 font-bold">Incorrect: </p>
                      <p>{question.incorrect_answers[0]}</p>
                    </div>

                    <div className="flex space-x-2">
                      <p className="text-red-600 font-bold">Incorrect: </p>
                      <p>{question.incorrect_answers[1]}</p>
                    </div>

                    <div className="flex space-x-2">
                      <p className="text-red-600 font-bold">Incorrect: </p>
                      <p>{question.incorrect_answers[2]}</p>
                    </div>
                  </div>
                  <div className="buttons flex place-content-end">
                    <button
                      className="flex items-center justify-center rounded md:flex"
                      onClick={() => handleEditQuestion(index)}
                    >
                      <p className="text-black hidden md:flex ">edit</p>
                      <div className="flex flex-row space-x-2">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </div>
                    </button>
                    <button
                      className="rounded hidden md:flex"
                      onClick={() => handleRemoveQuestion(question.id)}
                    >
                      <p className="text-black">remove</p>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="rounded md:hidden"
                      onClick={() => handleRemoveQuestion(question.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Om ingen fråga har lagts till, knappen är dold, annars synlig*/}
        {questions.length > 0 && (
          <button
            className="w-30 mt-4 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-bold border-none py-4 px-4 hover rounded-3xl focus:outline-none focus:shadow-outline mx-auto cursor-pointer"
            onClick={handleMakeQuiz}
          >
            Make my Quiz
          </button>
        )}

        {finishedQuizzes.length > 0 ? (
          <h2 className="flex justify-center pt-8">Your quizzes:</h2>
        ) : null}

        <div className="flex items-center justify-center m-0 p-0">
          <ul className="flex justify-center font-bold text-xl text-white flex-col m-0 p-0">
            {finishedQuizzes.map((quiz, index) => (
              <li
                className="list-none flex flex-col justify-center"
                key={index}
              >
                <div className="flex justify-center">
                  <Link
                    className="flex justify-center no-underline text-black hover:underline hover:text-white mr-4"
                    href={"/quiz/"}
                  >
                    {quiz.name}
                  </Link>
                </div>

                <Link className="pb-7 pt-2" href={"/quiz"}>
                  <button className="text-slate-100 w-32 p-4 border-none font-semibold rounded-full  bg-blue-600 hover:bg-blue-700 hover:cursor-pointer ">
                    Play quiz
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
}

import { useEffect, useReducer } from "react";
import { Action, ActionTypes, Question } from "utils";

const SECONDS_PER_QUESTION = 30;

enum Status {
  LOADING = "loading",
  ERROR = "error",
  READY = "ready",
  ACTIVE = "active",
  FINISHED = "finished",
}

type ReducerState = {
  questions: Question[];
  status: Status;
  currentQuestionIndex: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
};

const initialState = {
  questions: [],
  status: Status.LOADING,
  currentQuestionIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const reducer = (state: ReducerState, action: Action): ReducerState => {
  switch (action.type) {
    case ActionTypes.DATA_RECEIVED:
      return {
        ...state,
        questions: action.payload,
        status: Status.READY,
      };
    case ActionTypes.DATA_FAILED:
      return {
        ...state,
        status: Status.ERROR,
      };
    case ActionTypes.START_QUIZ:
      return {
        ...state,
        status: Status.ACTIVE,
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case ActionTypes.NEW_ANSWER:
      const currentQuestion = state.questions[state.currentQuestionIndex];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case ActionTypes.NEXT_QUESTION:
      return {
        ...state,
        answer: null,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    case ActionTypes.FINISH_QUIZ:
      return {
        ...state,
        status: Status.FINISHED,
        answer: null,
        highscore: Math.max(state.highscore, state.points),
      };
    case ActionTypes.RESTART_QUIZ:
      return {
        ...state,
        status: Status.ACTIVE,
        currentQuestionIndex: 0,
        answer: null,
        points: 0,
        secondsRemaining: null,
      };
    case ActionTypes.TICK:
      const isQuizFinished = state.secondsRemaining === 0;

      return {
        ...state,
        secondsRemaining: state.secondsRemaining! - 1,
        status: isQuizFinished ? Status.FINISHED : state.status,
        answer: isQuizFinished ? null : state.answer,
      };
    default:
      return state;
  }
};

export const useQuiz = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const numOfQuestions = state.questions.length;
  const currentQuestion = state.questions[state.currentQuestionIndex];
  const numOfPoints = state.questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:3001/questions");
        const data = await response.json();
        dispatch({ type: ActionTypes.DATA_RECEIVED, payload: data });
      } catch (_error) {
        dispatch({ type: ActionTypes.DATA_FAILED });
      }
    };

    fetchQuestions();
  }, []);

  return {
    ...state,
    currentQuestion,
    numOfQuestions,
    numOfPoints,
    dispatch,
  };
};

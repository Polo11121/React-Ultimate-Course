import { Dispatch as DispatchFunction } from "react";

export type Question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export enum ActionTypes {
  DATA_RECEIVED = "dataReceived",
  DATA_FAILED = "dataFailed",
  START_QUIZ = "startQuiz",
  NEW_ANSWER = "newAnswer",
  NEXT_QUESTION = "nextQuestion",
  FINISH_QUIZ = "finishQuiz",
  RESTART_QUIZ = "restartQuiz",
  TICK = "tick",
}

export type Action =
  | {
      type: ActionTypes.DATA_RECEIVED;
      payload: Question[];
    }
  | {
      type: ActionTypes.NEW_ANSWER;
      payload: number;
    }
  | {
      type: Exclude<
        ActionTypes,
        ActionTypes.DATA_RECEIVED | ActionTypes.NEW_ANSWER
      >;
    };

export type Dispatch = DispatchFunction<Action>;

import { ReactNode, useReducer } from "react";
import { AuthContext } from "@/contexts";
import { User } from "@/types";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

enum AuthAction {
  LOGIN,
  LOGOUT,
}

type AuthProviderProps = {
  children: ReactNode;
};

type State = {
  user: User | null;
  isAuthenticated: boolean;
};

type AuthActionType =
  | {
      type: AuthAction.LOGIN;
      payload: Pick<User, "email" | "password">;
    }
  | {
      type: AuthAction.LOGOUT;
      payload: null;
    };

const initialState: State = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state: State, action: AuthActionType) => {
  switch (action.type) {
    case AuthAction.LOGIN:
      if (
        action.payload?.email === FAKE_USER.email &&
        action.payload?.password === FAKE_USER.password
      ) {
        return {
          ...state,
          user: FAKE_USER,
          isAuthenticated: true,
        };
      }
      return state;
    case AuthAction.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const onLogin = (email: string, password: string) =>
    dispatch({
      type: AuthAction.LOGIN,
      payload: {
        email,
        password,
      },
    });

  const onLogout = () =>
    dispatch({
      type: AuthAction.LOGOUT,
      payload: null,
    });

  const value = {
    user,
    onLogin,
    onLogout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

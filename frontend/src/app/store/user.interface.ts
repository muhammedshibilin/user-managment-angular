export interface User {
    id: number;
    name: string;
    email: string;
    isadmin: boolean;
    imageUrl: string;
  }

  
  export interface UserState {
    user: User | null;
    isLoggedIn: boolean;
    error: string | null;
  }

  export interface AppState {
    user: User;
  }
  
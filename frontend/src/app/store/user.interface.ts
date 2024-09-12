export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  image_url:string;
  isadmin?: boolean;
}


  
  export interface UserState {
    user: User | null;
    isLoggedIn: boolean;
    error: string | null;
  }

  export interface AppState {
    user: User;
  }
  
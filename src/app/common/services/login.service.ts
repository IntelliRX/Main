import { Injectable } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth } from '../../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: User | null = null;

  async loginWithGoogle(): Promise<User | null> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      this.user = result.user;
      return this.user;
    } catch (error) {
      console.error('Google login error:', error);
      return null;
    }
  }

  async logout(): Promise<void> {
    await signOut(auth);
    this.user = null;
  }

  isLoggedIn(): boolean {
    return this.user != null;
  }

  getUser(): User | null {
    return this.user;
  }
}
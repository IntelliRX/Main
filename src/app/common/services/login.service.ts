import { Injectable } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup, signOut, User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _user: User | null = null;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  private storage: Storage | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.storage = window.localStorage;
    }

    // Restore session from Firebase when app loads
    if (typeof window !== 'undefined') {
      onAuthStateChanged(auth, (u) => {
        if (u) {
          this.user = u; // uses setter
        } else {
          this.user = null; // uses setter
        }
      });
    }
  }

  async loginWithGoogle(): Promise<User | null> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      this.user = result.user; // setter will handle storage + subject
      return this._user;
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
    return this.user !== null;
  }

  /** ---------------------------
   *  User Getter / Setter
   * --------------------------- */
  get user(): User | null {
    if (this._user) return this._user;

    // Restore from storage
    if (this.storage) {
      const stored = this.storage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        this._user = {
          uid: parsed.uid,
          displayName: parsed.displayName,
          email: parsed.email,
          photoURL: parsed.photoURL,
        } as User;
        this.userSubject.next(this._user);
      }
    }
    return this._user;
  }

  set user(u: User | null) {
    this._user = u;
    if (this.storage) {
      if (u) {
        this.saveUserToLocalStorage(u);
      } else {
        this.storage.removeItem('user');
      }
    }
    this.userSubject.next(this._user); // broadcast to subscribers
  }

  /** ---------------------------
   *  Convenient User Properties
   * --------------------------- */
  get uid(): string | null {
    return this.user?.uid ?? null;
  }

  get displayName(): string | null {
    return this.user?.displayName ?? null;
  }

  get email(): string | null {
    return this.user?.email ?? null;
  }

  get photoURL(): string | null {
    return this.user?.photoURL ?? null;
  }

  /** ---------------------------
   *  Helpers
   * --------------------------- */
  private saveUserToLocalStorage(user: User) {
    this.storage?.setItem('user', JSON.stringify({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    }));
  }
}
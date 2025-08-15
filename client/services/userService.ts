export interface User {
  id: string;
  email: string;
  password: string; // In a real app, this would be hashed
  name: string;
  phoneNumber?: string;
  profilePicture?: string;
  createdAt: string;
  loginMethod: 'email' | 'google' | 'facebook' | 'apple';
}

export interface UserSession {
  userId: string;
  email: string;
  name: string;
  loginMethod: string;
  isAuthenticated: boolean;
}

class UserService {
  private readonly USERS_KEY = 'uniiq_users';
  private readonly SESSION_KEY = 'uniiq_session';

  // Get all users from localStorage
  private getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Save users to localStorage
  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // Generate a simple ID
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Create a new user account
  signUp(userData: {
    email: string;
    password: string;
    name: string;
    phoneNumber?: string;
    agreeTerms: boolean;
    agreeNewsletter: boolean;
  }): { success: boolean; message: string; user?: User } {
    // Validation
    if (!userData.email || !userData.password || !userData.name) {
      return { success: false, message: 'Please fill in all required fields' };
    }

    if (!userData.agreeTerms) {
      return { success: false, message: 'You must agree to the Terms & Conditions' };
    }

    const users = this.getUsers();
    
    // Check if user already exists
    const existingUser = users.find(user => user.email.toLowerCase() === userData.email.toLowerCase());
    if (existingUser) {
      return { success: false, message: 'An account with this email already exists' };
    }

    // Create new user
    const newUser: User = {
      id: this.generateId(),
      email: userData.email.toLowerCase(),
      password: userData.password, // In real app, hash this
      name: userData.name,
      phoneNumber: userData.phoneNumber,
      createdAt: new Date().toISOString(),
      loginMethod: 'email'
    };

    users.push(newUser);
    this.saveUsers(users);

    // Create session
    this.createSession(newUser);

    return { success: true, message: 'Account created successfully!', user: newUser };
  }

  // Sign in user
  signIn(email: string, password: string): { success: boolean; message: string; user?: User } {
    if (!email || !password) {
      return { success: false, message: 'Please enter your email and password' };
    }

    const users = this.getUsers();
    const user = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password &&
      u.loginMethod === 'email'
    );

    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Create session
    this.createSession(user);

    return { success: true, message: 'Signed in successfully!', user };
  }

  // Social login (simplified for demo)
  socialLogin(provider: 'google' | 'facebook' | 'apple', userInfo: { email: string; name: string }): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    
    // Check if user exists with this email and provider
    let user = users.find(u => 
      u.email.toLowerCase() === userInfo.email.toLowerCase() && 
      u.loginMethod === provider
    );

    if (!user) {
      // Create new social user
      user = {
        id: this.generateId(),
        email: userInfo.email.toLowerCase(),
        password: '', // No password for social login
        name: userInfo.name,
        createdAt: new Date().toISOString(),
        loginMethod: provider
      };

      users.push(user);
      this.saveUsers(users);
    }

    // Create session
    this.createSession(user);

    return { success: true, message: `Signed in with ${provider} successfully!`, user };
  }

  // Create user session
  private createSession(user: User): void {
    const session: UserSession = {
      userId: user.id,
      email: user.email,
      name: user.name,
      loginMethod: user.loginMethod,
      isAuthenticated: true
    };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
  }

  // Get current session
  getCurrentSession(): UserSession | null {
    const session = localStorage.getItem(this.SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const session = this.getCurrentSession();
    return session?.isAuthenticated || false;
  }

  // Sign out
  signOut(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  // Get all registered users (for debugging)
  getAllUsers(): User[] {
    return this.getUsers();
  }

  // Clear all data (for testing)
  clearAllData(): void {
    localStorage.removeItem(this.USERS_KEY);
    localStorage.removeItem(this.SESSION_KEY);
  }
}

export const userService = new UserService();

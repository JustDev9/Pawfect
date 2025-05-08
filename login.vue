<template>
  <div class="auth-container">
    <div class="auth-box">
      <div class="logo-row">
        <img src="/Designer.png" alt="PawFect" class="logo-img" />
        <span class="logo-text">PAWFECT</span>
      </div>
      <div class="tab-row">
        <button :class="{active: activeTab === 'login'}" @click="activeTab = 'login'">Login</button>
        <button :class="{active: activeTab === 'signup'}" @click="activeTab = 'signup'">Sign Up</button>
      </div>
      <form v-if="activeTab === 'login'" @submit.prevent="handleLogin">
        <h2>Sign in</h2>
        <input type="email" v-model="loginEmail" placeholder="Email" required />
        <input type="password" v-model="loginPassword" placeholder="Password" required />
        <button class="main-btn" type="submit">Log in</button>
        <div class="or-divider">or</div>
        <button class="google-btn" type="button" @click="handleGoogleSignIn">
          Log in with Google
        </button>
      </form>
      <form v-else @submit.prevent="handleSignUp">
        <h2>Sign up</h2>
        <input type="email" v-model="signupEmail" placeholder="Email" required />
        <input type="password" v-model="signupPassword" placeholder="Password" required @input="validatePassword" />
        <input type="password" v-model="signupConfirm" placeholder="Confirm Password" required />
        <div v-if="passwordError" class="password-error">{{ passwordError }}</div>
        <div class="terms-row">
          <input type="checkbox" id="terms" v-model="agreedToTerms" required />
          <label for="terms">
            I agree to the <a href="#" @click.prevent="showTerms = true">Terms and Conditions</a>
          </label>
        </div>
        <button class="main-btn" type="submit" :disabled="!agreedToTerms || passwordError">Sign up</button>
        <div class="or-divider">or</div>
        <button class="google-btn" type="button" @click="handleGoogleSignIn">
          Sign up with Google
        </button>
      </form>
    </div>
    <div v-if="showTerms" class="modal-overlay" @click.self="showTerms = false">
      <div class="modal">
        <button class="close-btn" @click="showTerms = false">&times;</button>
        <h2>Terms and Agreement</h2>
        <div class="modal-content">
          <p><strong>By creating an account or logging in to Pawfect, you agree to the following terms:</strong></p>
          <ul>
            <li><strong>User Responsibility:</strong> You are responsible for maintaining the confidentiality of your login information and for all activities under your account.</li>
            <li><strong>Accurate Information:</strong> You agree to provide true, current, and complete information during registration and when submitting adoption applications.</li>
            <li><strong>Proper Use:</strong> Pawfect is intended for lawful use only. You agree not to misuse the platform for any harmful, offensive, or misleading activities.</li>
            <li><strong>Privacy:</strong> We value your privacy. Your personal data will be used solely for pet adoption purposes and will not be shared without your consent.</li>
            <li><strong>Changes and Updates:</strong> Pawfect may update these terms at any time. Continued use of the platform after changes means you accept the new terms.</li>
          </ul>
          <p>By clicking Sign Up or Login, you confirm that you have read, understood, and agree to be bound by these terms.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginSignup',
  data() {
    return {
      activeTab: 'login',
      loginEmail: '',
      loginPassword: '',
      signupEmail: '',
      signupPassword: '',
      signupConfirm: '',
      agreedToTerms: false,
      showTerms: false,
      passwordError: '',
    };
  },
  methods: {
    validatePassword() {
      const password = this.signupPassword;
      const minLength = 8;
      const hasUpper = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      if (password.length < minLength) {
        this.passwordError = 'Password must be at least 8 characters.';
      } else if (!hasUpper) {
        this.passwordError = 'Password must contain at least one uppercase letter.';
      } else if (!hasNumber) {
        this.passwordError = 'Password must contain at least one number.';
      } else if (!hasSpecial) {
        this.passwordError = 'Password must contain at least one special character.';
      } else {
        this.passwordError = '';
      }
    },
    handleLogin() {
      alert(`Logged in as ${this.loginEmail}`);
    },
    handleSignUp() {
      this.validatePassword();
      if (this.passwordError) {
        return;
      }
      if (this.signupPassword !== this.signupConfirm) {
        alert('Passwords do not match!');
        return;
      }
      if (!this.agreedToTerms) {
        alert('You must agree to the Terms and Conditions.');
        return;
      }
      alert(`Signed up as ${this.signupEmail}`);
    },
    handleGoogleSignIn() {
      alert('Google sign-in popup (simulate real OAuth here)');
    },
  },
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff6e9;
}
.auth-box {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.08);
  padding: 2.5rem 2rem 2rem 2rem;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.logo-img {
  width: 40px;
  height: 40px;
}
.logo-text {
  font-size: 1.7rem;
  font-weight: 800;
  color: #f7871f;
  letter-spacing: 1px;
}
.tab-row {
  display: flex;
  width: 100%;
  margin-bottom: 1.5rem;
}
.tab-row button {
  flex: 1;
  padding: 0.7rem 0;
  border: none;
  background: #f7f7f7;
  color: #888;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.tab-row button.active {
  background: #fff6e9;
  color: #f7871f;
  border-bottom: 2px solid #f7871f;
}
form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
form h2 {
  margin-bottom: 1.2rem;
  color: #222;
  font-size: 1.3rem;
  font-weight: 700;
}
input[type="email"], input[type="password"] {
  width: 100%;
  padding: 0.8rem 1rem;
  margin-bottom: 1rem;
  border: 1.5px solid #f7d7a3;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff6e9;
  outline: none;
  transition: border 0.2s;
}
input[type="email"]:focus, input[type="password"]:focus {
  border: 1.5px solid #f7871f;
}
.main-btn {
  width: 100%;
  padding: 0.8rem 0;
  background: #f7871f;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.main-btn:hover {
  background: #ff5252;
}
.or-divider {
  margin: 0.7rem 0;
  color: #aaa;
  font-size: 0.95rem;
  position: relative;
  width: 100%;
  text-align: center;
}
.google-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  background: #fff;
  border: 1.5px solid #f7871f;
  color: #f7871f;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.7rem 0;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s, color 0.2s;
}
.google-btn img {
  width: 22px;
  height: 22px;
}
.google-btn:hover {
  background: #f7871f;
  color: #fff;
}
.terms-row {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  color: #555;
}
.terms-row input[type="checkbox"] {
  margin-right: 0.5rem;
}
.terms-row a {
  color: #f7871f;
  text-decoration: underline;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  border-radius: 12px;
  max-width: 420px;
  width: 90vw;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  position: relative;
}
.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #f7871f;
  cursor: pointer;
}
.modal-content {
  margin-top: 1rem;
  color: #333;
  font-size: 1rem;
}
.modal-content ul {
  margin: 1rem 0 1rem 1.2rem;
  padding: 0;
}
.modal-content li {
  margin-bottom: 0.7rem;
}
.password-error {
  color: #ff5252;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  text-align: left;
  width: 100%;
}
</style>
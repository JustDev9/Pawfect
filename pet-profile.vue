<template>
  <div>
    <nav class="nav-container" :class="{ 'nav-scrolled': hasScrolled }">
      <div class="logo-container">
        <div class="logo-image">
          <img src="/Designer.png" alt="Pawfect" width="40" height="40">
        </div>
        <span class="logo-text">PAWFECT</span>
      </div>

      <div class="nav-links-container">
        <transition name="fade">
          <div v-if="mobileMenuOpen || !isMobile" class="nav-links" :class="{ 'mobile-active': mobileMenuOpen }">
            <a href="home" class="nav-link" @click="closeMenuIfMobile">Home</a>
            <a href="pet-profiles" class="nav-link" @click="closeMenuIfMobile">Pet Profiles</a>
            <div class="dropdown">
              <a href="#" class="nav-link dropdown-toggle" @click="toggleDropdown">
                Resources <span class="dropdown-arrow" :class="{ 'arrow-rotated': dropdownOpen }">▼</span>
              </a>
              <transition name="slide-fade">
                <div v-if="isMobile && dropdownOpen" class="dropdown-content mobile">
                  <a href="#" @click="closeMenuIfMobile">Training Tips</a>
                  <a href="#" @click="closeMenuIfMobile">Health Guides</a>
                  <a href="#" @click="closeMenuIfMobile">Pet Care</a>
                </div>
              </transition>
              <div v-if="!isMobile" class="dropdown-content desktop">
                <a href="#">Training Tips</a>
                <a href="#">Health Guides</a>
                <a href="#">Pet Care</a>
              </div>
            </div>
            <a href="donations" class="nav-link" @click="closeMenuIfMobile">Donation</a>
            <a href="contact" class="nav-link" @click="closeMenuIfMobile">Contact</a>
          </div>
        </transition>
      </div>

      <div class="right-section">
        <div class="user-icon" role="button" aria-label="User   profile" tabindex="0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>

        <button class="mobile-menu-toggle" aria-label="Toggle menu" @click="toggleMobileMenu">
          <div class="bar" :class="{ 'bar-1-active': mobileMenuOpen }"></div>
          <div class="bar" :class="{ 'bar-2-active': mobileMenuOpen }"></div>
          <div class="bar" :class="{ 'bar-3-active': mobileMenuOpen }"></div>
        </button>
      </div>
    </nav>

    <!-- Pet Profile Card -->
    <div class="pet-profile-container">
      <div class="pet-card">
        <div class="pet-image-container">
          <img src="/public/ridley.png" alt="Ian" class="pet-image">
        </div>
        <div class="pet-info">
          <h2 class="pet-name">Hi! I'm Ian</h2>
          <div class="pet-details">
            <div class="detail-item">
              <span class="detail-label">Age:</span>
              <span class="detail-value">20</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Breed:</span>
              <span class="detail-value">American White Hair</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Sex:</span>
              <span class="detail-value">M</span>
            </div>
          </div>
          <p class="pet-description">
            Ian was found on a corner street in Olongapo and is trying to find his loved ones.
            He has a gullible and joyful personality and likes to play with other people.
            He enjoys petting and playtime. He also likes coding.
          </p>
          <button class="adoption-button" @click="showApplicationForm = true">Apply for Adoption</button>
        </div>
      </div>
    </div>

    <div class="container adoption-process">
      <h2 class="title">Process of Adoption</h2>
      <div class="steps">
        <div class="step">
          <div class="circle">1</div>
          <p>Apply</p>
        </div>
        <div class="line"></div>
        <div class="step">
          <div class="circle">2</div>
          <p>Screening</p>
        </div>
        <div class="line"></div>
        <div class="step">
          <div class="circle">3</div>
          <p>Finalize Adoption</p>
        </div>
        <div class="line"></div>
        <div class="step">
          <div class="circle">4</div>
          <p>Bring Home</p>
        </div>
      </div>
    </div>

    <!-- Application Form Section -->
    <div class="application-form-section">
      <div class="form-container" :class="{ 'show-form': showApplicationForm }">
        <div class="form-overlay" @click="showApplicationForm = false"></div>
        <div class="form-content">
          <button class="close-form-btn" @click="showApplicationForm = false">&times;</button>

          <h2 class="form-title">Application Form For Adoption</h2>
          <p class="form-description">
            Please fill out the form below to apply for adoption.
          </p>

          <form @submit.prevent="submitApplication" class="adoption-form">
            <div class="form-group name-group">
              <label>Name</label>
              <div class="input-row">
                <div class="input-field">
                  <input type="text" v-model="application.firstName" placeholder="First" required>
                </div>
                <div class="input-field">
                  <input type="text" v-model="application.lastName" placeholder="Last" required>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Address</label>
              <input type="text" v-model="application.address" required>
            </div>

            <div class="input-row">
              <div class="form-group">
                <label>Phone</label>
                <input type="tel" v-model="application.phone" required>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" v-model="application.email" required>
              </div>
            </div>

            <div class="input-row">
              <div class="form-group">
                <label>Birth Date</label>
                <input type="date" v-model="application.birthDate" required>
              </div>
              <div class="form-group">
                <label>Occupation</label>
                <input type="text" v-model="application.occupation" required>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="submit-btn">Submit Application</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Questionnaire Section -->
    <div class="questionnaire-section" v-if="showQuestionnaire">
      <h2 class="form-title">Questionnaire</h2>
      <div class="question" v-for="(question, index) in questions" :key="index">
        <p>{{ question.text }}</p>
        <div class="options">
          <button
            v-for="(option, i) in question.options"
            :key="i"
            class="option-button"
            :class="{ 'selected': answers[index] === i }"
            @click="selectAnswer(index, i)"
          >
            {{ option }}
          </button>
        </div>
        <p v-if="answers[index] !== undefined" class="selected-answer">
          Selected: {{ question.options[answers[index]] }}
        </p>
      </div>
      <button class="submit-btn" @click="submitQuestionnaire">Submit Questionnaire</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PawfectAdoption',
  data() {
    return {
      mobileMenuOpen: false,
      dropdownOpen: false,
      isMobile: false,
      hasScrolled: false,
      showApplicationForm: false,
      showQuestionnaire: false,
      application: {
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        email: '',
        birthDate: '',
        occupation: ''
      },
      questions: [
        {
          text: "What is your living situation?",
          options: [
            "I own a house with a yard",
            "I live in an apartment with pet-friendly policies",
            "I rent, and pets are not allowed",
            "I’m unsure about my housing situation"
          ]
        },
        {
          text: "How much time can you dedicate to your pet daily?",
          options: [
            "More than 3 hours (exercise, playtime, training, etc.)",
            "1-3 hours",
            "Less than 1 hour",
            "I have a busy schedule and might not have time"
          ]
        },
        {
          text: "Do you have other pets at home?",
          options: [
            "Yes, and they get along well with others",
            "Yes, but I’m not sure how they’ll react to a new pet",
            "No, this will be my first pet"
          ]
        },
        {
          text: "Can you afford pet care expenses (food, vet visits, grooming, etc.)?",
          options: [
            "Yes, I have a budget for pet care",
            "I might struggle but will do my best",
            "No, I’m not financially ready for a pet"
          ]
        },
        {
          text: "What is your reason for adopting a pet?",
          options: [
            "I want a lifelong companion",
            "I want a pet for security",
            "I think pets are cute, but I’m not sure about long-term care"
          ]
        },
        {
          text: "What will you do if your pet develops health or behavior issues?",
          options: [
            "Seek professional help from a vet or trainer",
            "Try to manage the situation myself",
            "Give the pet away if it becomes too difficult"
          ]
        }
      ],
      answers: []
    }
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
    window.addEventListener('scroll', this.handleScroll);
    this.addGlobalStyles();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize);
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    addGlobalStyles() {
      const style = document.createElement('style');
      style.innerHTML = `
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        html {
          box-sizing: border-box;
        }
        *, *:before, *:after {
          box-sizing: inherit;
        }
      `;
      document.head.appendChild(style);
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      if (!this.mobileMenuOpen) {
        this.dropdownOpen = false;
      }
      document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
    },
    toggleDropdown(event) {
      if (this.isMobile) {
        event.preventDefault();
        this.dropdownOpen = !this.dropdownOpen;
      }
    },
    closeMenuIfMobile() {
      if (this.isMobile) {
        this.mobileMenuOpen = false;
        this.dropdownOpen = false;
        document.body.style.overflow = '';
      }
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 768;
      if (!this.isMobile) {
        this.mobileMenuOpen = false;
        this.dropdownOpen = false;
        document.body.style.overflow = '';
      }
    },
    handleScroll() {
      this.hasScrolled = window.scrollY > 20;
    },
    submitApplication() {
      console.log('Application submitted:', this.application);
      this.showApplicationForm = false;
      this.showQuestionnaire = true; // Show the questionnaire after submitting the application
    },
    selectAnswer(questionIndex, optionIndex) {
      this.answers[questionIndex] = optionIndex; // Store the selected answer
    },
    submitQuestionnaire() {
      console.log('Questionnaire submitted:', this.answers);
      alert('Thank you for completing the questionnaire!');
      // Reset answers and hide questionnaire if needed
      this.answers = [];
      this.showQuestionnaire = false;
    }
  }
}
</script>

<style scoped>
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F9A826;
  padding: 0.75rem 2rem;
  color: white;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-scrolled {
  padding: 0.5rem 2rem;
  background-color: rgba(249, 168, 38, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-image {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.logo-container:hover .logo-image {
  transform: scale(1.1) rotate(5deg);
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.logo-container:hover .logo-text {
  transform: translateX(3px);
}

.nav-links-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  position: relative;
  padding: 0.5rem 0;
  transition: all 0.2s ease;
}

.nav-link:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: white;
  transition: width 0.3s ease;
}

.nav-link:hover:after {
  width: 100%;
}

.dropdown {
  position: relative;
}

.dropdown-arrow {
  font-size: 0.7rem;
  vertical-align: middle;
  margin-left: 4px;
  transition: transform 0.3s ease;
}

.arrow-rotated {
  transform: rotate(180deg);
}

.dropdown-content {
  min-width: 180px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1;
}

.dropdown-content.desktop {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.75rem;
  background-color: white;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
}

.dropdown:hover .dropdown-content.desktop {
  display: block;
  opacity: 1;
  pointer-events: auto;
}

.dropdown-content a {
  padding: 0.75rem 1rem;
  text-decoration: none;
  display: block;
  transition: all 0.2s ease;
}

.dropdown-content.desktop a {
  color: #333;
  font-weight: 500;
}

.dropdown-content.desktop a:hover {
  background-color: #f8f8f8;
  padding-left: 1.25rem;
}

.dropdown-content.mobile {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-top: 0.5rem;
}

.dropdown-content.mobile a {
  color: white;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.dropdown-content.mobile a:last-child {
  border-bottom: none;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-icon {
  color: white;
  cursor: pointer;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.user-icon:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.3);
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.bar {
  height: 3px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
}

.bar-1-active {
  transform: translateY(8px) rotate(45deg);
}

.bar-2-active {
  opacity: 0;
}

.bar-3-active {
  transform: translateY(-8px) rotate(-45deg);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

@media (max-width: 900px) {
  .nav-links {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0.75rem 1.25rem;
  }

  .logo-text {
    font-size: 1.5rem;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .nav-links-container {
    position: static;
  }

  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F9A826;
    padding: 2rem;
    gap: 1.5rem;
    z-index: 5;
    transition: all 0.3s ease;
    overflow-y: auto;
    padding-top: 5rem;
    width: 100vw;
    margin: 0;
  }

  .mobile-active {
    animation: slideIn 0.3s forwards;
  }

  .nav-link {
    font-size: 1.3rem;
  }

  .nav-link:after {
    height: 3px;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0.75rem 1rem;
  }

  .logo-text {
    font-size: 1.3rem;
  }

  .user-icon {
    width: 32px;
    height: 32px;
  }

  .nav-links {
    padding: 1.5rem;
    gap: 1.25rem;
  }
}

/* Pet Profile Card Styles */
.pet-profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f8f9fa;
}

.pet-card {
  display: flex;
  max-width: 900px;
  width: 100%;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.pet-card:hover {
  transform: translateY(-5px);
}

.pet-image-container {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  position: relative;
  overflow: hidden;
}

.pet-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.pet-card:hover .pet-image {
  transform: scale(1.05);
}

.pet-info {
  flex: 1.5;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.pet-name {
  color: #546e7a;
  font-size: 2.2rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.pet-details {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.detail-item {
  background-color: #f1f8fe;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-label {
  color: #607d8b;
  font-weight: 600;
}

.detail-value {
  color: #455a64;
}

.pet-description {
  color: #607d8b;
  line-height: 1.6;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.adoption-button {
  align-self: flex-start;
  background-color: #F9A826;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(249, 168, 38, 0.3);
}

.adoption-button:hover {
  background-color: #e89921;
  transform: translateY(-2px);
}

/* Process adoption */
.adoption-process {
  background-color: #f8f9fa;
  padding: 3rem 1rem;
  margin-bottom: 2rem;
}

.container {
  text-align: center;
  margin: 0 auto;
  max-width: 1200px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #546e7a;
}

.steps {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  width: 120px;
}

.circle {
  background-color: #F9A826;
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.step:hover .circle {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.line {
  width: 50px;
  height: 3px;
  background-color: #F9A826;
  position: relative;
}

.step p {
  color: #607d8b;
  font-weight: 600;
  margin-top: 0.5rem;
}

@media (max-width: 600px) {
  .steps {
    flex-direction: column;
  }
  .line {
    width: 3px;
    height: 30px;
  }
}

/* Application Form Styles */
.application-form-section {
  width: 100%;
}

.form-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.show-form {
  opacity: 1;
  visibility: visible;
}

.form-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.form-content {
  background: white;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 30px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.show-form .form-content {
  transform: translateY(0);
}

.close-form-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  transition: color 0.3s ease;
}

.close-form-btn:hover {
  color: #F9A826;
}

.form-title {
  font-size: 28px;
  color: #FF6B6B;
  margin-bottom: 10px;
  text-align: center;
}

.form-description {
  color: #888;
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.6;
}

.adoption-form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

.name-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #555;
}

.input-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.input-row .form-group {
  flex: 1;
  margin-bottom: 0;
}

.input-field {
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus {
  border-color: #F9A826;
  box-shadow: 0 0 0 2px rgba(249, 168, 38, 0.2);
  outline: none;
}

.form-actions {
  margin-top: 20px;
  text-align: right;
}

.submit-btn {
  background-color: #F9A826;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover {
  background-color: #e89921;
  transform: translateY(-2px);
}

/* Questionnaire Styles */
.questionnaire-section {
  padding: 2rem;
  background-color: #f8f9fa;
}

.question {
  margin-bottom: 1.5rem;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.option-button {
  background-color: #F9A826;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-button:hover {
  background-color: #e89921;
  transform: translateY(-2px);
}

.selected {
  background-color: #db8f1e;
}

.selected-answer {
  margin-top: 0.5rem;
  font-weight: bold;
  color: #546e7a;
}
</style>
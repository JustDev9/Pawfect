<template>
  <div class="nav">
    <a href="/" class="navbar-brand">
      <img src="/Pawfect Logo.png" alt="logo" class="logo-img" />
    </a>

    <i class="fa-solid fa-bars open-btn"></i>

    <div class="menu">
      <a href="/" class="link-hover">Home</a>
      <a href="/" class="link-hover">Pet Profile</a>

      <div class="resources-dropdown">
        <div class="dropdown-title">
          <p class="link-hover">Resources</p>
          <i class='bx bxs-down-arrow'></i>
           </div>
        <div class="dropdown-content">
          <a href="/" class="dropdown-item">
            <i class='bx bxs-down-arrow'></i>
                    <p>Success Stories</p>
          </a>
          <hr/>
          <a href="/" class="dropdown-item">
            <i class="fa-solid fa-person-circle-question"></i>
            <p>Lost and found</p>
          </a>
          <hr/>
          <a href="/" class="dropdown-item">

            <p>Pet News</p>
          </a>
        </div>
      </div>

      <a href="/" class="link-hover">Contact</a>

      <i class="fa-solid fa-x close-btn"></i>
      <div class="Icons">
        <a href="/"><i class="fa-solid fa-magnifying-glass"></i></a>
        <a href="/"><i class="fa-regular fa-user"></i></a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const dropdownTitle = document.querySelector('.dropdown-title')
  const dropdownContent = document.querySelector('.dropdown-content')
  const openBtn = document.querySelector('.open-btn')
  const closeBtn = document.querySelector('.close-btn')
  const menu = document.querySelector('.menu')

  dropdownTitle?.addEventListener('click', () => {
    dropdownTitle.classList.toggle('rotate-0')
    dropdownContent.classList.toggle('show')
  })

  openBtn?.addEventListener('click', () => {
    menu.classList.add('menu-active')
  })

  closeBtn?.addEventListener('click', () => {
    menu.classList.remove('menu-active')
  })
})
</script>

<style scoped src="/src/assets/style.css"></style>

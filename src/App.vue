<template>
  <div id="app">
    <header class="l-styleguide-masthead m-styleguide-masthead">
      <div class="m-styleguide-container">
        <div class="m-styleguide-logo">
          <svg class="icon icon-header-logo" focusable="false" pointer-events="none">
            <use xlink:href="#icon-header-logo" xmlns:xlink="http://www.w3.org/1999/xlink" />
          </svg>
        </div>
        <div class="m-styleguide-menu-mobile js-menu">
          <svg
            class="m-styleguide-menu-mobile__icon"
            xmlns="http://www.w3.org/2000/svg"
            height="32"
            version="1.1"
            viewBox="0 0 32 32"
            width="32"
            xml:space="preserve"
            enable-background="new 0 0 32 32"
            style="fill: white;"
          >
            <path
              d="M4 10h24c1.1 0 2-0.9 2-2s-0.9-2-2-2H4C2.9 6 2 6.9 2 8S2.9 10 4 10zM28 14H4c-1.1 0-2 0.9-2 2s0.9 2 2 2h24c1.1 0 2-0.9 2-2S29.1 14 28 14zM28 22H4c-1.1 0-2 0.9-2 2s0.9 2 2 2h24c1.1 0 2-0.9 2-2S29.1 22 28 22z"
            />
          </svg>
        </div>
        <div class="m-styleguide-menu-mobile js-menu-close u-hide">
          <svg
            class="m-styleguide-menu-mobile__icon"
            height="32"
            id="close"
            viewBox="0 0 32 32"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 8 L8 4 L16 12 L24 4 L28 8 L20 16 L28 24 L24 28 L16 20 L8 28 L4 24 L12 16 z"
            />
          </svg>
        </div>
      </div>
    </header>
    <div class="l-styleguide-content o-wrapper">
      <div class="l-styleguide-menu m-styleguide-menu">
        <nav>
          <h3 class="m-styleguide-menu__title">Home</h3>
        </nav>
      </div>
      <div class="l-styleguide-section">
        <div class="m-styleguide-section">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./App.ts"></script>
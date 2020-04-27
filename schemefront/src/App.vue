<template>
  <div id="app">
    <b-navbar type="light" variant="light">
      <b-navbar-brand>Sight</b-navbar-brand>
      <b-navbar-nav>
        <b-link class="mr-3" to="/">Analyze</b-link>
        <b-link to="/dashboard">Dashboard</b-link>
      </b-navbar-nav>
      <n-navbar-nav class="ml-auto">
        <!--<b-navbar-brand>
          <p class="font-weight-lighter font-italic d-inline-block">Powered by </p>
        </b-navbar-brand>-->
        <b-navbar-brand>
          <img src="./assets/visiblelogo.jpeg"
              class="d-inline-block"
              height="45"
              width="45"
              alt="Logo">
        </b-navbar-brand>
      </n-navbar-nav>
    </b-navbar>
    <router-view/>
  </div>
</template>

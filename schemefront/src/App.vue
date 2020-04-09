<template>
  <div id="app">
    <b-navbar type="light" variant="light">
      <b-navbar-brand>Scheme</b-navbar-brand>
      <b-navbar-nav>
        <b-link class="mr-3" to="/">Analyze</b-link>
        <b-link to="/dashboard">Dashboard</b-link>
      </b-navbar-nav>
    </b-navbar>
    <router-view/>
  </div>
</template>

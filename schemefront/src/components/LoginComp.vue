<template>
  <div>
    <div class="container">
      <b-jumbotron>
        <b-card>
          <h4>Enter Login Credentials</h4>
          <b-form-group>
            <label for="email">Email:</label>
            <b-form-input id="email"
                          v-model="email"
                          placeholder="firstlast@email.com">
            </b-form-input>
            <label for="password">Password:</label>
            <b-form-input id="password"
                          v-model="password"
                          placeholder="********">
            <b-form-input>
          </b-form-group>
        </b-card>
        <br>
        <b-button @click="onLogin" variant="success">Login</b-button>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginComp',
  data() {
    return {
      currentHostname: '',
      email: '',
      password: '',
    };
  },
  mounted() {
    this.currentHostname = window.location.hostname;
    this.reInit();
  },
  methods: {
    reInit() {
      this.initData();
    },
    initData() {
      this.email = '';
      this.password = '';
    },
    onLogin(evt) {
      evt.preventDefault();
      const path = `http://${this.currentHostname}:8087/users/login`;
      const user = {
        email: this.email,
        password: this.password,
      };
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      axios.post(path, user, config)
        .then((res) => {
          if (res.data.token != null) {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            localStorage.setItem('jwt', res.data.token);
            this.$emit('loggedin');
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              this.$router.push('/');
            }
          }
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};
</script>

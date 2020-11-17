<template>
    <div class="Login">
      <br>
      <br>
      <LoginComp/>
      <br>
      <Register/>
      <br>
    </div>
</template>

<script>
import LoginComp from '@/components/LoginComp.vue';
import Register from '@/components/Register.vue';

export default {
  name: 'Login',
  components: {
    LoginComp,
    Register,
  },
};
</script>

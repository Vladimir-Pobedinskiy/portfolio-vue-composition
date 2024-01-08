<template>
  <template v-if="user">
    <div class="container">
      <section class="personal-account offset-page">
        <div class="personal-account__top">
          <h1 class="personal-account__title h2">Личный кабинет</h1>
          <button class="personal-account__btn-out btn btn-small" type="button" @click="signOut">Выйти</button>
        </div>
        <div class="personal-account__content">
          <p class="p1">Контент персонального аккаунта</p>
        </div>
      </section>
    </div>
  </template>
  <template v-else>
    <div class="container">
      <p>зарегистрируйтесь</p>
    </div>
  </template>
</template>

<script>
import { supabase } from '@/supabase'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PersonalAccountView',
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  watch: {
    user(value) {
      if (!value) {
        this.$router.push({ name: 'login-view' })
      }
    }
  },
  created() {
    if (!this.user) {
      this.$router.push({ name: 'login-view' })
    }
  },
  methods: {
    ...mapActions({
      clearUser: 'clearUser'
    }),
    async signOut() {
      await supabase.auth.signOut()
      this.clearUser()
    }
  }
}
</script>

<style lang="scss">
.personal-account {

  &__top {
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width:$desktop) {
      margin-bottom: 40px;
    }
  }

  &__title {
    text-transform: uppercase;
  }

  &__btn-out {
    width: 100%;
    max-width: 100px;
  }

}
</style>

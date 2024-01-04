<template>
  <AppHeader />

  <main class="main">
    <router-view />
  </main>

  <AppFooter />
</template>

<script>
import AppHeader from '@/components/App/AppHeader'
import AppFooter from '@/components/App/AppFooter'

export default {
  name: 'App',
  components: { AppHeader, AppFooter }
}
</script>

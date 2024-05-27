<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon
        class="v-app-bar-nav-icon"
        color="white"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Clinic System</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : 'left'"
      :temporary="$vuetify.display.mobile"
      app
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.value"
          @click="navigate(item.value)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Nav',
  setup() {
    const drawer = ref(false);
    const items = ref([
      { title: 'Foo', value: 'foo' },
      { title: 'Bar', value: 'bar' },
      { title: 'Fizz', value: 'fizz' },
      { title: 'Buzz', value: 'buzz' },
    ]);

    const router = useRouter();
    const navigate = (path: string) => {
      router.push(path);
      drawer.value = false;
    };

    return {
      drawer,
      items,
      navigate,
    };
  },
});
</script>

<style scoped></style>

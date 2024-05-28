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
      <div class="toolbar-items">
        <div>
          Hello,
          {{ authData ? authData.name + ' ' + authData.surname : 'Guest' }}
        </div>
        <div>
          <v-btn
            v-if="!authData"
            color="white"
            @click="navigate(PathConstants.LOGIN_PATH)"
            variant="elevated"
          >
            Login
          </v-btn>
          <v-btn v-else color="white" @click="logout"> Logout</v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : 'left'"
      :temporary="$vuetify.display.mobile"
      app
    >
      <v-list>
        <NavItem
          v-for="item in navItems()"
          :listItemText="item.listItemText"
          :listItemPath="item.listItemPath"
          :requireLogin="item.requireLogin"
          :allowedRoles="item.allowedRoles"
        >
        </NavItem>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <Spinner>
        <router-view></router-view>
      </Spinner>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import Spinner from '@/shared/spinner/Spinner.vue';
import { navItems } from '@/shared/components/nav/navItems.ts';
import NavItem from '@/shared/components/nav/NavItem.vue';
import { useAuth } from '@/core/authentication/composables/useAuth.ts';
import { PathConstants } from '@/core/constants/path.constants.ts';

export default defineComponent({
  name: 'Nav',
  computed: {
    PathConstants() {
      return PathConstants;
    },
  },
  methods: {
    navItems() {
      return navItems;
    },
  },
  components: { NavItem, Spinner },
  setup() {
    const drawer = ref(false);

    const router = useRouter();
    const { authData, logout } = useAuth();

    const navigate = (path: string) => {
      router.push(path);
      drawer.value = false;
    };

    return {
      drawer,
      navigate,
      authData,
      logout,
    };
  },
});
</script>

<style scoped>
.toolbar-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  font-size: 1.2rem;
  margin-right: 1em;
}
</style>

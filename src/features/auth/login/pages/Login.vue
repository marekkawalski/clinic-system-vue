<template>
  <div class="form-page">
    <div class="headlines-wrapper">
      <h2 class="headline">Clinic system</h2>
    </div>
    <div class="form-card-wrapper">
      <div class="form-card-child">
        <v-card class="login-card">
          <v-card-title>Login</v-card-title>
          <v-card-text class="card-content">
            <form @submit="onSubmit">
              <v-text-field
                v-model="email"
                label="Email"
                outlined
                dense
                :error-messages="errors.email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPassword = !showPassword"
                label="Password"
                outlined
                dense
                :error-messages="errors.password"
              ></v-text-field>
              <div class="d-flex justify-end">
                <v-btn
                  class="forget-password"
                  variant="flat"
                  @click="navigate('/forgot-password')"
                >
                  Forgot password?
                </v-btn>
              </div>
              <div class="container">
                <div class="button-container">
                  <v-btn variant="flat" type="submit" color="primary">
                    Login
                  </v-btn>
                </div>
              </div>
            </form>
            <v-btn
              class="sign-up"
              variant="flat"
              @click="navigate(PathConstants.REGISTER_PATH)"
            >
              Don't have an account? Sign up
            </v-btn>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { useAuth } from '@/core/authentication/composables/useAuth';
import { useSpinner } from '@/shared/spinner/composables/useSpinner';
import { useSnackbar } from '@/shared/snackbar/composables/useSnackbar';
import { PathConstants } from '@/core/constants/path.constants';

const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .min(1, { message: 'This is required' })
      .email({ message: 'Must be a valid email' }),
    password: zod
      .string()
      .min(1, { message: 'This is required' })
      .min(8, { message: 'Too short' }),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: email } = useField('email');
const { value: password } = useField('password');

const showPassword = ref(false);

const { login } = useAuth();
const { showSpinner, hideSpinner } = useSpinner();
const { showSnackbar } = useSnackbar();
const router = useRouter();

const onSubmit = handleSubmit(async values => {
  showSpinner();
  try {
    await login(values.email, values.password);
    await router.push(PathConstants.HOME_PATH);
    showSnackbar('Login successful', 'success');
  } finally {
    hideSpinner();
  }
});

const navigate = (path: string) => {
  router.push(path);
};
</script>

<style scoped>
@import 'src/styles/components/form/form-page.scss';
@import 'src/styles/components/form/form.scss';

.headline {
  font-weight: 400 !important;
}

.sign-up {
  text-transform: unset;
  margin-top: 8em;

  :hover {
    cursor: pointer;
  }

  span {
    padding: 10px;
  }
}

.forget-password {
  text-transform: unset;
  padding-top: 0.2em;
  text-align: right;

  :hover {
    cursor: pointer;
  }
}
</style>

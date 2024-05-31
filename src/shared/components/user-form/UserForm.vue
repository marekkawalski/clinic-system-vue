<template>
  <div
    :class="formType === FormType.PopupForm ? 'popup-form' : 'whole-page-form'"
  >
    <v-card class="login-card">
      <v-card-title>{{ action }}</v-card-title>
      <v-card-text class="card-content">
        <form @submit="onSubmit">
          <!-- Basic Data Fields -->
          <div class="form-grid">
            <div>
              <v-text-field
                v-model="name"
                label="Name"
                outlined
                dense
                :error-messages="errors['basicData.name']"
              ></v-text-field>
              <v-text-field
                v-model="surname"
                label="Surname"
                outlined
                dense
                :error-messages="errors['basicData.surname']"
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="Email"
                outlined
                dense
                :error-messages="errors['basicData.email']"
              ></v-text-field>
              <v-text-field
                v-model="phoneNumber"
                label="Phone Number"
                outlined
                dense
                :error-messages="errors['basicData.phoneNumber']"
              ></v-text-field>
              <v-text-field
                v-model="pesel"
                label="PESEL"
                outlined
                dense
                :error-messages="errors['basicData.pesel']"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPassword = !showPassword"
                label="Password"
                outlined
                dense
                :error-messages="errors['basicData.password']"
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                label="Confirm Password"
                outlined
                dense
                :error-messages="errors['basicData.confirmPassword']"
              ></v-text-field>
            </div>
            <div>
              <!-- Address Fields -->
              <v-text-field
                v-model="country"
                label="Country"
                outlined
                dense
                :error-messages="errors['address.country']"
              ></v-text-field>
              <v-text-field
                v-model="city"
                label="City"
                outlined
                dense
                :error-messages="errors['address.city']"
              ></v-text-field>
              <v-text-field
                v-model="street"
                label="Street"
                outlined
                dense
                :error-messages="errors['address.street']"
              ></v-text-field>
              <v-text-field
                v-model="postalCode"
                label="Postal Code"
                outlined
                dense
                :error-messages="errors['address.postalCode']"
              ></v-text-field>
              <v-text-field
                v-model="houseNumber"
                label="House Number"
                outlined
                dense
                :error-messages="errors['address.houseNumber']"
              ></v-text-field>
              <v-text-field
                v-model="apartmentNumber"
                label="Apartment Number"
                outlined
                dense
                :error-messages="errors['address.apartmentNumber']"
              ></v-text-field>
            </div>
            <div>
              <!-- Admin Managed Data Fields -->
              <v-checkbox
                v-if="checkAccess([UserRole.ADMIN])"
                v-model="enabled"
                label="Enabled"
              ></v-checkbox>
              <v-select
                v-if="checkAccess([UserRole.ADMIN])"
                v-model="role as UserRole"
                :items="Object.values(UserRole)"
                label="Role"
              ></v-select>

              <!-- Doctor Details Fields -->
              <v-text-field
                v-if="role === UserRole.DOCTOR"
                v-model="specialization"
                label="Specialization"
                outlined
                dense
                :error-messages="errors['doctorDetails.specialization']"
              ></v-text-field>
              <v-text-field
                v-if="role === UserRole.DOCTOR"
                v-model="education"
                label="Education"
                outlined
                dense
                :error-messages="errors['doctorDetails.education']"
              ></v-text-field>
              <v-text-field
                v-if="role === UserRole.DOCTOR"
                v-model="description"
                label="Description"
                outlined
                dense
                :error-messages="errors['doctorDetails.description']"
              ></v-text-field>
            </div>
          </div>

          <v-btn type="submit" color="primary">Submit</v-btn>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useUser } from '@/core/composables/useUser';
import { useRegister } from '@/core/authentication/composables/useRegister';
import { useAuth } from '@/core/authentication/composables/useAuth';
import { useSnackbar } from '@/shared/snackbar/composables/useSnackbar';
import { UserRole } from '@/core/enums/UserRole';
import { UserFormData } from './models/UserFormData';
import { userFormSchema } from './validation/userFormSchema';
import { FormType } from '@/shared/enums/FormType';

const props = defineProps({
  userId: String,
  action: String,
  formType: {
    type: String,
    default: FormType.PopupForm,
  },
  onClose: Function,
});

const schema = toTypedSchema(userFormSchema(!props.userId));

const { handleSubmit, errors, resetForm } = useForm<UserFormData>({
  validationSchema: schema,
  initialValues: {
    basicData: {
      name: '',
      surname: '',
      email: '',
      phoneNumber: '',
      pesel: '',
      password: '',
      confirmPassword: '',
    },
    address: {
      country: '',
      city: '',
      street: '',
      postalCode: '',
      houseNumber: '',
      apartmentNumber: '',
    },
    adminManagedData: {
      role: UserRole.PATIENT,
      enabled: true,
    },
    doctorDetails: {
      specialization: '',
      education: '',
      description: '',
    },
  },
});

const { value: name } = useField('basicData.name');
const { value: surname } = useField('basicData.surname');
const { value: email } = useField('basicData.email');
const { value: phoneNumber } = useField('basicData.phoneNumber');
const { value: pesel } = useField('basicData.pesel');
const { value: password } = useField('basicData.password');
const { value: confirmPassword } = useField('basicData.confirmPassword');
const { value: country } = useField('address.country');
const { value: city } = useField('address.city');
const { value: street } = useField('address.street');
const { value: postalCode } = useField('address.postalCode');
const { value: houseNumber } = useField('address.houseNumber');
const { value: apartmentNumber } = useField('address.apartmentNumber');
const { value: enabled } = useField('adminManagedData.enabled');
const { value: role } = useField('adminManagedData.role');
const { value: specialization } = useField('doctorDetails.specialization');
const { value: education } = useField('doctorDetails.education');
const { value: description } = useField('doctorDetails.description');

const { updateUser, getUserById } = useUser();
const { register } = useRegister();
const { showSnackbar } = useSnackbar();
const { checkAccess } = useAuth();
const showPassword = ref(false);

onMounted(() => {
  if (props.userId) {
    getUserById(props.userId).then(user => {
      resetForm({
        values: {
          basicData: {
            name: user.name,
            surname: user.surname,
            email: user.email,
            phoneNumber: user?.phoneNumber ?? '',
            pesel: user.pesel,
            password: '',
            confirmPassword: '',
          },
          address: user.address,
          adminManagedData: {
            role: user.role,
            enabled: user.isEnabled,
          },
          doctorDetails: user.doctorDetails ?? {
            specialization: '',
            education: '',
            description: '',
          },
        },
      });
    });
  }
});

const onSubmit = handleSubmit(async formData => {
  const data = {
    ...formData.basicData,
    address: formData.address,
    role: formData.adminManagedData.role,
    isEnabled: formData.adminManagedData.enabled,
    doctorDetails: formData.doctorDetails,
  };

  try {
    if (props.userId) {
      const response = await updateUser(data, props.userId);
      if (response) {
        showSnackbar(
          `User ${response.name} ${response.surname} updated successfully`,
          'success',
        );
      }
    } else {
      const response = await register(data);
      if (response) {
        showSnackbar(
          `User ${response.name} ${response.surname} registered successfully`,
          'success',
        );
      }
    }

    if (props.formType === FormType.PopupForm && props.onClose) {
      props.onClose();
    }
  } catch (error) {
    showSnackbar('An error occurred', 'error');
  }
});
</script>

<style scoped>
@import '@/styles/components/form/form.scss';
@import '@/styles/components/form/form-page.scss';

.popup-form {
  width: 100%;
}

.whole-page-form {
  width: 80%;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  gap: 1em;
}
</style>

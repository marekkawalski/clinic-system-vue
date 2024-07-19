<template>
  <div>
    <h2>Manage Users</h2>
    <h6 v-if="!dataSource.length" class="mt-4">No users found</h6>

    <v-row v-else class="fill-height d-flex" align="center" justify="center">
      <div class="table-wrapper">
        <v-row>
          <v-col>
            <v-btn
              color="primary"
              @click="handleOpenAddDialog"
              start-icon="mdi-plus"
              id="add-user-button"
            >
              <v-icon>mdi-plus</v-icon>
              Add user
            </v-btn>
          </v-col>
          <v-col>
            <v-checkbox
              v-model="showDisabled"
              color="primary"
              label="Show disabled users"
              @change="handleToggleDisabled"
            />
          </v-col>
        </v-row>

        <v-table class="mat-elevation-z8">
          <thead>
            <tr>
              <th
                v-for="(column, i) in tableHelper.baseColumnNames"
                :key="column"
                :id="`th-${i}`"
              >
                {{ tableHelper.baseColumnTitles[i] }}
              </th>
              <th id="th-edit">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in dataSource" :key="row.id">
              <td v-for="column in tableHelper.baseColumnNames" :key="column">
                {{ tableHelper.nestedPropertyAccessor(row, column) }}
              </td>
              <td>
                <v-icon
                  color="primary"
                  @click="handleOpenEditDialog(row)"
                  class="edit-user-button"
                >
                  mdi-pencil
                </v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
        <Paginator
          :onPageChange="handlePageChange"
          :data="pageUserResponseData"
          :requestParams="requestParams"
        />
      </div>

      <EditUser
        :open="openEditDialog"
        :user="selectedUser"
        :on-close="handleCloseEditDialog"
      />
      <AddUser :open="openAddDialog" :on-close="handleCloseAddDialog" />
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useUser } from '@/core/composables/useUser.ts';
import { useSpinner } from '@/shared/spinner/composables/useSpinner.ts';
import { TableHelper } from '@/shared/helpers/tableHelper.ts';
import { User } from '@/core/models/user/User.ts';
import { PageRequestResponseData } from '@/shared/model/PageRequestResponseData.ts';
import { UserPageRequestParams } from '@/shared/model/UserPageRequestParams.ts';
import Paginator from '@/shared/components/Paginator.vue';
import EditUser from '@/features/manage-users/components/EditUser.vue';
import AddUser from '@/features/manage-users/components/AddUser.vue';

const { getPagedUsers } = useUser();
const { showSpinner, hideSpinner } = useSpinner();
const tableHelper = new TableHelper();

const dataSource = ref<User[]>([]);
const pageUserResponseData = ref<PageRequestResponseData<User>>();
const requestParams = ref<UserPageRequestParams>({});
const showDisabled = ref<boolean>(false);
const openEditDialog = ref<boolean>(false);
const openAddDialog = ref<boolean>(false);
const selectedUser = ref<User | null>(null);

const fetchPagedUsers = async () => {
  showSpinner();
  try {
    const data = await getPagedUsers(requestParams.value);
    dataSource.value = data.content;
    pageUserResponseData.value = data;
    tableHelper.setSpecifiedBaseColumnNamesFromRequestData(
      data,
      [
        'id',
        'name',
        'surname',
        'email',
        'role',
        'phoneNumber',
        'pesel',
        'address.country',
        'address.city',
        'address.street',
        'address.postalCode',
        'address.houseNumber',
        'address.apartmentNumber',
        'isEnabled',
        'createdAt',
        'updatedAt',
        'lastLogin',
      ],
      {
        id: 'Id',
        name: 'Name',
        surname: 'Surname',
        email: 'Email',
        role: 'Role',
        phoneNumber: 'Phone Number',
        pesel: 'Pesel',
        'address.country': 'Country',
        'address.city': 'City',
        'address.street': 'Street',
        'address.postalCode': 'Postal Code',
        'address.houseNumber': 'House Number',
        'address.apartmentNumber': 'Apartment Number',
        isEnabled: 'Is Enabled',
        createdAt: 'Created At',
        updatedAt: 'Updated At',
        lastLogin: 'Last Login',
      },
    );
    tableHelper.setAllColumnNames(['edit']);
  } finally {
    hideSpinner();
  }
};

onMounted(() => {
  const showDisabledStored = localStorage.getItem('show-disabled');
  if (showDisabledStored) {
    requestParams.value['show-disabled'] = showDisabledStored === 'true';
  }
  fetchPagedUsers();
});

watch(requestParams, fetchPagedUsers, { deep: true });

const handlePageChange = (params?: UserPageRequestParams) => {
  if (params) {
    requestParams.value = params;
  }
};

const handleToggleDisabled = () => {
  showDisabled.value = !showDisabled.value;
  localStorage.setItem('show-disabled', String(showDisabled.value));
  requestParams.value['show-disabled'] = showDisabled.value;
};

const handleOpenEditDialog = (user: User) => {
  selectedUser.value = user;
  openEditDialog.value = true;
};

const handleCloseEditDialog = async () => {
  selectedUser.value = null;
  openEditDialog.value = false;
  await fetchPagedUsers();
};

const handleOpenAddDialog = () => {
  openAddDialog.value = true;
};
const handleCloseAddDialog = async () => {
  openAddDialog.value = false;
  await fetchPagedUsers();
};
</script>

<style lang="scss" scoped>
@use '@/styles/components/table' as *;

.table-wrapper {
  width: 80%;
}
</style>

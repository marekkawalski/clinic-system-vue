<template>
  <v-container>
    <div v-if="loading">Loading...</div>
    <div v-else-if="!examinations.length">No examinations available</div>
    <div v-else>
      <v-table dense>
        <thead>
          <tr>
            <th
              v-for="(title, index) in tableHelper.baseColumnTitles"
              :key="index"
            >
              {{ title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(examination, index) in examinations" :key="index">
            <td v-for="column in tableHelper.baseColumnNames" :key="column">
              {{ tableHelper.nestedPropertyAccessor(examination, column) }}
            </td>
          </tr>
        </tbody>
      </v-table>
      <Paginator
        :on-page-change="handlePageChange"
        :request-params="requestParams"
        :data="pageExaminationResponseData"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { TableHelper } from '@/shared/helpers/tableHelper';
import { Doctor } from '@/core/models/Doctor';
import { useSpinner } from '@/shared/spinner/composables/useSpinner.ts';
import { useExamination } from '@/features/doctors/composables/useExamination.ts';
import { useSnackbar } from '@/shared/snackbar/composables/useSnackbar.ts';
import { Examination } from '@/core/models/Examination.ts';
import { PageRequestResponseData } from '@/shared/model/PageRequestResponseData.ts';
import { ExaminationPageRequestParams } from '@/shared/model/ExaminationPageRequestParams.ts';
import Paginator from '@/shared/components/Paginator.vue';

const props = defineProps<{ doctor: Doctor }>();

const tableHelper = new TableHelper();
const { showSpinner, hideSpinner } = useSpinner();
const { fetchPagedDoctorExaminations } = useExamination();
const { showSnackbar } = useSnackbar();

const examinations = ref<Examination[]>([]);
const pageExaminationResponseData = ref<
  PageRequestResponseData<Examination> | undefined
>(undefined);
const requestParams = ref<ExaminationPageRequestParams>({
  'doctor-ids': [props.doctor.id],
});

const loading = ref(true);

const loadDoctorExaminations = async (params: ExaminationPageRequestParams) => {
  showSpinner();
  loading.value = true;
  try {
    const response = await fetchPagedDoctorExaminations(params);
    pageExaminationResponseData.value = response;
    examinations.value = response.content;
    tableHelper.setSpecifiedBaseColumnNamesFromRequestData(
      response,
      ['name', 'duration', 'price', 'status'],
      {
        name: 'Name',
        duration: 'Duration',
        price: 'Price',
        status: 'Status',
      },
    );
  } catch (error) {
    showSnackbar('Failed to load examination data', 'error');
  } finally {
    hideSpinner();
    loading.value = false;
  }
};

onMounted(() => {
  loadDoctorExaminations(requestParams.value);
});

watch(
  requestParams,
  newParams => {
    loadDoctorExaminations(newParams);
  },
  { deep: true },
);

const handlePageChange = (params: ExaminationPageRequestParams) => {
  requestParams.value = params;
};
</script>

<style lang="scss" scoped></style>

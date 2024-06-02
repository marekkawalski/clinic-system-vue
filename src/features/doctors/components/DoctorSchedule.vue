<template>
  <v-container>
    <div v-if="!scheduleDataSource">No schedule data available</div>
    <div v-else>
      <v-table dense class="mat-elevation-z8 schedule">
        <thead>
          <tr>
            <th v-for="column in tableHelper.allColumnNames" :key="column">
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="column in tableHelper.allColumnNames" :key="column">
              {{
                scheduleDataSource.get(column)
                  ? `${scheduleDataSource.get(column)?.startTime} - ${scheduleDataSource.get(column)?.endTime}`
                  : 'N/A'
              }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Doctor } from '@/core/models/Doctor';
import { TableHelper } from '@/shared/helpers/tableHelper';
import { DailySchedule } from '@/core/models/user/Schedule';

const props = defineProps<{ doctor: Doctor }>();

const scheduleDataSource = ref<Map<string, DailySchedule> | null>(null);
const tableHelper = new TableHelper();

watch(
  () => props.doctor,
  newDoctor => {
    if (newDoctor?.doctorDetails?.schedule?.dailySchedules) {
      scheduleDataSource.value =
        newDoctor.doctorDetails.schedule.dailySchedules;
      tableHelper.setBaseColumnNames([
        ...newDoctor.doctorDetails.schedule.dailySchedules.keys(),
      ]);
    }
    console.log('scheduleDataSource:', scheduleDataSource.value);
  },
  { immediate: true, deep: true },
);
</script>

<style scoped>
.schedule {
  /* Add your custom styles here */
}
</style>

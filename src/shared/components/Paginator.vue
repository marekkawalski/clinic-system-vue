<template>
  <v-row class="paginator-wrapper">
    <v-select
      v-model="pageSize"
      :items="pageSizes"
      label="Page Size"
      variant="solo"
      @update:modelValue="handlePageSizeChange"
      class="paginator-select"
    />
    <v-pagination
      v-model="pageNum"
      :length="totalPages"
      @update:modelValue="handlePageChange"
      :total-visible="7"
      :start="0"
    />
  </v-row>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { PageRequestParams } from '@/shared/model/PageRequestParams';
import { PageRequestResponseData } from '@/shared/model/PageRequestResponseData';

interface PaginatorComponentProps {
  onPageChange: (params: PageRequestParams) => void;
  data?: PageRequestResponseData<unknown>;
  requestParams: PageRequestParams;
}

const props = defineProps<PaginatorComponentProps>();

const pageSizes = [5, 10, 20, 50];
const pageSize = ref(props.requestParams['page-size'] ?? 10);
const pageNum = ref(props.requestParams['page-num'] ?? 0);

const totalPages = computed(() => {
  return props.data ? props.data.totalPages - 1 : 0;
});

const handlePageChange = (value: number) => {
  pageNum.value = value;
  props.onPageChange({ ...props.requestParams, 'page-num': value });
  console.log('Page changed to:', value);
};

const handlePageSizeChange = () => {
  props.onPageChange({
    ...props.requestParams,
    'page-size': pageSize.value,
    'page-num': 0,
  });
};

watch(
  () => props.requestParams,
  newVal => {
    pageSize.value = newVal['page-size'] ?? 10;
    pageNum.value = newVal['page-num'] ?? 0;
  },
);
</script>

<style lang="scss" scoped>
.paginator-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2em;
  gap: 2em;

  .paginator-select {
    display: block;
    min-width: fit-content;
    max-width: 100px;
  }
}
</style>

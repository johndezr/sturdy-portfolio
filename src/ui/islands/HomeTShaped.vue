<template>
  <section class="h-full w-full" ref="chartContainer"></section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const chartContainer = ref<HTMLElement | null>(null);

const chartData = {
  type: 'radar',
  data: {
    labels: [
      'Clean Architecture',
      'React/Vue',
      'AI',
      'TypeScript',
      'Design Thinking',
      'Next/Nuxt',
      'Astro',
      'Python',
      'Docker',
      'PostgreSQL/MongoDB',
      'Digital Ocean/AWS',
      'CI/CD',
      'Testing',
    ],
    datasets: [
      {
        label: 'Depth & Breadth',
        data: [90, 90, 70, 90, 70, 90, 90, 60, 60, 60, 70, 70, 90],
        backgroundColor: 'rgba(100, 116, 139, 0.2)',
        borderColor: 'rgba(100, 116, 139, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(100, 116, 139, 1)',
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        font: {
          size: 12,
          weight: 'bold',
          family: 'Caladea',
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        pointLabels: {
          font: {
            size: 12,
            weight: 'bold',
            family: 'Montserrat',
          },
        },
      },
    },
  },
};

onMounted(async () => {
  const { default: Chart } = await import('chart.js/auto');
  const canvas = document.createElement('canvas');
  if (chartContainer.value) {
    chartContainer.value.appendChild(canvas);
    // @ts-ignore
    window.__chart = new Chart(canvas, chartData);
  }
});
</script>

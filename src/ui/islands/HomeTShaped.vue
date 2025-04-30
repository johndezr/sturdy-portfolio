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
      'Frontend Architecture',
      'React/Vue',
      'AI/ML',
      'TypeScript',
      'Design Thinking',
      'Next.js/Nuxt.js',
      'Astro',
      'Python',
      'DevOps',
      'System Design',
      'JavaScript',
    ],
    datasets: [
      {
        label: 'Depth & Breadth',
        data: [90, 90, 60, 80, 70, 75, 60, 60, 40, 70, 90],
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

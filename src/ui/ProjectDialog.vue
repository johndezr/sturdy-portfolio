<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { selectedProject, openProjectDialog } from '@/stores/projects';
import { computed } from 'vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const project = useStore(selectedProject);
const isOpen = useStore(openProjectDialog);

const handleClose = () => {
  openProjectDialog.set(false);
};
</script>

<template>
  <Dialog :open="isOpen" @update:open="handleClose">
    <DialogContent class="sm:max-w-[600px] md:max-w-[900px]">
      <DialogHeader>
        <DialogTitle class="text-2xl font-bold">{{ project.title }}</DialogTitle>
        <p class="text-muted-foreground text-sm" v-html="project.description" />
      </DialogHeader>

      <Separator />
      <div class="grid grid-cols-3 gap-2">
        <div class="col-span-2">
          <div v-if="project.loom" class="relative h-0 w-full pb-[56.25%]">
            <div class="absolute top-0 left-0 h-full w-full">
              <iframe
                :src="project.loom"
                frameborder="0"
                webkitallowfullscreen
                mozallowfullscreen
                allowfullscreen
                class="absolute top-0 left-0 h-full w-full"
              ></iframe>
            </div>
          </div>
          <img v-else src="/images/projects/basek-drive.png" alt="Basek Drive" />
          <h3 class="mt-4 text-lg font-bold">Descripción</h3>
          <DialogDescription v-html="project.description" />
          <p class="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam doloribus architecto
            excepturi eligendi! Nam iure vel deserunt labore at? Distinctio eaque error a rerum in
            debitis obcaecati? Maxime, quo repellendus.
          </p>
          <p class="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci hic corrupti aliquid
            facilis ad blanditiis illum est, ipsum doloremque voluptas iste odit? Consequatur itaque
            animi optio odio accusamus non repudiandae!
          </p>
        </div>
        <div class="col-span-1 gap-2 px-2">
          <div class="mb-4">
            <h4 class="mb-2 font-bold">Estado</h4>
            <Badge variant="outline">Terminado</Badge>
          </div>
          <h4 class="mb-2 font-bold">Technologies</h4>
          <div class="mb-4 flex flex-wrap gap-2">
            <Badge
              v-for="tech in project.technologies"
              :key="tech"
              class="bg-foreground rounded-2xl font-bold text-white"
              variant="outline"
            >
              {{ tech }}
            </Badge>
          </div>
          <Separator />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Menu, Calendar, Phone } from 'lucide-vue-next';
import { NAV_LINKS } from '@/config/constants';
const scrolled = ref(false);
const isOpen = ref(false);
const isActive = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 10;
};

const navLinks = ref(NAV_LINKS);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  navLinks.value.forEach((link) => {
    link.isActive = link.url === window.location.pathname;
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div
    :class="[
      'fixed top-0 right-0 left-0 z-50 mb-4 bg-white/50 py-4 shadow backdrop-blur-sm transition-all duration-300',
      scrolled ? 'bg-white/50 shadow backdrop-blur-sm' : 'bg-transparent',
    ]"
  >
    <div class="container mx-auto max-w-7xl">
      <nav class="flex items-center justify-between">
        <div class="flex items-center gap-5">
          <a
            href="/"
            class="font-caladea text-2xl font-bold tracking-tight transition-opacity hover:opacity-80"
          >
            John Galindez
          </a>

          <div class="hidden h-6 md:block">
            <Separator orientation="vertical" />
          </div>

          <div class="hidden items-start gap-10 md:flex">
            <a
              v-for="link in navLinks"
              :key="link.text"
              :href="link.url"
              :class="`hover:text-primary/80 text-sm font-semibold transition-colors ${
                link.isActive ? 'text-primary' : 'text-foreground'
              }`"
            >
              {{ link.text }}
            </a>
          </div>
        </div>

        <div class="hidden items-center gap-4 md:flex">
          <a
            href="https://github.com/johndezr"
            target="_blank"
            class="text-foreground hover:text-primary/80"
            aria-label="GitHub"
          >
            <img src="/icons/github.svg" alt="GitHub" />
          </a>
          <a
            href="https://linkedin.com/in/johndezr"
            target="_blank"
            class="text-foreground hover:text-primary/80"
            aria-label="LinkedIn"
          >
            <img src="/icons/linkedin.svg" alt="LinkedIn" />
          </a>

          <div class="h-6">
            <Separator class="w-2" orientation="vertical" />
          </div>
          <a
            href="https://calendly.com/johndez/30min"
            target="_blank"
            class="flex items-center text-sm"
          >
            <Button class="rounded-full px-5 py-5 font-semibold">
              Book a call <span class="ml-2"><Calendar class="size-4" /></span
            ></Button>
          </a>
        </div>

        <!-- Mobile menu -->
        <Button variant="ghost" size="icon" class="md:hidden" @click="isOpen = true">
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle menu</span>
        </Button>

        <!-- Mobile Sheet -->
        <Sheet v-model:open="isOpen">
          <SheetContent side="right" :class="{ 'pointer-events-auto': isOpen }">
            <div class="mt-8 flex flex-col space-y-6 p-4">
              <a
                v-for="link in navLinks"
                :key="link.text"
                :href="link.url"
                class="hover:text-primary/80"
                @click="isOpen = false"
              >
                {{ link.text }}
              </a>
              <div class="mt-4 flex space-x-5">
                <!-- Social icons for mobile -->
                <a
                  href="https://github.com/johndezr"
                  target="_blank"
                  class="text-foreground hover:text-primary/80"
                  aria-label="GitHub"
                >
                  <img src="/icons/github.svg" alt="GitHub" />
                </a>
                <a
                  href="https://linkedin.com/in/johngalindez"
                  target="_blank"
                  class="text-foreground hover:text-primary/80 transition-colors"
                  aria-label="LinkedIn"
                >
                  <img src="/icons/linkedin.svg" alt="LinkedIn" />
                </a>
              </div>
              <Button class="ml-4 rounded-full p-5">
                <a href="/contact" class="flex items-center text-sm font-semibold"
                  >Book a call <span class="ml-2"><Calendar class="size-4" /></span
                ></a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  </div>
</template>

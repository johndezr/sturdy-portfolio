<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Menu, Calendar, Phone } from 'lucide-vue-next';

const scrolled = ref(false);
const isOpen = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const navLinks = [
  { text: 'Home', url: '/' },
  { text: 'Experience', url: '/#experience' },
  { text: 'Projects', url: '/#projects' },
  { text: 'Certificates', url: '/#certificates' },
  { text: 'Blog', url: '/blog' },
];
</script>

<template>
  <div
    :class="[
      'fixed top-0 right-0 left-0 z-50 mb-4 py-4 transition-all duration-300',
      scrolled ? 'bg-background/95 shadow-xs backdrop-blur-sm' : 'bg-transparent',
    ]"
  >
    <div class="max-w7xl container mx-auto">
      <nav class="flex items-center justify-between">
        <div class="flex items-center gap-5">
          <a
            href="/"
            class="font-caladea text-2xl font-bold tracking-tight transition-opacity hover:opacity-80"
          >
            John Galindez
          </a>

          <div class="h-6">
            <Separator orientation="vertical" />
          </div>

          <div class="hidden items-start gap-10 md:flex">
            <a
              v-for="link in navLinks"
              :key="link.text"
              :href="link.url"
              class="hover:text-primary/80 text-sm font-semibold transition-colors"
            >
              {{ link.text }}
            </a>
          </div>
        </div>

        <div class="hidden items-center gap-4 md:flex">
          <a
            href="https://github.com/johndezr"
            target="_blank"
            rel="noopener noreferrer"
            class="text-foreground hover:text-primary/80 transition-colors"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-github-icon lucide-github"
            >
              <path
                d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
              />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/johngalindez"
            target="_blank"
            rel="noopener noreferrer"
            class="text-foreground hover:text-primary/80 transition-colors"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-linkedin-icon lucide-linkedin"
            >
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
              />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>

          <div class="h-6">
            <Separator class="w-2" orientation="vertical" />
          </div>

          <Button class="ml-4">
            <a href="/contact" class="flex items-center"
              >Book a call <span class="ml-2"><Calendar class="size-4" /></span
            ></a>
          </Button>
        </div>

        <!-- Mobile menu -->
        <Button variant="ghost" size="icon" class="md:hidden" @click="isOpen = true">
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle menu</span>
        </Button>

        <!-- Mobile Sheet -->
        <Sheet v-model:open="isOpen">
          <SheetContent side="right" :class="{ 'pointer-events-auto': isOpen }">
            <div class="mt-8 flex flex-col space-y-6">
              <a
                v-for="link in navLinks"
                :key="link.text"
                :href="link.url"
                class="hover:text-primary/80 text-lg font-medium transition-colors"
                @click="isOpen = false"
              >
                {{ link.text }}
              </a>
              <div class="mt-4 flex space-x-5">
                <!-- Social icons for mobile -->
                <a
                  href="https://github.com/johndezr"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-foreground hover:text-primary/80 transition-colors"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                    />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/johngalindez"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-foreground hover:text-primary/80 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                    />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
              <Button class="mt-4 w-full">
                <a href="/contact" class="flex w-full items-center justify-center">
                  Get in touch <span class="ml-1"><Phone class="size-4" /></span>
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  </div>
</template>

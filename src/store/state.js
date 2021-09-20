import { writable } from 'svelte/store';

export let isDarkModeEnabled = writable(false);

export let currentlyPlayingWidgetId = writable();

export let currentTrack = writable();
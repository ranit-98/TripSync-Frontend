import { dashboardAssets, tripItineraryAssets } from './assets';

export const tripAlbums = [
  {
    cover: dashboardAssets.bali,
    date: 'Oct 12 - Oct 20, 2024',
    href: '/albums/bali-spiritual-retreat',
    id: 'bali-spiritual-retreat',
    location: 'Bali, Indonesia',
    photoCount: 42,
    title: 'Bali Spiritual Retreat',
  },
  {
    cover: dashboardAssets.tokyo,
    date: 'Nov 05 - Nov 12, 2024',
    href: '/albums/tokyo-tech-expo',
    id: 'tokyo-tech-expo',
    location: 'Tokyo, Japan',
    photoCount: 28,
    title: 'Tokyo Tech Expo 2024',
  },
  {
    cover: tripItineraryAssets.hero,
    date: 'Oct 12 - Oct 20, 2024',
    href: '/albums/paris-loire',
    id: 'paris-loire',
    location: 'Paris & Loire, France',
    photoCount: 64,
    title: 'Autumn in Paris & Loire',
  },
] as const;

export const galleryImages = [
  {
    alt: 'Paris skyline at sunset',
    caption: 'Eiffel Tower from the evening walk',
    src: tripItineraryAssets.hero,
  },
  {
    alt: 'Cafe street in Paris',
    caption: 'Morning coffee near Rue de Rivoli',
    src: dashboardAssets.paris,
  },
  {
    alt: 'Trip member photo one',
    caption: 'Team photo after museum day',
    src: tripItineraryAssets.feed[0],
  },
  {
    alt: 'Trip member photo two',
    caption: 'Loire valley stop',
    src: tripItineraryAssets.feed[1],
  },
  {
    alt: 'Trip member photo three',
    caption: 'Dinner memories',
    src: tripItineraryAssets.feed[2],
  },
  {
    alt: 'Bali rice fields',
    caption: 'Reference album cover',
    src: dashboardAssets.bali,
  },
] as const;

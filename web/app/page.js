import RestaurantCard from '../components/RestaurantCard';
import HeroSection from '../components/HeroSection';
import ScrollReveal from '../components/ScrollReveal';
import RestaurantsSection from '../components/RestaurantsSection';
import { getRestaurants } from '../lib/api';

export default async function HomePage() {
  let restaurants = [];
  let error = null;

  try {
    restaurants = await getRestaurants();
  } catch (err) {
    error = err.message;
  }

  return (
    <>
      <HeroSection count={restaurants.length} />
      <RestaurantsSection restaurants={restaurants} error={error} />
    </>
  );
}

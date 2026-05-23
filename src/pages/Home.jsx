import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import BannerSlider from "../components/BannerSlider";
import Stats from "../components/Stats";
import Manufacturing from "../components/Manufacturing";
import AppBanner from "../components/Banner";
import LocationSection from "../components/LocationSection";
import Faqs from "../components/Faqs"; // ✅ सही नाम
import FeaturedProducts from "../components/FeaturedProduct";
import Industry from "../components/Industry";
import Testimonials from "../components/Testimoniols";
import TopMarqueeBar from "../components/TopMarqueeBar";
import PartnerLogin from "../components/PartnerLogin";

const Home = () => {
  return (
    <div>
      <HeroSection />

      <Categories />

      {/* 🔥 NEW SLIDER BANNER */}
      <BannerSlider />

      <Manufacturing />

      <AppBanner />

      <FeaturedProducts />

      <Stats />

      <TopMarqueeBar />

      <PartnerLogin />

      <Faqs />

      <LocationSection />

      <Industry />

      <Testimonials/>

    </div>
  );
};

export default Home;
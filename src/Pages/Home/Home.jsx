import React from 'react';
import HomeBanner from '../../Components/Banner/HomeBannner';
import LatestBooks from '../../Components/LatestBook/LatestBooks';
import Coverage from '../../Components/Coverage/Coverage';
import WhyChooseBookCourier from '../../Components/WhyChoose/WhyChooseBookCourier';
import HowItWorks from '../../Components/AnimatedSection/HowItWorks';
import TrustSection from '../../Components/AnimatedSection/TrustSection';
import StorySection from '../../Components/AnimatedSection/StorySection';

const Home = () => {
    return (
      <div>
        <HomeBanner />
        {/* Latest Books */}
        <LatestBooks></LatestBooks>
        <HowItWorks></HowItWorks>

        {/* Why Choose BookCourier */}
        <WhyChooseBookCourier></WhyChooseBookCourier>
        {/* Extra sections */}

        <TrustSection></TrustSection>
        {/* Coverage */}
        <Coverage></Coverage>
        <StorySection></StorySection>
      </div>
    );
};

export default Home;
import React from 'react';
import HomeBanner from '../../Components/Banner/HomeBannner';
import LatestBooks from '../../Components/LatestBook/LatestBooks';
import Coverage from '../../Components/Coverage/Coverage';

const Home = () => {
    return (
      <div>
        <HomeBanner />
        {/* Latest Books */}
        <LatestBooks></LatestBooks>
        {/* Coverage */}
        <Coverage></Coverage>
        {/* Why Choose BookCourier */}
        {/* Extra sections */}
      </div>
    );
};

export default Home;
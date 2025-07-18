import styles from '../css/directory-css/Home.module.scss';

import PlatformListing from '../component-builder/PlatformListing';
import MostPopularSection from '../component-builder/MostPopularSection';

function Home () {

    return (
        <main className={`${styles.main} wrapper`}>
            <PlatformListing />
            <MostPopularSection />
        </main>
    );
}

export default Home;

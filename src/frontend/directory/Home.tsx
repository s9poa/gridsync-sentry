import styles from '../css/directory-css/Home.module.scss';

import PlatformListing from '../component-builder/PlatformListing';

function Home () {

    return (
        <main className={`${styles.main} wrapper`}>
            <PlatformListing />
        </main>
    );
}

export default Home;

import styles from '../css/directory-css/Deals.module.scss';

import PlatformListing from '../component-builder/PlatformListing';

function Deals () {

    return (
        <main className={`${styles.main} wrapper`}>
            <PlatformListing />
        </main>
    );
}

export default Deals;

import styles from '../css/directory-css/Playstation.module.scss';

import PlatformListing from '../component-builder/PlatformListing';

function Playstation () {

    return (
        <main className={`${styles.main} wrapper`}>
            <PlatformListing />
        </main>
    );
}

export default Playstation;

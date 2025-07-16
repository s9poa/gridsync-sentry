import styles from '../css/directory-css/Games.module.scss';

import PlatformListing from '../component-builder/PlatformListing';

function Games () {

    return (
        <main className={`${styles.main} wrapper`}>
            <PlatformListing />
        </main>
    );
}

export default Games;

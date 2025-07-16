import styles from '../css/directory-css/Xbox.module.scss';

import PlatformListing from '../component-builder/PlatformListing';

function Xbox () {

    return (
        <main className={`${styles.main} wrapper`}>
            <PlatformListing />
        </main>
    );
}

export default Xbox;

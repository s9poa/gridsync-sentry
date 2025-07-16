import styles from '../css/directory-css/Pc.module.scss';

import PlatformListing from '../component-builder/PlatformListing';

function Pc () {

    return (
        <main className={`${styles.main} wrapper`}>
            <PlatformListing />
        </main>
    );
}

export default Pc;

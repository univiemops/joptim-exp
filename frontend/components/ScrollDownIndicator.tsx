import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from './ScrollDownIndicator.module.css'; // CSS file for styling

function ScrollDownIndicator() {
  const [isHidden, setIsHidden] = React.useState<boolean>(true);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.pageYOffset;
    setIsHidden(scrollPosition + windowHeight >= documentHeight);

  };

  React.useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isHidden) {
    return null;
  }

  return (
    <div className={styles.scroll_down_indicator}
      onClick={() => window.scrollBy(0, 400)}>
      < FontAwesomeIcon
        icon={faChevronDown}
      />
    </div >
  );
}

export default ScrollDownIndicator;

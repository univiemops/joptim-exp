import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from './ScrollDownIndicator.module.css'; // CSS file for styling

function ScrollDownIndicator() {
  const [isHidden, setIsHidden] = React.useState<boolean>(true);

  const handleScroll = () => {
    const computedStyle = getComputedStyle(document.documentElement);
    const fontSize = computedStyle.getPropertyValue('font-size');
    const fontSizeInPixels = parseFloat(fontSize);
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.pageYOffset;
    setIsHidden(scrollPosition + windowHeight >= documentHeight - fontSizeInPixels * 3);

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

  const scrollLength = document.documentElement.clientHeight * 0.8;
  return (
    <div className={styles.scroll_down_indicator}
      onClick={() => window.scrollBy(0, scrollLength)}>
      < FontAwesomeIcon
        icon={faChevronDown}
      />
    </div >
  );
}

export default ScrollDownIndicator;

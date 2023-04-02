import React, { useState } from 'react';
import styles from './styles/Card.module.css';

const Card = ({ imageSrc, altText, title, text, onClick, isSelected }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ borderColor: isHovered ? '#FFA500' : 'transparent' }}
    >
      <img src={imageSrc} alt={altText} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Card;

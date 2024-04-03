import React from 'react';
import styles from './ImageBox.module.css'

export default function ImageBox(props: {
  src: string,
}) {
  return (
    <div className={styles['image-box']}>
      <img src={props.src} />
    </div>
  );
}



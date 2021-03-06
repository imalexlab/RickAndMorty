import cx from 'classnames';
import React, { useCallback, useState } from 'react';

import Episode from '../Episode';
import CharacterInt from './Character.types';
import styles from './CharacterCard.module.css';

interface Props {
  data: CharacterInt;
  fetchBySpecies: (type: string) => void;
  recommended?: boolean;
}

export default function CharacterCard({
  data,
  fetchBySpecies,
  recommended = false,
}: Props) {
  const [episodeURL, setEpisodeURL] = useState('');

  function showEpisode(url: string) {
    setEpisodeURL(url);
  }

  const clearEpisode = useCallback(() => {
    setEpisodeURL('');
  }, []);

  return (
    <div className={cx(styles.wrapper, { [styles.recommended]: recommended })}>
      <img src={data.image} alt={data.name} className={styles.image} />
      <p className={styles.name}>{data.name}</p>
      <div>
        <div
          className={styles.species}
          onClick={() => fetchBySpecies(data.species)}
        >
          <p className={styles.title}>Species:</p>
          <p>&nbsp;{data.species}</p>
        </div>
        <p className={styles.title}>Episodes:</p>
        <div className={styles.episode_wrapper}>
          {data.episode.map((episode, i) => (
            <p
              key={i}
              onPointerEnter={() => showEpisode(episode)}
              onPointerLeave={clearEpisode}
              className={styles.episode}
            >
              {episode.match(/\d*/gm)}
            </p>
          ))}
          {episodeURL && <Episode url={episodeURL} />}
        </div>
      </div>
    </div>
  );
}

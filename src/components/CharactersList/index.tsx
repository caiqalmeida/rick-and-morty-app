import loadingImg from '../../assets/loading.gif';
import { Character } from "../../types/ram-api";
import { CharacterCard } from "./CharacterCard";
import classes from './index.module.scss';

interface CharactersListProps {
  isLoadingCharacters: boolean;
  characters: [Character[]] | [];
  currentPage: number;
}

export function CharactersList ({isLoadingCharacters, characters, currentPage} : CharactersListProps) {
  if(isLoadingCharacters) {
    return (
      <div className={classes['loading-character-list']}>
        <img src={loadingImg} alt="Loading characters"/>
      </div>
    )
  }
  return (
    <main className={classes['character-list']}>
      {characters[currentPage]?.map(character => {
        return <CharacterCard key={character.id} character={character} />
      })}
    </main>
  )
}
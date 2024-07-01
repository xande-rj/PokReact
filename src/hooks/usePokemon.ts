import { useState, useEffect } from "react";
import { db } from "../firebase";
import { arrayUnion, arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
interface PokemonData {
  name: string;
  sprite: string;
}
export const usePokemon = (userId: string) => {
  const [docSnaps, setDocSnaps] = useState<string[]>([]);
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

  useEffect(() => {
    if (userId) {
      getDocFireStore();
    }
  }, [userId]);

  const getDocFireStore = async () => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const pokemonNames = docSnap.data().pokemon || [];
      setDocSnaps(pokemonNames);
      fetchPokemonData(pokemonNames);
    } else {
      console.log("No such document!");
    }
  };

  const fetchPokemonData = async (pokemonNames: string[]) => {
    const promises = pokemonNames.map(async (name) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      return { name: data.name, sprite: data.sprites.front_default };
    });

    const results = await Promise.all(promises);
    setPokemonData(results);
  };

  const addPokemon = async (dadosNome: string) => {
    if (userId) {
      try {
        await updateDoc(doc(db, "users", userId), {
          pokemon: arrayUnion(dadosNome),
        });
        getDocFireStore();
      } catch (error) {
        console.error("Error updating user pokemon:", error);
      }
    }
  };

  const removePokemon = async (dadosNome: string) => {
    if (userId) {
      try {
        await updateDoc(doc(db, "users", userId), {
          pokemon: arrayRemove(dadosNome),
        });
        getDocFireStore();
      } catch (error) {
        console.error("Error removing user pokemon:", error);
      }
    }
  };

  return { docSnaps, pokemonData, addPokemon, removePokemon };
};
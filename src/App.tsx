import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import { Participant } from './types/Participant';
import AllNamesHaveBeenPicked from './Main/AllNamesHaveBeenPicked';
import ChooseName from './Main/ChooseName';
import PickedName from './Main/PickedName';
import Snowfall from 'react-snowfall';
import { mockNames } from './mockNames';

document.title = "Tirage du Père Noël"

function handleNetworkError(err: Error) {
  alert("Le père noël a rencontré un problème et il semble très fatigué, réessaie plus tard !")
}

export default function App() {
  const [name, setName] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [picked, setPicked] = useState<Participant | null>(null);

  function handleNameChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setName(e.target.value)
  }

  async function handleSubmit() {
    try {
      const res = await axios.post("/pick", { name });

      if (res && res.data)
        setPicked(res.data);

    } catch (error) {
      handleNetworkError(error)
    }
  }

  async function fetchNames() {
    try {
      setNames(mockNames);
    } catch (error) {
      handleNetworkError(error)
    }
  }

  useEffect(() => { fetchNames() }, []);

  return (
    <div style={styles.container}>
      <Snowfall color='#fff' />
      {names.length > 0 && <ChooseName names={names} onNameChange={handleNameChange} onSubmit={handleSubmit} />}
      {picked && <PickedName picked={picked} />}
      {names === null && <AllNamesHaveBeenPicked />}
    </div>
  )
}

const styles = {
  container: {
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column" as any,
    alignItems: "space-around",
    width: window.innerWidth < 500 ? "100%" : "70%",
    margin: "0 auto",
    backgroundColor: "#fff",
    height: '100vh',
  },
}
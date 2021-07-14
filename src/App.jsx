import { useContext, useState } from 'react';
import { Context } from './context/Context';
import { Masonry } from './components/masonry/Masonry';
import { Topbar } from './components/topbar/Topbar';
import { Bouncing } from './components/atoms/bouncing-three-dots-animation/Bouncing';

function App() {
// const {user} = useContext(Context)
  const [search, setSearch] = useState('')
  return (
    <div className="App">
      <Topbar setSearch={setSearch }/>
      <Bouncing size={20} backgroundColor={"black"} color={"white"}/>

      <Masonry search={search}/>
      

    </div>
  );

}

export default App;

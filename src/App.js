import Notes from './componets/Notes'
import AddNote from './componets/AddNote';
import UpdateNotes from './componets/UpdateNotes';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Notes />} />
        <Route path='/addNote' element={<AddNote />} />
        <Route path='/updateNotes' element={<UpdateNotes />} />
      </Routes>
    </div>
  );
}

export default App;
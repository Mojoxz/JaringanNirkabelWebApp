import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import References from './pages/References';
import Materials from './pages/Materials';
import Quiz from './pages/Quiz';
import Creator from './pages/Creator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="referensi" element={<References />} />
          <Route path="materi" element={<Materials />} />
          <Route path="soal" element={<Quiz />} />
          <Route path="pembuat" element={<Creator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

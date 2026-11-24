import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { UserProvider } from './Contexts/UserProvider';
import ProtectedRoute from './ProtectedRoute';
import { CONSTANTS } from './constants';
import Home from './Pages/Home';

const FAQ = lazy(() => import('./Pages/FAQ'));
const Contatti = lazy(() => import('./Pages/Contatti'));
const ChiSiamo = lazy(() => import('./Pages/ChiSiamo'));
const MappaRealTime = lazy(() => import('./Pages/MappaRealTime'));
const Pet = lazy(() => import('./Pages/Pet'));
const ListaPazienti = lazy(() => import('./Pages/ListaPazienti'));
const DettagliPet = lazy(() => import('./Pages/DettagliPet'));
const RegisterPet = lazy(() => import('./Pages/RegisterPet'));
const AnalisiDermatologica = lazy(() => import('./Pages/AnalisiDermatologica'));
const InsertLinkingCode = lazy(() => import('./Pages/InsertLinkingCode'));
const ProfiloProprietario = lazy(() => import('./Pages/ProfiloProprietario'));
const DettagliPaziente = lazy(() => import('./Pages/DettagliPaziente'));
const ElencoVet = lazy(() => import('./Pages/ElencoVet'));
const DettagliVeterinario = lazy(() => import('./Pages/DettagliVeterinario'));
const Unauthorized = lazy(() => import('./Pages/Unauthorized'));
const Page404 = lazy(() => import('./Pages/Page404'));

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }} aria-busy="true">Caricamento...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contatti />} />
            <Route path="/about" element={<ChiSiamo />} />
            <Route path="/mappa" element={<MappaRealTime />} />

            <Route
              path="/pet"
              element={
                <ProtectedRoute allowedRoles={[CONSTANTS.ROLE.PROPRIETARIO]}>
                  <Pet />
                </ProtectedRoute>
              }
            />

            <Route
              path="/pazienti"
              element={
                <ProtectedRoute allowedRoles={[CONSTANTS.ROLE.VETERINARIO]}>
                  <ListaPazienti />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dettaglioPet/:id"
              element={
                <ProtectedRoute allowedRoles={[CONSTANTS.ROLE.PROPRIETARIO]}>
                  <DettagliPet />
                </ProtectedRoute>
              }
            />

            <Route
              path="/registerpet"
              element={
                <ProtectedRoute allowedRoles={[CONSTANTS.ROLE.PROPRIETARIO]}>
                  <RegisterPet />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analisiDermatologica"
              element={
                <ProtectedRoute allowedRoles={[CONSTANTS.ROLE.PROPRIETARIO]}>
                  <AnalisiDermatologica />
                </ProtectedRoute>
              }
            />

            <Route
              path="/aggiuntaPaziente"
              element={
                <ProtectedRoute allowedRoles={[CONSTANTS.ROLE.VETERINARIO]}>
                  <InsertLinkingCode />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profilo-proprietario"
              element={
                <ProtectedRoute allowedRoles={[CONSTANTS.ROLE.PROPRIETARIO]}>
                  <ProfiloProprietario />
                </ProtectedRoute>
              }
            />

            <Route
              path="/DettagliPaziente/:id"
              element={
                <ProtectedRoute allowedRoles={[CONSTANTS.ROLE.VETERINARIO]}>
                  <DettagliPaziente />
                </ProtectedRoute>
              }
            />

            <Route path="/ElencoVet" element={<ElencoVet />} />
            <Route path="/veterinario/:id" element={<DettagliVeterinario />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

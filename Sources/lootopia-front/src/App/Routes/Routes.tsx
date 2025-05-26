import Loader, { MODES } from '@/shared/Loader';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTE_URLS from './constants';

const Home = lazy(() => import('@/pages/Home'));
const Auth = lazy(() => import('@/pages/Auth'));

const RouteCmpt = () => (
  <Suspense fallback={<Loader message="Chargement de la page..." mode={MODES.get} />}>
    <Routes>
      <Route index path={ROUTE_URLS.HOME} element={<Home />} />
      <Route path={ROUTE_URLS.AUTH} element={<Auth />} />
    </Routes>
  </Suspense>
);

export default RouteCmpt;

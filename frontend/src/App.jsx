import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import CameraPage from './components/CameraPage';
import WelcomePage from './components/WelcomePage';
import InteractivePage from './components/InteractivePage';
import RegularPage from './components/Regular';
import Navbar from './components/Navbar'
import PostFeed from './components/Feed';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          {/* <Route path="/image" element={<CameraPage />} /> */}
          <Route path="/interactive" element={<InteractivePage />} />
          <Route path="/regular" element={<WelcomePage />} />
          <Route path="/regularPage" element={<RegularPage />} />
          <Route path="/feed" element={<PostFeed />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

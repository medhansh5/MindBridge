import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { PostForm } from './components/Posts/PostForm';
import { PostList } from './components/Posts/PostList';
import { ResourceLibrary } from './components/Resources/ResourceLibrary';
import { SOSBanner } from './components/SOS/SOSBanner';
import { SOSModal } from './components/SOS/SOSModal';
import { PeerMatchCard } from './components/PeerMatch/PeerMatchCard';
import { PeerMatchModal } from './components/PeerMatch/PeerMatchModal';
import { ToastContainer } from './components/UI/Toast';
import { usePosts } from './hooks/usePosts';
import { useToast, ToastProvider } from './hooks/useToast';
import * as api from './api/client';

const AppContent = () => {
  const [currentView, setCurrentView] = useState('feed'); // 'feed' | 'resources'
  const [showSOS, setShowSOS] = useState(false);
  
  // Peer Match State
  const [availableListeners, setAvailableListeners] = useState(0);
  const [peerLoading, setPeerLoading] = useState(null); // 'requesting' | 'volunteering' | null
  const [isVolunteering, setIsVolunteering] = useState(false);
  const [matchResult, setMatchResult] = useState(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  
  // Stable sessionId for volunteering (persists across renders)
  const sessionIdRef = useRef(crypto.randomUUID ? crypto.randomUUID() : Date.now().toString() + Math.random().toString(36).slice(2));

  const { posts, loading: postsLoading, error: postsError, createPost, deletePost, likePost, refreshPosts } = usePosts();
  const { addToast } = useToast();

  useEffect(() => {
    // Poll available listeners
    const fetchListeners = async () => {
      try {
        const { data } = await api.getAvailableListeners();
        setAvailableListeners(data.count);
      } catch (err) {
        // fail silently
      }
    };
    fetchListeners();
    const interval = setInterval(fetchListeners, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRequestMatch = async () => {
    try {
      setPeerLoading('requesting');
      const { data } = await api.requestPeerMatch();
      if (data.matched) {
        setMatchResult(data);
        setShowMatchModal(true);
        addToast('Match found successfully!', 'success');
      } else {
        addToast('No listeners available right now. Please try again later.', 'info');
      }
    } catch (err) {
      addToast('Failed to find a match. Please try again.', 'error');
    } finally {
      setPeerLoading(null);
    }
  };

  const handleVolunteer = async () => {
    try {
      setPeerLoading('volunteering');
      await api.volunteerAsListener(sessionIdRef.current);
      setIsVolunteering(true);
      addToast('You are now listed as an available listener. Thank you!', 'success');
    } catch (err) {
      addToast('Failed to volunteer. Please try again.', 'error');
    } finally {
      setPeerLoading(null);
    }
  };

  const handleStopVolunteering = async () => {
    try {
      setPeerLoading('volunteering');
      await api.removeVolunteer(sessionIdRef.current);
      setIsVolunteering(false);
      addToast('You are no longer listed as a listener.', 'info');
    } catch (err) {
      addToast('Failed to update status.', 'error');
    } finally {
      setPeerLoading(null);
    }
  };

  return (
    <div className="app">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        onOpenSOS={() => setShowSOS(true)} 
      />
      
      <main className="main">
        {currentView === 'feed' ? (
          <>
            <PeerMatchCard
              availableCount={availableListeners}
              onRequestMatch={handleRequestMatch}
              onVolunteer={handleVolunteer}
              isVolunteering={isVolunteering}
              onStopVolunteering={handleStopVolunteering}
              matchResult={matchResult}
              loading={peerLoading}
            />
            
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ marginBottom: '1rem' }}>Community Feed</h2>
              <PostForm onSubmit={createPost} />
              <PostList 
                posts={posts} 
                loading={postsLoading} 
                error={postsError} 
                onLike={likePost} 
                onDelete={deletePost}
                onRetry={refreshPosts}
              />
            </div>
          </>
        ) : (
          <div>
            <h2 style={{ marginBottom: '0.5rem' }}>Resource Library</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
              Explore curated strategies, tips, and guides for mental wellness.
            </p>
            <ResourceLibrary />
          </div>
        )}
      </main>

      <Footer />
      
      <SOSBanner onOpenSOS={() => setShowSOS(true)} />
      <SOSModal isOpen={showSOS} onClose={() => setShowSOS(false)} />
      
      <PeerMatchModal 
        isOpen={showMatchModal} 
        onClose={() => setShowMatchModal(false)} 
        matchResult={matchResult} 
      />
      
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

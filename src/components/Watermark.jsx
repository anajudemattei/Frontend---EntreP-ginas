export default function Watermark() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Logo central */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
        <svg
          width="400"
          height="400"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-primary"
        >
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      </div>
      
      {/* Logos pequenas espalhadas */}
      <div className="absolute top-20 left-20 opacity-[0.01] rotate-12">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-secondary">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-32 right-24 opacity-[0.01] -rotate-12">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      </div>
      
      <div className="absolute top-40 right-32 opacity-[0.01] rotate-45">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor" className="text-warning">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-20 left-32 opacity-[0.01] -rotate-45">
        <svg width="70" height="70" viewBox="0 0 24 24" fill="currentColor" className="text-secondary">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      </div>
    </div>
  );
}

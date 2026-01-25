import React, { useState } from "react";
import PublicExplore from "../components/PublicExplore";
import RequestModal from "../components/RequestModal";

export default function Explore() {
  const [showRequestPopup, setShowRequestPopup] = useState(false);

  return (
    <div className="p-4">
      <PublicExplore
        isPublic={false} // dashboard mode
        onOpenRequest={() => setShowRequestPopup(true)} 
      />

      {/* Request Book popup */}
      {showRequestPopup && (
        <RequestModal 
          onClose={() => setShowRequestPopup(false)} 
         />
      )}
    </div>
  );
}

import { useState } from "react";

function AdminDetailsModal({ admin, isOpen, onClose }) {
  const [imageError, setImageError] = useState(false);
  
  if (!isOpen || !admin) return null;

  // Handle responsibilities - split by # if exists and render as list
  const renderResponsibilities = () => {
    if (!admin.responsibilities) return <span className="text-gray-500 italic">No responsibilities listed</span>;
    
    const responsibilities = admin.responsibilities.split("#").filter(item => item.trim());
    
    if (responsibilities.length === 0) return <span className="text-gray-500 italic">No responsibilities listed</span>;
    
    return (
      <ul className="list-disc ml-5 space-y-1 mt-1">
        {responsibilities.map((item, index) => (
          <li key={index} className="text-gray-700">{item.trim()}</li>
        ))}
      </ul>
    );
  };

  // Social media links from contact object
  const renderSocialLinks = () => {
    if (!admin.contact) return <span className="text-gray-500 italic">No contact information available</span>;
    
    const socialLinks = [
      { name: "WhatsApp", value: admin.contact.whatsapp },
      { name: "Facebook", value: admin.contact.facebook },
      { name: "YouTube", value: admin.contact.youtube }
    ].filter(link => link.value);
    
    if (socialLinks.length === 0) return <span className="text-gray-500 italic">No social media links available</span>;
    
    return (
      <div className="flex flex-wrap gap-2 mt-1">
        {socialLinks.map((link, index) => (
          <a 
            key={index}
            href={link.value}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-auto mx-auto shadow-2xl transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header section with close button */}
        <div className="bg-blue-600 px-6 py-4 rounded-t-2xl flex justify-between items-center">
          <h2 className="font-bold text-2xl text-white">Admin Member Details</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content section */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Admin image */}
            <div className="md:w-1/3 flex-shrink-0">
              {admin.image && !imageError ? (
                <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md">
                  <img
                    className="w-full h-auto object-cover aspect-square"
                    src={`https://api.oouweb.site/public/uploads/${admin.image}`}
                    alt={`${admin.name}'s profile`}
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md flex items-center justify-center aspect-square">
                  <div className="text-6xl font-bold text-gray-300">
                    {admin.name?.charAt(0) || "?"}
                  </div>
                </div>
              )}
            </div>
            
            {/* Admin details */}
            <div className="md:w-2/3 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{admin.name || "Unknown Name"}</h3>
                <p className="text-blue-600 font-medium">{admin.designation || "No Designation"}</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 border-b pb-1 mb-2">Biography</h4>
                  <p className="text-gray-700">{admin.biography || <span className="text-gray-500 italic">No biography available</span>}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 border-b pb-1 mb-2">Responsibilities</h4>
                  {renderResponsibilities()}
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 border-b pb-1 mb-2">Contact Information</h4>
                  {renderSocialLinks()}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer section */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDetailsModal;
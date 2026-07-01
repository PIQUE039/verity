import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ListingCard = ({ item }) => {
  const { savedListings, toggleSaved, token } = useAuth();
  
  const isSaved = savedListings.some(
    id => id.toString() === item._id.toString()
  );

  return (
    <Link to={`/listing/${item._id}`} className="group">
      <div className="bg-white border border-slate-200 rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative">
        
        {/* IMAGE AREA */}
        <div className="w-full h-44 bg-slate-100 flex items-center justify-center text-slate-400 relative">
          {item.image ? (
            <img src={item.image} alt={item.title} className="w-full h-full object-cover"/>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold uppercase text-xs">No Photo</div>
          )}

          {/* HEART BUTTON — only show if logged in */}
          {token && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault(); // stops Link navigation too
                toggleSaved(item._id);
              }}
              className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
            >
              {isSaved ? '❤️' : '🤍'}
            </button>
          )}
        </div>

        {/* DETAILS AREA */}
        <div className="p-3 border-l-4 border-l-transparent group-hover:border-l-cyan-900 transition-all">
          <h3 className="text-xl font-bold text-slate-800">
            ₹ {item.price.toLocaleString('en-IN')}
          </h3>
          <p className="text-slate-600 text-sm truncate mt-1">
            {item.title}
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">
              {item.category}
            </span>
            <span className="text-[10px] text-slate-400">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
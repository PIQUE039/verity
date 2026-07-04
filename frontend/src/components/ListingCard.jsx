import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ListingCard = ({ item }) => {
  const { savedListings, toggleSaved, token } = useAuth();

  const isSaved = savedListings.some(
    id => id.toString() === item._id.toString()
  );

  return (
    <Link to={`/listing/${item._id}`} className="group block">
      <div className="bg-surface-card rounded-xl border border-surface-muted overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 relative">

        {/* IMAGE */}
        <div className="w-full h-36 bg-surface-muted relative overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted text-xs font-semibold uppercase tracking-widest">
              No Photo
            </div>
          )}

          {/* HEART */}
          {token && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleSaved(item._id);
              }}
              className="absolute top-2 right-2 bg-surface-card rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
            >
              {isSaved ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-brand-accent">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.218l-.022.012-.007.003-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-text-muted">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* DETAILS */}
        <div className="p-3">
          <p className="text-lg font-bold text-text-primary leading-tight">
            ₹ {item.price.toLocaleString('en-IN')}
          </p>
          <p className="text-sm text-text-secondary truncate mt-0.5">
            {item.title}
          </p>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-surface-muted">
            <span className="text-[10px] text-text-muted uppercase font-semibold tracking-wide">
              {item.category}
            </span>
            <span className="text-[10px] text-text-muted">
              {new Date(item.createdAt).toLocaleDateString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
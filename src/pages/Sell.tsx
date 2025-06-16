
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Sell = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the post-vehicle page
    navigate('/post-vehicle', { replace: true });
  }, [navigate]);

  return null;
};

export default Sell;

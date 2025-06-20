import { useNavigate } from 'react-router-dom';

const useRedirect = () => {
  const navigate = useNavigate();
  const goTo = (path, options = {}) => {
    console.log(`🔁 Перехід до: ${path}`);
    navigate(path, options);
  };
  return goTo;
};

export default useRedirect;

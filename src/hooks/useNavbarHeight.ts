import { useEffect, useState } from 'react';

const useNavbarHeight = (fallback = 88) => {
  const [height, setHeight] = useState(fallback);

  useEffect(() => {
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;

    const update = () => setHeight(navbar.offsetHeight);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(navbar);
    return () => observer.disconnect();
  }, []);

  return height;
};

export default useNavbarHeight;

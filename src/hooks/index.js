import { useState, useEffect, useContext } from 'react';

export const useMousePosition = (defaultPosition = [0, 0]) => {
	const [position, setPosition] = useState(defaultPosition);
	useEffect(() => {
		const handleMouseMove = event => setPosition([event.clientX, event.clientY]);
		window.addEventListener('mousemove', handleMouseMove, false);
		return () => window.removeEventListener('mousemove', handleMouseMove, false);
	}, []);
	return position;
}

export const useWindowSize = () => {
	const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
	useEffect(() => {
		const handleWindowResize = event => {
			setSize([window.innerWidth, window.innerHeight]);
		};
		window.addEventListener('resize', handleWindowResize);
		return () => window.removeEventListener('resize', handleWindowResize);
	}, []);
	return size;
}

export const useCoordinate = defaultPosition => {
	const [width, height] = useWindowSize();
	const [originX, originY, totalX, totalY] = [width / 2, height / 2, width / 2, height / 2];

	const [mouseX, mouseY] = useMousePosition([originX, originY])
	const [positionX, positionY] = [mouseX - originX, mouseY - originY];
	const [scaleX, scaleY] = [Math.min(positionX / totalX, 1), Math.min(positionY / totalY, 1)];

	return {
		position: [positionX, positionY],
		total: [totalX, totalY],
		scale: [scaleX, scaleY]
	};
}

export const usePerspective = (range = 10) => {
	const [scaleX, scaleY] = useCoordinate().scale;
	const [x, y] = [scaleX * range, -scaleY * range];
	const styles = {
		frame: {
			transform: `rotateX(${y}deg) rotateY(${x}deg)`
		},
		image: {
			transform: `translateX(${-x * 1.5}px) translateY(${y * 1.5}px)`
		},
		background: {
			backgroundPosition: `${-x * 2.5}px ${y * 2.5}px`
		}
	};
	return styles;
}

export const useToggle = (firstValue, secondValue) => {
	const [value, setValue] = useState(firstValue);
	const toggle = () => {
		if (value === firstValue) return setValue(secondValue);
		if (value === secondValue) return setValue(firstValue);
	}
	return [value, toggle];
}

export const useDoducmentTitle = title => {
	useEffect(() => {
    document.title = title;
  }, [title]);
}

export const useI18n = (obj, I18nContext) => {
	if (!obj || !obj.i18n) return obj;
	const locale = useContext(I18nContext);
	const target = obj.i18n[locale.toUpperCase()];
	return { ...obj, ...target };
}

export const useHash = () => {
	const [hash, setHash] = useState(window.location.hash.slice(1));
	useEffect(() => {
		const handleHashChange = () => setHash(window.location.hash.slice(1));
		window.addEventListener('hashchange', handleHashChange);
		return () => window.removeEventListener('hashchange', handleHashChange);
	}, []);
	return hash;
}

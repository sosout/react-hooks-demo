import React, { useState, useEffect, useContext } from 'react'
import I18nContext from '../context/I18n'

export default function Card({ data }) {
	const context = useContext(I18nContext);
	const type = context === 'cn' ? data.i18n.CN.type : data.type;
	const title = context === 'cn' ? data.i18n.CN.title : data.title;
	const tips = context === 'cn' ? data.i18n.CN.tips : data.tips;
	const list = data.list;
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [[x, y], setXY] = useState([0, 0]);
	const range = 20;

	useEffect(() => {
		const handleWindowResize = () => setWindowWidth(window.innerWidth)
		window.addEventListener('resize', handleWindowResize)
		return () => window.removeEventListener('resize', handleWindowResize)
	}, []);

	useEffect(() => {
		const handleMouseMove = event => {
			const [width, height]  = [window.innerWidth, window.innerHeight];
			const [originX, originY, totalX, totalY] = [width / 2, height / 2, width / 2, height / 2];

			const [mouseX, mouseY]  = [event.clientX, event.clientY];
			const [positionX, positionY] = [mouseX - originX, mouseY - originY];
			const [x, y] = [Math.min(positionX / totalX, 1) * range, -Math.min(positionY / totalY, 1) * range];

			setXY([x, y])
		}
		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])

	useEffect(() => {
		document.title = type + ': ' + title
	})

	const frameStyle = {
		transform: `rotateX(${y}deg) rotateY(${x}deg)`
	}
	const imageStyle = {
		transform: `translateX(${-x * 1.5}px) translateY(${y * 1.5}px)`
	}
	const backgroundStyle = {
		backgroundPosition: `${-x * 2.5}px ${y * 2.5}px`
	}

	return (
		<React.Fragment>
			<div className="cards" style={frameStyle}>
				<h3>{type}</h3>
				<h1>{title}</h1>
				{list.map(item => {
					return (
						<CardItem
							key={item.name}
							data={item}
							i18n={context}
							styles={{ image: imageStyle, background: backgroundStyle }}
						/>
					)
				})}
			</div>
			<span className="notice">
				{tips}: {windowWidth}
			</span>
		</React.Fragment>
	)
}

const CardItem = ({ data, i18n, styles }) => {
	let name = i18n === 'cn' ? data.i18n.CN.name : data.name
	let image = data.image
	let imageStyle = data.imageStyle
	let background = data.background
	return (
		<div className="card">
			<div
				style={{
					...styles.background,
					backgroundImage: `url(${background})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat'
				}}
				className="card__bg"
			/>
			<img
				className="card__img"
				style={{ ...imageStyle, ...styles.image }}
				src={image}
				alt={name}
				title={name}
			/>
			<div className="card__text">
				<p className="card__title">{name}</p>
			</div>
		</div>
	)
}

import React from 'react';
import I18nContext from '../context/I18n';

export default class Card extends React.Component {
	static contextType = I18nContext

	state = {
		windowWidth: window.innerWidth,
		x: 0,
		y: 0,
		range: 20
	}

	updateTitle() {
		const _this = this;
		const { data } = _this.props;
		const type = _this.context === 'cn' ? data.i18n.CN.type : data.type;
		const title = _this.context === 'cn' ? data.i18n.CN.title : data.title;
		document.title = type + ': ' + title;
	}

	handleWindowResize = () => {
		const _this = this;
		_this.setState({
			windowWidth: window.innerWidth
		})
	}

	handleMouseMove = event => {
		const _this = this;
		const [width, height]  = [window.innerWidth, window.innerHeight];
		const [originX, originY, totalX, totalY] = [width / 2, height / 2, width / 2, height / 2];

		const [mouseX, mouseY]  = [event.clientX, event.clientY];
		const [positionX, positionY] = [mouseX - originX, mouseY - originY];
		const { range } = _this.state;
		const [x, y] = [Math.min(positionX / totalX, 1) * range, -Math.min(positionY / totalY, 1) * range];

		_this.setState({
			x,
			y
		})
	}

	componentDidMount() {
		const _this = this;
		_this.updateTitle();
		window.addEventListener('resize', _this.handleWindowResize);
		window.addEventListener('mousemove', _this.handleMouseMove);
	}

	componentWillUnmount() {
		const _this = this;
		window.removeEventListener('resize', _this.handleWindowResize);
		window.removeEventListener('mousemove', _this.handleMouseMove);
	}

	componentDidUpdate() {
		this.updateTitle();
	}

	render() {
		const _this = this;
		const { data } = _this.props;
		const type = _this.context === 'cn' ? data.i18n.CN.type : data.type;
		const title = _this.context === 'cn' ? data.i18n.CN.title : data.title;
		const tips = _this.context === 'cn' ? data.i18n.CN.tips : data.tips;
		const list = data.list;
		const { x, y, windowWidth } = _this.state;
		const frameStyle = {
			transform: `rotateX(${y}deg) rotateY(${x}deg)`
		};
		const imageStyle = {
			transform: `translateX(${-x * 1.5}px) translateY(${y * 1.5}px)`
		};
		const backgroundStyle = {
			backgroundPosition: `${-x * 2.5}px ${y * 2.5}px`
    };
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
								i18n={_this.context}
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
}

const CardItem = ({ data, i18n, styles }) => {
	const name = i18n === 'cn' ? data.i18n.CN.name : data.name;
	const [image, imageStyle, background] = [data.image, data.imageStyle, data.background];
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
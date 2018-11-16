import React from 'react';
import ReactDOM from 'react-dom';
import I18nContext from './context/I18n';
import data from './mock/data';
import './index.css';
import './style/card.css';
import CustomHookCard from './customHook/Card';
import { useToggle, useI18n, useHash } from './customHook/Hooks';
import ClassCard from './class/Card';
import HookCard from './hook/Card';

import registerServiceWorker from './registerServiceWorker';

const Components = {
	class: ClassCard,
	hook: HookCard,
	custom: CustomHookCard
}

const App = ({ data }) => {
	let style = useHash()
	let TargetCard = Components[style] || CustomHookCard
	let [locale, toggleLocale] = useToggle(...data.locales)
	console.log('style', style)
	return (
		<React.Fragment>
			<I18nContext.Provider value={locale}>
				<Local data={data} toggle={toggleLocale} />
				<TargetCard data={data} />
			</I18nContext.Provider>
		</React.Fragment>
	)
}

const Local = ({ data, toggle }) => {
	let { locale } = useI18n(data, I18nContext)
	return (
		<div className="twitter__link" onClick={toggle}>
			{locale}
		</div>
	)
}

ReactDOM.render(<App data={data} />, document.getElementById('root'));

registerServiceWorker();

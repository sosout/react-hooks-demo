import React from 'react';
import ReactDOM from 'react-dom';
import I18nContext from './context/I18n';
import data from './mock/data';
import './style/card.css';
import CustomHookCard from './container/CardByCustomHook';
import { useToggle, useI18n, useHash } from './hooks';
import ClassCard from './container/CardByClass';
import HookCard from './container/CardByHook';

import registerServiceWorker from './registerServiceWorker';

const Components = {
	class: ClassCard,
	hook: HookCard,
	custom: CustomHookCard
};

const App = ({ data }) => {
	let style = useHash();
	let TargetCard = Components[style] || CustomHookCard
	let [locale, toggleLocale] = useToggle(...data.locales)
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
    <React.Fragment>
      <ul className="commponent__style">
        <li><a href="#class">class</a></li>
        <li><a href="#hook">hook</a></li>
        <li><a href="#custom">custom hook</a></li>
      </ul>
      <div className="twitter__link" onClick={toggle}>
        {locale}
      </div>
    </React.Fragment>
	)
}

ReactDOM.render(<App data={data} />, document.getElementById('root'));

registerServiceWorker();

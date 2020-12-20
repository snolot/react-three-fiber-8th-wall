import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import Component from './Experience';

const onComplete = (action, result) => {
    console.log('onComplete has been triggered');
    console.log('action =', action);
    console.log('result =', result);
    alert('Check your logs!');
}

const ComponentWrapper = (componentProps) => {
    
   	if (!componentProps) {
        return null;
    }

    return (
        <Component
            {...componentProps}
        />
    );
};

const initComponent = async () => {
    const fetchData = await fetch('config.json');
    const componentProps = await fetchData.json();

    ReactDOM.render(
        <ComponentWrapper
            onComplete={onComplete}
            {...componentProps}
        />,	
        document.querySelector('#root'),
    );
};

initComponent();

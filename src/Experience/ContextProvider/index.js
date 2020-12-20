import React, { createContext, useCallback } from 'react';

export const Context = createContext(null);

export default function ContextProvider ({children, ...props})  {
	const [ctx, setCtx] = React.useState({});

    const updateCtx = useCallback((newCtx) => {
        setCtx((oldCtx) => ({ ...oldCtx, ...newCtx }));
    }, [setCtx]);

    return (
	    <Context.Provider value={{
	            ...ctx,
	            ...props,
	            updateCtx,            
	        }}>
            {React.cloneElement(children, {
                ...ctx,
                ...props,
                updateCtx,                
            })}
	    </Context.Provider>
	);
}

export function withContext(Experience) {
    function WrappedExperience({...props }) {
        return (
            <ContextProvider {...props}>
                <Experience />
            </ContextProvider>
        );
    }

    return WrappedExperience;
}
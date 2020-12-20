export default {
    'html, body': {
        margin: 0,
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'hidden',
        WebkitOaverflowScrolling: 'touch',

    },
    '#root': {
        height: '100%',
        width: '100%',
    },
    body: {
        fontFamily: 'sans-serif',
    },
    '*, *:before, *:after': {
        boxSizing: 'border-box',
    },
    '::-webkit-inner-spin-button': {
        display: 'none',
    },
    '::-webkit-calendar-picker-indicator': {
        background: 'none',
        color: 'transparent',
    },
    button: {
        ':focus': {
            border: 'none',
            outline: 0,
            boxShadow: 'none',
        },
    },
};

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * Render all children components in another element in the DOM
 */
class PortalModal extends React.Component {
    constructor(props) {
        super(props);
        const { rootElementType } = props;
        this.el = document.createElement(rootElementType);
    }

    componentDidMount() {
        const { rootElement } = this.props;
        rootElement.append(this.el);
    }

    componentWillUnmount() {
        const { rootElement } = this.props;
        rootElement.removeChild(this.el);
    }

    render() {
        const { children } = this.props;
        return ReactDOM.createPortal(
            children,
            this.el,
        );
    }
}

PortalModal.propTypes = {
    rootElement: PropTypes.instanceOf(Element),
    rootElementType: PropTypes.string,
    children: PropTypes.node.isRequired,
};

PortalModal.defaultProps = {
    rootElement: document.querySelector('body'),
    rootElementType: 'div',
};

export default PortalModal;

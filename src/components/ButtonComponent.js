import React from 'react';

class ButtonComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            function: this.props.function,
        }
    }

    render() {
        return(
            <div>
                <button onClick={() => this.state.function()}
                        className={"button"}>
                    {this.state.name}
                </button>
            </div>
        )
    }
}

export default ButtonComponent

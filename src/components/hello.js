import React from"react";
class Hello extends React.Component {
    render(){
        return <div>hello {this.props.firstName} {this.props.lastName} from hello.js</div>;
    }
}
export default Hello;
var React = require('react'),
    { Link } = require('react-router'),

    WeightsApp = React.createClass({
        render () {
            return (
                <div>
                    <ul role="nav" className="main-nav">
                        <li><Link to="/" onlyActiveOnIndex activeClassName="active">Calculator</Link></li>
                        <li><Link to="/workout" activeClassName="active">Workout</Link></li>
                    </ul>
                    {this.props.children}
                </div>
            )
        }
    });

module.exports = WeightsApp;

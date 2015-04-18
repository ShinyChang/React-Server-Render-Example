var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');
var IndexView = React.createClass({
    render: function() {
        return (
            <DefaultLayout {...this.props}>
                <div>Hello World!!!</div>
                <footer>
                    Created by: <a href='http://github.com/ShinyChang'>Shiny</a>
                </footer>
            </DefaultLayout>
        );
    }
});

module.exports = IndexView;

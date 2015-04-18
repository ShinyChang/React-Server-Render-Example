var React = require('react');
var DefaultLayout = React.createClass({
    getDefaultProps: function(){
        return {
            title: 'Hello Shiny',
            scripts: [],
            styles: []
        };
    },
    render: function() {
        var scripts = this.props.scripts.map(function(src, idx) {
            return <script key={idx} src={src}></script>
        });

        var styles = this.props.styles.map(function(src, idx) {
            return <link key={idx} rel="stylesheet" href={src}/>
        });

        if (!this.props.serverRender) {
            return (
                <div>{this.props.children}</div>
            );
        }

        return (
            <html>
                <head>
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <title>{this.props.title}</title>
                    {styles}
                </head>
                <body>
                    <div className='app-container'>
                        <div>{this.props.children}</div>
                    </div>
                    {scripts}
                </body>
            </html>
        );
    }
});

module.exports = DefaultLayout;

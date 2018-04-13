import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Image, Segment, Grid, Button, Icon, Transition } from 'semantic-ui-react';

function MapStateToProps(state, props) {
    return {

    }
}

function MapDispatchToProps(dispatch, props) {
    return {

    }
}

@connect(MapStateToProps, MapDispatchToProps)
export default class SlideshowComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            animation: 'fade',
            show: true,
            direction: 1,
            active: true
        }

        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
        this.onComplete = this.onComplete.bind(this);

        setInterval(this.onNext, 5000);
    }

    onNext() {
        if (this.state.active == true) {
            this.setState({
                direction: 1,
                animation: 'fade',
                show: false,
                active: false
            })
        }
    }

    onPrevious() {
        if (this.state.active == true) {
            this.setState({
                direction: -1,
                animation: 'fade',
                show: false,
                active: false
            })
        }
    }

    onComplete() {
        if (this.state.show == false) {
            var index = this.state.index + this.state.direction;
            
            if (index < 0)
                index = this.props.images.length - 1;

            if (index >= this.props.images.length)
                index = 0;

            setTimeout(() => {this.setState({
                active: true
            })}, 2000);

            this.setState({
                index: index,
                show: true,
                direction: 1,
                //animation: this.state.animation == 'fly left' ? 'fly right':'fly left'
            })
        }
    }

    render() {
        var headerImgStyle = {
            position: 'absolute',
            top: '-75px',
            left: '0',
            right: '0',
            zIndex: '',
            filter: 'blur(8px)',
            width: '100%',
            height: '100%',
            opacity: '0.50'
        }

        return (
            <Transition animation={this.state.animation} duration={500} visible={this.state.show} onComplete={this.onComplete} >
                <Image centered inline src={this.props.images[this.state.index]} style={headerImgStyle} />
            </Transition>
        )
    }
}
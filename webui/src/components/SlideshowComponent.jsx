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
            animation: 'drop',
            show: true,
            direction: 1,
            active: true
        }

        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
        this.onComplete = this.onComplete.bind(this);
    }

    onNext() {
        if (this.state.active == true) {
            this.setState({
                direction: 1,
                animation: 'fly right',
                show: false,
                active: false
            })
        }
    }

    onPrevious() {
        if (this.state.active == true) {
            this.setState({
                direction: -1,
                animation: 'fly left',
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
            })}, 1000);

            this.setState({
                index: index,
                show: true,
                direction: 1,
                animation: this.state.animation == 'fly left' ? 'fly right':'fly left'
            })
        }
    }

    render() {
        return (
            <Segment.Group basic horizontal style={{maxWidth:'50vw', maxHeight:'30vh'}}>
                <Segment basic style={{maxWidth: 64}}>
                    <Grid relaxed stretched verticalAlign='middle' style={{height:'100%'}}>
                        <Grid.Row>
                            <Grid.Column>
                                <Button basic onClick={this.onPrevious}>
                                    <Icon fitted name='caret left'/>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment basic>
                    <Transition animation={this.state.animation} duration={500} visible={this.state.show} onComplete={this.onComplete}>
                        <Image centered inline src={this.props.images[this.state.index]} style={{maxWidth:'50vw', maxHeight:'30vh'}} />
                    </Transition>
                </Segment>
                <Segment compact basic style={{maxWidth: 64}}>
                    <Grid relaxed stretched verticalAlign='middle' style={{height:'100%'}}>
                        <Grid.Row>
                            <Grid.Column>
                                <Button basic onClick={this.onNext} style={{width:32}}>
                                    <Icon fitted name='caret right'/>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Segment.Group>
        )
    }
}
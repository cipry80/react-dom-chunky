import React, { PureComponent } from 'react'

export default class Component extends PureComponent {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentWillAppear(callback) {
      console.log('will appear');
      callback();
  }
  componentDidAppear() {
      console.log('did appear');
  }

  componentDidEnter() {
      console.log('did enter');
  }

  componentDidLeave() {
      console.log('did leave');
  }

  componentWillUnmount() {
      console.log('will unmount');
  }

  componentWillEnter (callback) {
    const el = this.container
    console.log("ENTER")
    TweenMax.fromTo(el, 0.3, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback})
  }

  componentWillLeave (callback) {
    const el = this.container
    TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback})
  }

  renderComponent() {
    return (<div/>)
  }

  render() {
    return (<div style={styles.container} ref={c => this.container = c}>
      { this.renderComponent() }
    </div>)
  }
}

const styles = {
  container: {
  }
}

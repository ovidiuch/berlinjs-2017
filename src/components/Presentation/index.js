import React, { Component } from 'react';
import starryBg from '../../starry-bg';

const { max, min, abs } = Math;

const LEFT = 37;
const RIGHT = 39;
const PAGE_UP = 33;
const PAGE_DOWN = 34;

// Use `keydown` for debugging and `keyup` when presenting!
const KEY_EVENT = 'keyup';

// How much time (ms) to keep mouse pressed to go back instead of forward
const GO_BACK_TIMEOUT = 300;

const getSlideRef = (refs, index) => refs[`s${index}`];

const getSlideClass = (index, currIndex) =>
  `slide s${min(3, abs(currIndex - index))}`;

export default class Presentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slide: 0,
      goingBack: false
    };
  }

  componentDidMount() {
    window.addEventListener(KEY_EVENT, this.onKeyPress);
    window.addEventListener('resize', this.calcSlides);

    this.calcSlides();
  }

  componentWillUnmount() {
    window.removeEventListener(KEY_EVENT, this.onKeyPress);
    window.removeEventListener('resize', this.calcSlides);
  }

  calcSlides = () => {
    this.slides = [];
    let nextRef = getSlideRef(this.refs, 0);

    while (nextRef) {
      this.slides.push({
        top: nextRef.offsetTop,
        height: nextRef.offsetHeight
      });
      nextRef = getSlideRef(this.refs, this.slides.length);
    }

    this.forceUpdate();
    // Use this when adding slides
    // this.setState({
    //   slide: this.slides.length - 1
    // });
  };

  prev() {
    this.setState(({ slide }) => ({
      slide: max(0, slide - 1)
    }));
  }

  next() {
    this.setState(({ slide }) => ({
      slide: min(slide + 1, this.slides.length - 1)
    }));
  }

  onKeyPress = e => {
    switch (e.keyCode) {
      case LEFT:
      case PAGE_UP:
        this.prev();
        break;
      case RIGHT:
      case PAGE_DOWN:
        this.next();
        break;
      default:
    }
  };

  onMouseDown = () => {
    this.clickTimeout = setTimeout(() => {
      this.setState({ goingBack: true });
    }, GO_BACK_TIMEOUT);
  };

  onMouseUp = () => {
    clearTimeout(this.clickTimeout);

    // Go back by holding and releasing
    if (this.state.goingBack) {
      this.prev();
      this.setState({
        goingBack: false
      });
    } else {
      this.next();
    }
  };

  renderSlide = (slide, index) => {
    return (
      <div
        key={index}
        className={getSlideClass(index, this.state.slide)}
        ref={`s${index}`}
      >
        {slide}
        <style jsx>{`
          .slide {
            margin: 5vw;
            transition: opacity 0.5s;
          }
          .s0 {
            opacity: 1;
          }
          .s1 {
            opacity: 0.25;
          }
          .s2 {
            opacity: 0.125;
          }
          .s3 {
            opacity: 0.0625;
          }
        `}</style>
      </div>
    );
  };

  renderSlides(slides) {
    return slides.map(this.renderSlide);
  }

  render() {
    const { slide: slideIndex, goingBack } = this.state;
    const slide = this.slides ? this.slides[slideIndex] : { top: 0, height: 0 };
    const top = -slide.top - slide.height / 2;

    return (
      <div
        className="root"
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        <div
          className="stars"
          style={{
            backgroundImage: `url(${starryBg})`
          }}
        />
        <div
          className="content"
          style={{
            transform: `translateY(${top}px)`,
            opacity: goingBack ? 0.5 : 1
          }}
        >
          {this.renderSlides([
            <div>
              <strong>Ovidiu</strong>, web dev, open source, JS & React
              consultant
            </div>,
            <div>
              Table of contents:
              <ol>
                <li>What is React Cosmos?</li>
                <li>What's new in 2.0?</li>
                <li>Unreleased: Test helpers</li>
              </ol>
            </div>,
            <div>
              A dev tool for creating <strong>reusable</strong> React components
            </div>,
            <div>
              Isolated component development
              <ul>
                <li>Faster development</li>
                <li>Simpler & more reusable components</li>
              </ul>
            </div>,
            <div>
              <strong>Dev tool 1st</strong>, Style guide 2nd
            </div>,
            <div>
              <em>Everything</em> is a component.
            </div>,
            <div>
              <code>component = f(props, state)</code> is a lie!
            </div>,
            <div>
              <code>
                component = f(props, state, <em>context</em>)
              </code>
            </div>,
            <div>
              <code>component = f(props, state, Redux, Router, Apollo...)</code>
            </div>,
            <div>
              <code>
                component = f(props, state, Redux, Router, Apollo...{' '}
                <em>external inputs</em>)
              </code>
            </div>,
            <div>
              <code>
                component = f(props, state, Redux, Router, Apollo... Fetch,
                localStorage, window...)
              </code>
            </div>,
            <div>
              The <em>ugly truth</em> about components... 🙊
            </div>,
            <div>
              Quick Cosmos intro: <strong>fixtures</strong> and{' '}
              <strong>proxies</strong>
            </div>,
            <div>
              <pre>{`{
  props: {
    name: 'Dan'
  }
}`}</pre>
            </div>,
            <div>
              <pre>{`{
  state: {
    isLoading: true
  }
}`}</pre>
            </div>,
            <div>
              <pre>{`{
  reduxState: {
    user: {
      name: 'Dan'
    }
  }
}`}</pre>
            </div>,
            <div>
              <pre>{`{
  url: '/user/13',
  route: '/user/:userId'
}`}</pre>
            </div>,
            <div>
              <pre>{`{
  localStorage: {
    token: 'foobartoken'
  }
}`}</pre>
            </div>,
            <div>
              The <strike>sky</strike> cosmos is the limit, proxies are fixture{' '}
              <em>plugins</em>
            </div>,
            <div>Cosmos 2.0</div>,
            <div>
              Easier to integrate:{' '}
              <em>
                Create React App, Next.js, React Boilerplate, React Redux
                Starter Kit
              </em>
            </div>,
            <div>Better docs</div>,
            <div>
              Built-in plugins:{' '}
              <em>
                Context, Redux, React Router, Apollo, XHR, Fetch, localStorage
              </em>
            </div>,
            <div>Static explorting (no web server needed)</div>,
            <div>Refactoring & architecture roadmap</div>,
            <div>
              Next: <strong>Test helpers</strong> 🥁
            </div>,
            <div>Testing UI components is H A R D</div>,
            <div>
              <div>
                <em>How friends think my tests look like...</em>
              </div>
              <pre className="small">{`
const onReply = jest.fn();
const wrapper = shallow(
  <UnrealisticDumbComponent onReply={onReply} />);

expect(wrapper.text()).toBe('Alles gut?');

wrapper.find('button').simulate('click');
expect(onReply).toHaveBeenCalledWith('Ja');`}</pre>
            </div>,
            <div>
              <em>How my tests actually look like...</em>
              <pre className="tiny">{`
// Mock localStorage
Object.defineProperty(global, 'localStorage', {
  writable: true,
  value: new LocalStorageMock({ name: 'Dan' })
});

// Mock fetch
fetchMock.mock({
  matcher: '/api/login',
  response: {
    name: 'Dan'
  }
});

// Mock Redux
const store = createStore(reducer);

// Mock React Router
const routerHistory = createHistory({ initialEntries: ['/'] });

const wrapper = mount(
  <Router history={routerHistory}>
    <Provider store={store}>
      <RealLifeComponent />
    </Provider>
  </Router>);

expect(wrapper.text()).toContain('Hallo Dan!');`}</pre>
            </div>,
            <div>The test setup is the most annoying</div>,
            <div>
              <em>
                if only we could easily simulate component states by mocking all
                dependencies...
              </em>{' '}
              🤔
            </div>,
            <div>
              Beyond UI exploring: <strong>Context mocking</strong>
            </div>,
            <div>
              <pre className="small">{`
const { mount, wrapper, reduxState, url } = createContext({
  proxies,
  component: RealLifeComponent,
  fixture
});

mount();

expect(wrapper().text()).toContain('Hallo Dan!');
expect(reduxState().name).toBe('Dan');
expect(url()).toBe('/');`}</pre>
            </div>,
            <div>
              <pre className="small">{`{
  url: '/login',
  localStorage: {
    name: 'Dan'
  },
  reduxState: {},
  fetch: [
    {
      matcher: '/api/login',
      response: {
        name: 'Dan'
      }
    }
  ]
}`}</pre>
            </div>,
            <div>
              Cosmos tests vs (pure) unit tests
              <ul>
                <li>More coverage per test</li>
                <li>Test user facing logic</li>
                <li>Less test changes per refactor</li>
              </ul>
            </div>,
            <div>
              Cosmos tests vs E2E tests
              <ul>
                <li>Write and run as easy as unit tests</li>
                <li>Test isolated components vs global app</li>
                <li>Lib mocking (eg Redux)</li>
              </ul>
            </div>,
            <div>Please help test Cosmos 2.0 release candidate!</div>,
            <div>
              <code>createContext</code> API soon. Stay tunned!
            </div>,
            <div>
              <strong>Thanks!</strong>
              <ul>
                <li>
                  <a target="_top" href="https://twitter.com/skidding">
                    twitter.com/<strong>skidding</strong>
                  </a>
                </li>
                <li>
                  <a target="_top" href="https://github.com/skidding">
                    github.com/<strong>skidding</strong>
                  </a>
                </li>
                <li>
                  <a target="_top" href="https://github.com/react-cosmos">
                    github.com/<strong>react-cosmos</strong>
                  </a>
                </li>
              </ul>
            </div>
          ])}
        </div>
        <style jsx global>{`
          html,
          body {
            margin: 0;
          }
        `}</style>
        <style jsx>{`
          .content {
            position: absolute;
            top: 50%;
            color: #fff;
            font-size: 3.6vw;
            font-weight: 300;
            line-height: 4.8vw;
            transition: transform 0.5s;
          }
          ul,
          ol {
            margin: 20px 0;
            padding: 0 0 0 5vw;
          }
          li {
            margin: 10px 0;
          }
          pre {
            margin: 0 0 0 5vw;
          }
          a {
            color: #358682;
          }
          .small {
            font-size: 2vw;
            line-height: 3vw;
          }
          .tiny {
            font-size: 1vw;
            line-height: 1.5vw;
          }
          .root {
            position: absolute;
            width: 100%;
            height: 100%;
            user-select: none;
            background: #081b29;
            overflow: hidden;
          }
          .stars {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 300%;
            height: 300%;
            min-width: 4000px;
            min-height: 2750px;
            background-position: center center;
            animation: stars-ani 200s linear infinite;
          }
          @keyframes stars-ani {
            0% {
              transform: translateY(0) translateX(0);
            }
            100% {
              transform: translateY(1372px) translateX(2000px);
            }
          }
        `}</style>
      </div>
    );
  }
}

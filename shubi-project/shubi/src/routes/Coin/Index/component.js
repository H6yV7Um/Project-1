import React, { Component } from 'react'
import { connect } from 'react-redux'
import {} from './action'
import './style.scss'
import Header from 'appComponents/Header'
import CoinCard from 'appComponents/CoinCard'
import getSrc from 'utils/imgSrc'

const mapStateToProps = state => ({
  reducer : state.index
})
const mapDispatchToProps = {}

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component {
  static propTypes =
  {}

  constructor (props) {
    super(props)
    this.state = {}
  }


  componentWillMount () {
  }

  render () {
    const className = 'Index',
      sharpe = getSrc('card/sharpe.png')

    return (
      <div
        className={className}
      >
        <Header />
        <main className={`${className}-main`}>
          <section className={`${className}-section`}>
            <div className={`${className}-card-container`}>
              <div className={`${className}-card-container-header`}>
                <span>UPCOMING ICO</span>
                <a>VIEW ALL &gt; </a>
              </div>
              <div className={`${className}-cards`}>
                <CoinCard
                  logoPath={sharpe}
                  className={`${className}-cards-a`}
                />
                <CoinCard
                  logoPath={sharpe}
                  className={`${className}-cards-b`}

                />
                <CoinCard
                  logoPath={sharpe}
                  className={`${className}-cards-c`}
                />
                <CoinCard
                  logoPath={sharpe}
                  className={`${className}-cards-d`}
                />
              </div>
            </div>
          </section>

          <section className={`${className}-section`}>
            <div className={`${className}-card-container`}>
              <div className={`${className}-card-container-header`}>
                <span>UPCOMING ICO</span>
                <a>VIEW ALL &gt; </a>
              </div>
              <div className={`${className}-cards`}>
                <CoinCard
                  logoPath={sharpe}
                  className={`${className}-cards-a`}

                />
                <CoinCard
                  logoPath={sharpe}
                  className={`${className}-cards-b`}
                />
                <CoinCard
                  logoPath={sharpe}
                  className={`${className}-cards-c`}
                />
                <CoinCard
                  logoPath={sharpe}
                  className={`${className}-cards-d`}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }
}


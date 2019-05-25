import React, { Component } from 'react';
import './App.css';
import Select from 'react-select';
import allClasses from './classes'
import { styleOptions, durationOptions } from './constants/dropdown'
import ClassCard from './ClassCard'

class App extends Component {

  constructor(){
    super()
    this.state = {
      visible: 24, 
      duration: '',
      style: '',
      filters: [],
      searchText: ''
    }
  }

  handleChange = (option) => {
    const { value, key } = option    
    const filters = Array.from(new Set([...this.state.filters, option]))
    
    this.setState({ 
      filters,
      [key]: value,
      visible: 24
    });
  }

  handleInput = (e) => {
    this.setState({ searchText: e.target.value})
  }

  removeFilter = (filter) => {
    const { filters } = this.state
    const classVal = filter.target.value
    
    this.setState({
      filters: filters.filter(c => classVal !== c.value),
      visible: 24
    })
  }

  loadMore = () => {
    this.setState((prev) => {
      return {visible: prev.visible + 24}
    })
  }

  render() {
 
    const { filters, searchText, visible, duration, style } = this.state
    const filteredClasses = allClasses.filter(item => {
      let count = 0
      if(filters.length){
        filters.forEach(obj => {
          Object.keys(item).forEach(key => {
            const val = item[key]
            if(searchText === ''){
              count = val.toString().includes(obj.value) ? count + 1 : count          
            } else {
              count = (val.toString().includes(obj.value) || val.toString().toLowerCase().includes(searchText.toLowerCase())) ? count + 1 : count
            }
          })
        })
       } else {
        Object.keys(item).forEach(key => { 
          const val = item[key]
          count = val.toString().toLowerCase().includes(searchText.toLowerCase()) ? count + 1 : count
        })
       }
      return count !== 0
    })
    const resultCt = filteredClasses.length


    return (
      <div className="container">
        <h2 className="ygi-page-heading ygi-page-heading--dark">Online Yoga Classes</h2>
      
        <div className="ygi-search__wrapper">
          <div className="ygi-search-bar__wrapper">
            <input onChange={this.handleInput} className="ygi-search-bar__input" type="text" placeholder="Search"/>
          </div>
          <Select
            value={duration}
            className="col-lg col-md-6 col-xs-12"
            onChange={this.handleChange}
            options={durationOptions}
            placeholder="Duration"
          />
          <Select
            value={style}
            className="col-lg col-md-6 col-xs-12"
            onChange={this.handleChange}
            options={styleOptions}
            placeholder="Style"
          />
  
        </div>

        <section className="ygi-search-filters">
          <div className="ygi-search-filters__wrapper">
            { filters.map((filter, i) => {
                return (
                  <div className="ygi-search-filters__filter" key={i}>
                    <label className="ygi-search-filters__filter-label">{ filter.label }</label>
                    <button className="ygi-search-filters__filter-close" value={filter.value} onClick={this.removeFilter}></button>
                  </div>
                )
            } ) }
          </div>
        </section>
      
        <div>  
          <div className="ygi-divider"></div>
          <div className="ygi-profile-classes">
            <p className="ygi-profile-classes__heading mx-auto text-center">{ `${resultCt} Results` }</p>
            <div className="ygi-profile-classes__wrapper">
              { filteredClasses.slice(0, visible).map((c, i) => {
                return (
                  <ClassCard class={c} key={i} />
                )
              })}
            </div>
            <div className="ygi-profile-classes__button-wrapper">
            { visible < filteredClasses.length && <button className="ygi-profile-classes__btn" type="button" onClick={this.loadMore}>Load More</button> }
            </div>
          </div>
        </div>

        
      </div>
    );
  }
}


export default App;
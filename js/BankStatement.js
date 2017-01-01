import React from 'react'
import ReactDOM from 'react-dom'

var CategoryTag = React.createClass({
  render() {
    return (
      <div></div>
    )
  }
})

var CategoryCell = React.createClass({
  getInitialState() {
    return {categories: []}
  },

  handleClick() {
    var myCategory = document.getElementById("newCategory").value
    if (myCategory == "") {
      return
    }
    var myCategories = this.state.categories
    myCategories.push(myCategory)
    this.setState({categories: myCategories})
  },

  render() {

    {/* renders the categories into html */}
    var renderedCategories = []
    var numOfCategories = this.state.categories.length
    for (var i = 0; i < numOfCategories; i++) {
      renderedCategories.push(<span>{this.state.categories[i]}</span>)
      renderedCategories.push(<br />)
    }

    return (
      <td>
        {renderedCategories}
        <input id="newCategory"/>
        <button onClick={this.handleClick}>
          Add Category
        </button>
      </td>
    )
  }
})

class TableRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.date}</td>
        <td>{this.props.name}</td>
        <td>${this.props.amount}</td>
        <CategoryCell />
      </tr>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      totalBalance: 5725,
      transactions: {
        '9/22': [{
          name: 'Veselka',
          amount: 13
        }, {
          name: 'Deposit',
          amount: 1002
        }],

        '9/21': [{
          name: 'Amazon',
          amount: 250
        }]
      }
    }
  }

  getTransactions() {
    var rows = []
    
    var dates = Object.keys(this.state["transactions"])
    for (var i = 0; i < dates.length; i++) {
      let date = dates[i]
      let items = this.state["transactions"][date]
      for (var j = 0; j < items.length; j++) {
        let item = items[j]
        rows.push(<TableRow key={rows.length-1} date={date} name={item.name} 
          amount={item.amount} />)
      }
    }
    
    return rows
  }

  render() {

    {/* creates the rows of the table of transactions */}
    var rows = this.getTransactions()
    
    return ( 
      <div>
        <h1>Bank Statment</h1>
        <h2>Total balance: ${this.state.totalBalance}</h2>
        <div>The following table contains your transaction history:</div>
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Categories</th>
            </tr>
          {rows}
          </tbody>
        </table>
        
        {/* What to display after the table. */}
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {Object.keys(this.state).length ? "End of transactions." : "No transactions."}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('container'))

import React from 'react'
import ReactDOM from 'react-dom'

var CategoryTag = React.createClass({
  remove() {
    this.props.deleteFromCell(this.props.index)
  },

  render() {
    return (
      <div>
        <span className="categoryTag">
          {this.props.category}
          <span className='close' onClick={this.remove}> ×</span>
        </span>
      </div>
    )
  }
})

var CategoryCell = React.createClass({
  getInitialState() {
    return {categories: []}
  },

  removeTag(i) {
    var arr = this.state.categories;
    arr.splice(i, 1)
    this.setState({categories: arr})
  },

  handleButtonClick() {
    var myCategory = this.refs.newCategory.value
    if (myCategory == "") {
      return
    }
    var myCategories = this.state.categories
    myCategories.push(myCategory)
    this.setState({categories: myCategories})
    this.refs.newCategory.value = ''
  },

  handleKeyPress: function(event) {
    if (event.key == 'Enter') {
      this.handleButtonClick()
    }
  },

  renderCategory(text, i) {
    return (
      <CategoryTag key={i} index={i} category={text}
          deleteFromCell={this.removeTag}>
        {text}
      </CategoryTag>
    )
  },

  render() {
    {/* renders the categories into html */}
    var renderedCategories = [this.state.categories.map(this.renderCategory)]

    return (
      <td>
        <div className="categoryArray">{renderedCategories}</div>
        {this.state.categories[0] ? <br /> : <div />}
        <div className="categoryInput">
          <input ref="newCategory" onKeyPress={this.handleKeyPress}/>
          <button onClick={this.handleButtonClick}>
            Add Category
          </button>
        </div>
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
        '8/21': [{
          name: 'Mike & Ike Bakery',
          amount: 30
        }, {
          name: 'Check #1234',
          amount: 1050
        }],

        '8/15': [{
          name: 'Dry Cleaning',
          amount: 25
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

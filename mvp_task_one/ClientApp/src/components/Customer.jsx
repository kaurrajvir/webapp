
import React, { Component } from 'react';
import {Table,Dropdown,Pagination} from 'semantic-ui-react'
import axios from "axios";
import CreateCustomer from "./CreateCustomer";
import EditCustomer from "./EditCustomer";
import DeleteCustomer from "./DeleteCustomer";

export class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {        
            data: [],       
            totalItems: 10,
            currentPage: 1,
            sort: {
                column: null,
                direction: 'desc',
            }
        }
        this.onSort = this.onSort.bind(this)
    }
    componentDidMount() {
      this.getData();
    }
    //get data
    getData = () => {
      axios.get('Customers/GetCustomer')
        .then((result) => {
          this.setState({
            data: result.data,
          });
        })
        .catch((error) => {
        });
    }
    //dropdon
    options = [
      { key: 1, text: "5", value: 5 },
      { key: 2, text: "10", value: 10 },
      { key: 3, text: "20", value: 20 },
      { key: 4, text: "30", value: 30 },
    ];   
    onDropdownChangeEvent = (event, { value }) => {
      this.setState({ totalItems: value, currentPage: 1 });
    };
    //pagination    
    onPageChange = (event, data) => {
      this.setState({
        currentPage: data.activePage,
      });
    };
    //Sorting columns
    onSort = (column) => (e) => {
      const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
      const sortedData = this.state.data.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
        return a.price - b.price;
      });
      if (direction === 'desc') {
        sortedData.reverse();
      }
      this.setState({
        data: sortedData,
        sort: {
          column,
          direction,
        }
      });
    };   
    setArrow = (column) => {
      let className = 'sort-direction';
      if (this.state.sort.column === column) {
        className += this.state.sort.direction === 'asc' ? ' asc' : ' desc';
      }
      return className;
    };   
    render() {
        let items = this.state.data;  
        let entries = this.state.totalItems;     
        this.totalpages = parseInt(items.length / entries);
        if (items.length % entries !== 0) {
        this.totalpages++;
        }     
        let skip = 0;
        skip = entries * (this.state.currentPage - 1);
        let start = skip + 1;
        let end = skip + entries;
        if (end > items.length) {
        end = items.length;
        }     
        items = items.slice(start - 1, end);
         //html
        return (
            <div id='container'>
                <CreateCustomer  getDataCreate={this.getData} />
                <Table id='table' celled className='ui table striped' aria-labelledby="tabelLabel">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell onClick={this.onSort('name')}><span class="sort">Name</span><div className={this.setArrow('name')}></div></Table.HeaderCell>
                            <Table.HeaderCell onClick={this.onSort('address')}><span>Address</span><div className={this.setArrow('address')}></div></Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>          
                        {items.map((item) => {
                        return (
                            <Table.Row>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.address}</Table.Cell>
                                <Table.Cell><EditCustomer  getDataEdit={this.getData} editData={item} /></Table.Cell>
                            <Table.Cell><DeleteCustomer getDataDelete={this.getData}  deleteId={item.id} /> </Table.Cell> 
                            </Table.Row>
                        );
                        })}
                    </Table.Body>
                </Table>                
                <span class="footer-nav">
                <Dropdown
                    id="footerdropdown"
                    defaultValue={5}
                    compact
                    selection
                    options={this.options}
                    onChange={this.onDropdownChangeEvent}
                />
                <Pagination
                    id="pagination"
                    defaultActivePage={1}
                    totalPages={this.totalpages}
                    onPageChange={this.onPageChange}
                />
                </span>
            </div>
        )
    }
}
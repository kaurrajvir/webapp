import React, { Component } from "react";
import { Button, Icon, Modal, ModalActions, Form, Dropdown } from 'semantic-ui-react'
import axios from 'axios';

export default class CreateSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            dateSold: '',
            name: "",
            customerId: 0,
            productId: 0,
            storeId: 0,
            customerData: [],
            productData: [],
            storeData: []
        }
    }
    //open popup form
    showPopup = () => {
        this.setState({ open: !this.state.open });
    }
    componentDidMount() {
        this.getCustomerData();
        this.getProductData();
        this.getStoreData();
    }
    //Get customer data
    getCustomerData = () => {
        axios.get('Customers/GetCustomer')
        .then((result) => {
            var myData = [];               
            result.data.map((customer) => {
                myData = myData.concat({                       
                    key: customer.id,
                    text: customer.name,
                    value: customer.id,
                })
            })
            this.setState({
                customerData: myData,
            });
        })
        .catch((error) => {
        });
    }
    //get Product data
    getProductData = () => {
        axios.get('Products/GetProduct')
        .then((result) => {
            var myData = [];                
            result.data.map((product) => {
                myData = myData.concat({                       
                    key: product.id,
                    text: product.name,
                    value: product.id,
                })
            })
            this.setState({
                productData: myData,
            });
        })
        .catch((error) => {
        });
    }
    //get store data
    getStoreData = () => {
        axios.get('Stores/GetStore')
        .then((result) => {
            var myData = [];                
            result.data.map((store) => {
                myData = myData.concat({                       
                    key: store.id,
                    text: store.name,
                    value: store.id,
                })
            })
            this.setState({
                storeData: myData,
            });
        })
        .catch((error) => {
        });
    }
    //posting the data 
    handleCreate = () => {
        axios.post('Sales/PostSales', {
            customerId: this.state.customerId,
            productId: this.state.productId,
            storeId: this.state.storeId,
            dateSold: this.state.dateSold,
        })
            .then((result) => {
                this.showPopup();
                this.props.getDataCreate();
            })
            .catch((error) => {
            });
    }
    //chage handler
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }    
    handleChange = (e, result) => {
        const { name, value } = result;
        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <div>               
                <Button primary onClick={this.showPopup}> New Sales</Button>
                <Modal id='popup' open={this.state.open} size='tiny'>
                    <Modal.Header>Create Sales</Modal.Header>
                    <Modal.Content>
                        <Form id='Form' onSubmit={this.handleCreate}>
                            <Form.Input
                                type="date"
                                name='dateSold'
                                label='Date Sold'                                
                                onChange={(e) => { this.setState({ dateSold: e.target.value }) }} />
                            <Form.Dropdown
                                pointing className='link item'                                
                                label='Customer'
                                fluid
                                search
                                selection
                                options={this.state.customerData}
                                onChange={this.handleChange} name="customerId" />
                            <Form.Dropdown pointing className='link item'                                
                                label='Product'
                                fluid
                                search
                                selection
                                options={this.state.productData}
                                onChange={this.handleChange} name="productId" />
                            <Form.Dropdown pointing className='link item'                                
                                label='Store'
                                fluid
                                search
                                selection
                                options={this.state.storeData}
                                onChange={this.handleChange} name="storeId" />
                        </Form>
                    </Modal.Content>
                    <ModalActions>
                        <Button color='black' onClick={this.showPopup}>cancel</Button>                       
                        <Button color='green' icon labelPosition="right" onClick={this.handleCreate}>create<Icon name='checkmark' /></Button>
                    </ModalActions>
                </Modal>
            </div>
        )
    }
}       

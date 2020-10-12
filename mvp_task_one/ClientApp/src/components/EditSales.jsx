import React, { Component } from "react";
import { Button, Icon, Modal, ModalActions, Form, Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import moment from 'moment/moment.js';

export default class EditSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            customerData: [],
            productData: [],
            storeData: [],
            customerId: this.props.editData.customerId,
            productId: this.props.editData.productId,
            storeId: this.props.editData.storeId,
            dateSold: this.props.editData.dateSold
        }
    }
    //open popup
    showPopup = () => {
        this.setState({ open: !this.state.open });
    }
    //get dropdown data
    componentDidMount() {
        this.getCustomerData();
        this.getProductData();
        this.getStoreData();
    }
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
    //edit data
    handleEdit = () => {
        axios.put(`Sales/PutSales/${this.props.editData.id}`, {
            id: this.props.editData.id,
            customerId: this.state.customerId,
            productId: this.state.productId,
            storeId: this.state.storeId,
            dateSold: this.state.dateSold,
        })
        .then((result) => {
            this.showPopup();
            this.props.getDataEdit();
        })
        .catch((error) => {
        });
    }
    //handle change
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
                <Button color='yellow' onClick={this.showPopup}><Icon name='edit' />Edit </Button>
                <Modal id='popup' open={this.state.open} size='tiny'>
                    <Modal.Header>Edit Sales</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Input
                                name='dateSold'
                                label='Date Sold'
                                placeholder="Enter Date"
                                defaultValue={moment(this.props.editData.dateSold).format('DD/MM/YYYY')}
                                onChange={this.onChange} name="dateSold" />
                            <Form.Dropdown
                                pointing className='link item'
                                placeholder='Customers'
                                label='Customer'
                                fluid
                                search
                                selection
                                options={this.state.customerData}
                                defaultValue={this.props.editData.customerId}
                                onChange={this.handleChange} name="customerId" />
                            <Form.Dropdown pointing className='link item'
                                placeholder='Products'
                                fluid
                                search
                                selection
                                options={this.state.productData}
                                defaultValue={this.props.editData.productId}
                                onChange={this.handleChange} name="productId" />
                            <Form.Dropdown pointing className='link item'
                                placeholder='Stores'
                                fluid
                                search
                                selection
                                options={this.state.storeData}
                                defaultValue={this.props.editData.storeId}
                                onChange={this.handleChange} name="storeId" />
                        </Form>
                    </Modal.Content>
                    <ModalActions>
                        <Button color='black' onClick={this.showPopup}>cancel</Button>
                        <Button color='green' icon labelPosition="right" onClick={this.handleEdit}>edit<Icon name='checkmark' /></Button>
                    </ModalActions>
                </Modal>
            </div>
        )
    }
}       
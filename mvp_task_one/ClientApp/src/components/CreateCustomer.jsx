import React, { Component } from 'react';
import { Button, Icon, Form, Modal, ModalActions } from 'semantic-ui-react';
import axios from 'axios';

export class CreateCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: "",
            address: "",
        };
    };
    //open modal
    showPopup = () => {
        this.setState({ open: !this.state.open });
    }
    //post new data
    handleCreate = () => {
        axios.post('Customers/PostCustomer', {
            name: this.state.name,
            address: this.state.address
        })
            .then((result) => {            
                this.showPopup();
                this.props.getDataCreate();
            })
            .catch((error) => {
            });
    }
    //html
    render() {
        return (
            <div>                
                <Button primary onClick={this.showPopup}>New Customer</Button>
                <Modal id="popup"               
                    open={this.state.open}
                    size='tiny'>
                    <Modal.Header>Create Customer</Modal.Header>
                    <Modal.Content>
                        <Form id="Form">
                            <Form.Input
                                name='name'
                                label='NAME'
                                placeholder="Enter Name"                               
                                onChange={(e) => { this.setState({ name: e.target.value }) }} />
                            <Form.Input
                                name='address'
                                label='ADDRESS'
                                placeholder="Enter Address"                                
                                onChange={(e) => { this.setState({ address: e.target.value }) }} />
                        </Form>
                        <ModalActions>                            
                            <Button color='black' onClick={this.showPopup}>cancel</Button>                            
                            <Button color='green' icon labelPosition="right" onClick={this.handleCreate}>create
                            <Icon name='checkmark' /> </Button>
                        </ModalActions>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}
export default CreateCustomer
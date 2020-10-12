import React, { Component } from 'react';
import { Button, Icon, Form, Modal, ModalActions } from 'semantic-ui-react';
import axios from 'axios';

export class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: "",
            price: "",
        };
    };
    //open modal
    showPopup = () => {
        this.setState({ open: !this.state.open });
    }
    //post new data
    handleCreate = () => {
        axios.post('Products/PostProduct', {
            name: this.state.name,
            price: this.state.price
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
                <Button primary onClick={this.showPopup}>New Product</Button>
                <Modal id="popup"               
                    open={this.state.open}
                    size='tiny'>
                    <Modal.Header>Create Product</Modal.Header>
                    <Modal.Content>
                        <Form id="Form">
                            <Form.Input
                                name='name'
                                label='NAME'
                                placeholder="Enter Name"                               
                                onChange={(e) => { this.setState({ name: e.target.value }) }} />
                            <Form.Input
                                name='price'
                                label='Price'
                                placeholder="Enter Price"                                
                                onChange={(e) => { this.setState({ price: e.target.value }) }} />
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
export default CreateProduct
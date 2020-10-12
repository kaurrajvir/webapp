import React, { Component } from 'react';
import { Button, Icon, Modal, ModalActions } from 'semantic-ui-react';
import axios from 'axios';

export class DeleteCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    //open modal
    showPopup = () => {
        this.setState({ open: !this.state.open });
    }
    //delete function
    handleDelete = () => {
        axios.delete(`Customers/DeleteCustomer/${this.props.deleteId}`)
        .then((result) => {
            this.props.getDataDelete();
            this.showPopup();
        })
        .catch((error) => {
        });
    }
    //html
    render() {
        return (
            <div>               
                <Button color='red' onClick={this.showPopup}><Icon name='trash alternate outline' /> Delete</Button>
                <Modal id='popup'
                    open={this.state.open}
                    size='tiny'>
                    <Modal.Header>Delete Customer</Modal.Header>
                    <Modal.Content><h4 class='delete'> Are you sure?</h4>
                        <ModalActions>
                            <Button color='black' onClick={this.showPopup}>cancel</Button>                           
                            <Button color='red' icon labelPosition="right" onClick={this.handleDelete}>delete <Icon name='remove' /></Button>
                        </ModalActions>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}
export default DeleteCustomer

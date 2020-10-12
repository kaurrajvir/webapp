import React, { Component } from 'react';
import { Button, Icon, Modal, Form, ModalActions } from 'semantic-ui-react';
import axios from 'axios';

export class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,    
      name: this.props.editData.name,
      address: this.props.editData.address
    }
  }
  //open modal
  showPopup = () => {
    this.setState({ open: !this.state.open });
  }
  //edit function
  handleEdit = () => {
    axios.put(`Customers/PutCustomer/${this.props.editData.id}`, {
        id: this.props.editData.id,     
        name: this.state.name,
        address: this.state.address,
    })
    .then((result) => {
        this.showPopup();
        this.props.getDataEdit();
    })
       .catch((error) => {
    });
  }
  //html
  render() {
    return (
        <div>      
            <Button color='yellow' onClick={this.showPopup}><Icon name='edit'/>Edit</Button>
            <Modal id='popup' open={this.state.open} size='tiny'>
                <Modal.Header>Edit Customer</Modal.Header>
                <Modal.Content>
                <Form>
                    <Form.Input
                    name='name'
                    label='NAME'              
                    defaultValue={this.props.editData.name}               
                    onChange={(e) => { this.setState({ name: e.target.value }) }} />
                    <Form.Input
                    name='address'
                    label='ADDRESS'              
                    defaultValue={this.props.editData.address}               
                    onChange={(e) => { this.setState({ address: e.target.value }) }} />
                </Form>
                <ModalActions>
                    <Button color='black' onClick={this.showPopup}>cancel</Button>            
                    <Button color='green' icon labelPosition="right" onClick={this.handleEdit}>edit
                    <Icon name='checkmark' /> </Button>
                </ModalActions>
                </Modal.Content>
            </Modal>
        </div>
    )
  }
}
export default EditCustomer

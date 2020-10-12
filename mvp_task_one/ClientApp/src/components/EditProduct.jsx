import React, { Component } from 'react';
import { Button, Icon, Modal, Form, ModalActions } from 'semantic-ui-react';
import axios from 'axios';

export class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,    
      name: this.props.editData.name,
      address: this.props.editData.price
    }
  }
  //open modal
  showPopup = () => {
    this.setState({ open: !this.state.open });
  }
  //edit function
  handleEdit = () => {
    axios.put(`Products/PutProduct/${this.props.editData.id}`, {
        id: this.props.editData.id,     
        name: this.state.name,
        price: this.state.price,
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
                <Modal.Header>Edit Product</Modal.Header>
                <Modal.Content>
                <Form>
                    <Form.Input
                    name='name'
                    label='NAME'              
                    defaultValue={this.props.editData.name}               
                    onChange={(e) => { this.setState({ name: e.target.value }) }} />
                    <Form.Input
                    name='price'
                    label='Price'              
                    defaultValue={this.props.editData.price}               
                    onChange={(e) => { this.setState({ price: e.target.value }) }} />
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
export default EditProduct

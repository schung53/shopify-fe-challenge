import React, { Component } from 'react';
import PropTypes from 'prop-types';

// UI
import { Button } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';

export default class PictureModal extends Component {
    constructor(){
        super();
        this.state = {
            open: false
        };
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        const { picture } = this.props;
        return (
            <div>
                <Button
                    onClick={this.handleOpen}
                >
                    Read More
                </Button>
                <Dialog
                    open={open}
                >
                    <DialogTitle>
                        {picture.title}
                    </DialogTitle>
                    <DialogContent>
                        <img src={picture.hdurl} alt={picture.title}/>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

PictureModal.propTypes = {
    picture: PropTypes.object
}


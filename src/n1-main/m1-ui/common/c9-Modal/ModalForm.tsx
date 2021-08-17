import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export interface ModalPropsType {
    modalTitle: string
    modalText?: string
    openStatus: boolean
    handleCloseModal: (openStatus: boolean) => void
    modalActionCallback: () => void
    actionButtonTitle: string
    children?: JSX.Element
    // close Modal Window after action
    closeAfterAction?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: "400px",
        },
    }),
);

const ModalForm: React.FC<ModalPropsType> = (props) => {

    const classes = useStyles();
    const {
        openStatus, handleCloseModal,
        modalActionCallback, modalTitle, modalText,
        actionButtonTitle, closeAfterAction = true, children,
    } = props

    const handleClose = () => {
        handleCloseModal && handleCloseModal(false)
    };
    const handleAction = () => {
        modalActionCallback && modalActionCallback();
        handleCloseModal && handleCloseModal(false)
    }

    return (
        <div>
            <Dialog
                open={openStatus}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className={classes.root}>
                    {modalTitle && <DialogTitle id="alert-dialog-title">{modalTitle}</DialogTitle>}
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {modalText && <Typography variant={"body1"}>{modalText}</Typography>}
                            {children}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleAction} color="primary" autoFocus>
                            {actionButtonTitle}
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}

export default ModalForm
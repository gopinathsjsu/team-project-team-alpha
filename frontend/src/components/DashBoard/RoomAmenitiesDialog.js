import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

const options = [
  'Daily Continental Breakfast',
  'Access to fitness room',
  'Access to Swimming Pool/Jacuzzi',
  'Daily Parking',
  'All meals included (Breakfast, Lunch, Dinner)'
];

export default function RoomAmenitiesDialog(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);
  const [state, setState] = useState({
    breakfast: false,
    fitness: false,
    swimming: false,
    parking: false,
    allMeals: false
  });

  const {breakfast, fitness, swimming, parking, allMeals } = state;

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    setState({});
    onClose(value);
  };

  const onCheckBoxSelected = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };


  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Select Amenities</DialogTitle>
      <DialogContent dividers>
      <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={breakfast} onChange={onCheckBoxSelected} name="breakfast" />
            }
            label="Daily Continental Breakfast"
          />
          <FormControlLabel
            control={
              <Checkbox checked={fitness} onChange={onCheckBoxSelected} name="fitness" />
            }
            label="Access to fitness room"
          />
            <FormControlLabel
            control={
              <Checkbox checked={swimming} onChange={onCheckBoxSelected} name="swimming" />
            }
            label="Access to Swimming Pool/Jacuzzi"
          />
          <FormControlLabel
            control={
              <Checkbox checked={parking} onChange={onCheckBoxSelected} name="parking" />
            }
            label="Daily Parking"
          />
        <FormControlLabel
            control={
              <Checkbox checked={allMeals} onChange={onCheckBoxSelected} name="allMeals" />
            }
            label="All meals included"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

RoomAmenitiesDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

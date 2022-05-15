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
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { addToCart, setSelectedAmenities, setSelectedHotel } from '../../state/action-creators/hotelActions';
import { SwapVertOutlined } from '@material-ui/icons';
import { Grid, TextField } from '@mui/material';
import axios from 'axios';
import backendServer from '../../Config';

const options = {
  CONTINENTAL_BREAKFAST: 'Daily Continental Breakfast',
  FITNESS_ROOM: 'Access to fitness room',
  SWIMMING_POOL: 'Access to Swimming Pool/Jacuzzi',
  DAILY_PARKING: 'Daily Parking',
  ALL_MEALS_INCLUDED: 'All meals included (Breakfast, Lunch, Dinner)'
};

export default function UpdateHotelDialog(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);
  const [state, setState] = useState({
    CONTINENTAL_BREAKFAST: false,
    FITNESS_ROOM: false,
    SWIMMING_POOL: false,
    DAILY_PARKING: false,
    ALL_MEALS_INCLUDED: false
  });

  const { CONTINENTAL_BREAKFAST, FITNESS_ROOM, SWIMMING_POOL, DAILY_PARKING, ALL_MEALS_INCLUDED } = state;
  const selectedHotel = useSelector((state) => state.hotels.selectedHotel);
  const selectedRoom = useSelector((state) => state.hotels.selectedRoom);
  const cart = useSelector((state) => state.hotels.cart);
  const searchData = useSelector((state) => state.hotels.searchParams);
    const [serviceCostMap, setServiceCostMap] = useState({});
   const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [points, setPoints] = useState(0);

  React.useEffect(() => {
    if (selectedHotel) {
      var service = selectedHotel.serviceList;
      var serviceMap = {}
      for (var i in service) {
        serviceMap[service[i].type] = service[i].cost;
      }
      setServiceCostMap(serviceMap);
    }
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
    setState({});
    onClose();
  };

  const handleConfirm = async () => {
    let service = []
    if (CONTINENTAL_BREAKFAST) {
      service.push({cost: serviceCostMap["CONTINENTAL_BREAKFAST"]*props.order.duration, type: "CONTINENTAL_BREAKFAST"});
    }
    if (FITNESS_ROOM) {
      service.push({cost: serviceCostMap["FITNESS_ROOM"]*props.order.duration, type: "FITNESS_ROOM"});
    }
    if (SWIMMING_POOL) {
      service.push({cost: serviceCostMap["SWIMMING_POOL"]*props.order.duration,type: "SWIMMING_POOL"});
    }
    if (DAILY_PARKING) {
      service.push({cost: serviceCostMap["DAILY_PARKING"]*props.order.duration, type: "DAILY_PARKING"});
    }
    if (ALL_MEALS_INCLUDED) {
      service.push({cost: serviceCostMap["ALL_MEALS_INCLUDED"]*props.order.duration, type:"ALL_MEALS_INCLUDED"});
    }
    let payload = {
      serviceList: service
    }
    const response = await axios.patch(backendServer + `/v1/reservation/${props.order.reservationId}`,payload)
    if(response==null){
      alert("Error while updating the booking");
    }
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
          {selectedHotel.serviceList!==undefined && selectedHotel.serviceList.map(service => (
            <>
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={onCheckBoxSelected} name={service.type} />
                    }
                    label={options[service.type]}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography>${service.cost}</Typography>
                </Grid>
              </Grid>
            </>
          ))}
          <br />
          <br />
          <Grid container>
            <Grid item xs={12} sm={10}>
              <Typography>Loyalty Points to use ( Available : {user.rewardPoints} ) </Typography>
            </Grid>
            { user.rewardPoints!==0 && (<Grid item xs={12} sm={2}>
              <TextField
                type="number"
                id="points"
                label="Points"
                name="points"
                onChange={(e) => { setPoints(e.target.value); }}
                value={points}
                autoFocus
              />
            </Grid>)}
          </Grid>
        </FormGroup>
        <br/>
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

UpdateHotelDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

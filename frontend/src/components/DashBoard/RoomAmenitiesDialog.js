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
import { addToCart, setSelectedAmenities, setSelectedHotel } from '../../state/action-creators/hotelActions';
import { SwapVertOutlined } from '@material-ui/icons';

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
    CONTINENTAL_BREAKFAST: false,
    FITNESS_ROOM:false,
    SWIMMING_POOL: false,
    DAILY_PARKING: false,
    ALL_MEALS_INCLUDED: false
  });

  const {CONTINENTAL_BREAKFAST, FITNESS_ROOM, SWIMMING_POOL, DAILY_PARKING, ALL_MEALS_INCLUDED } = state;
  const selectedHotel = useSelector((state)=> state.hotels.selectedHotel);
  const selectedRoom = useSelector((state)=> state.hotels.selectedRoom);
  const cart = useSelector((state)=> state.hotels.cart);
  const searchData = useSelector((state) => state.hotels.searchParams);
  let endDate =  searchData.value[1]?searchData.value[1].toISOString().split('T')[0]: '';
  let startDate = searchData.value[0]?searchData.value[0].toISOString().split('T')[0]: '';
  const [serviceCostMap, setServiceCostMap] = useState({});
  const dispatch = useDispatch();

  React.useEffect(() => {
    if(selectedHotel){
      var service = selectedHotel.serviceList;
      var serviceMap = {}
      for(var i in service){
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

  const handleConfirm = () => {
    let service = {}
    if(CONTINENTAL_BREAKFAST){
      service.CONTINENTAL_BREAKFAST = serviceCostMap["CONTINENTAL_BREAKFAST"];
    }
    if(FITNESS_ROOM){
      service.FITNESS_ROOM = serviceCostMap["FITNESS_ROOM"];
    }
    if(SWIMMING_POOL){
      service.SWIMMING_POOL = serviceCostMap["SWIMMING_POOL"];
    }
    if(DAILY_PARKING){
      service.DAILY_PARKING = serviceCostMap["DAILY_PARKING"];
    }
    if(ALL_MEALS_INCLUDED){
      service.ALL_MEALS_INCLUDED = serviceCostMap["ALL_MEALS_INCLUDED"];
    }
    dispatch(setSelectedAmenities(service));
    let item = {
      room: selectedRoom,
      amenities: service
    }
    let userId = sessionStorage.getItem("userId");
    dispatch(addToCart(item,cart,startDate,endDate, userId))
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
              <Checkbox checked={CONTINENTAL_BREAKFAST} onChange={onCheckBoxSelected} name="CONTINENTAL_BREAKFAST" />
            }
            label="Daily Continental Breakfast"
          />
          <FormControlLabel
            control={
              <Checkbox checked={FITNESS_ROOM} onChange={onCheckBoxSelected} name="FITNESS_ROOM" />
            }
            label="Access to fitness room"
          />
            <FormControlLabel
            control={
              <Checkbox checked={SWIMMING_POOL} onChange={onCheckBoxSelected} name="SWIMMING_POOL" />
            }
            label="Access to Swimming Pool/Jacuzzi"
          />
          <FormControlLabel
            control={
              <Checkbox checked={DAILY_PARKING} onChange={onCheckBoxSelected} name="DAILY_PARKING" />
            }
            label="Daily Parking"
          />
        <FormControlLabel
            control={
              <Checkbox checked={ALL_MEALS_INCLUDED} onChange={onCheckBoxSelected} name="ALL_MEALS_INCLUDED" />
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

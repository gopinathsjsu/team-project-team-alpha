/* room_id : 1*/ insert into room(hotel_id, type, cost) values( 1, 'DOUBLE', 100);
/* room_id : 2*/insert into room(hotel_id, type, cost) values( 1, 'DOUBLE', 100);
/* room_id : 3*/insert into room(hotel_id, type, cost) values( 1, 'SINGLE', 50);
/* room_id : 4*/insert into room(hotel_id, type, cost) values( 1, 'SINGLE', 50);
/* room_id : 5*/insert into room(hotel_id, type, cost) values( 1, 'SUITE', 200);
/* room_id : 6*/insert into room(hotel_id, type, cost) values( 1, 'SUITE', 200);

/* room_id : 7*/insert into room(hotel_id, type, cost) values( 2, 'DOUBLE', 300);
/* room_id : 8*/insert into room(hotel_id, type, cost) values( 2, 'DOUBLE', 300);
/* room_id : 9*/insert into room(hotel_id, type, cost) values( 2, 'SINGLE', 200);
/* room_id : 10*/insert into room(hotel_id, type, cost) values( 2, 'SINGLE', 200);
/* room_id : 11*/insert into room(hotel_id, type, cost) values( 2, 'SUITE', 400);
/* room_id : 12*/insert into room(hotel_id, type, cost) values( 2, 'SUITE', 400);

insert into reservation( transaction_id, user_id, room_id, start_time, end_time, booking_state, service_list) values( 1, 1, 7, 1649876400000, 1650135599000, 'CONFIRMED', '[ { "type": "FITNESS_ROOM", "cost": 50 }, { "type": "DAILY_PARKING", "cost": 50 }, { "type": "ALL_MEALS_INCLUDED", "cost": 50 }]');
insert into reservation( transaction_id, user_id, room_id, start_time, end_time, booking_state, service_list) values( 1, 1, 9, 1649876400000, 1650135599000, 'CONFIRMED', '[ { "type": "FITNESS_ROOM", "cost": 50 }, { "type": "DAILY_PARKING", "cost": 50 }, { "type": "ALL_MEALS_INCLUDED", "cost": 50 }]');
insert into reservation( transaction_id, user_id, room_id, start_time, end_time, booking_state, service_list) values( 1, 1, 5, 1649876400000, 1650135599000, 'CONFIRMED', '[ { "type": "FITNESS_ROOM", "cost": 50 }, { "type": "DAILY_PARKING", "cost": 50 }, { "type": "ALL_MEALS_INCLUDED", "cost": 50 }]');

insert into reservation( transaction_id, user_id, room_id, start_time, end_time, booking_state, service_list) values( 2, 2, 7, 1656183600000, 1656615599000, 'CONFIRMED', '[ { "type": "SWIMMING_POOL", "cost": 50 }, { "type": "CONTINENTAL_BREAKFAST", "cost": 50 }]');
insert into reservation( transaction_id, user_id, room_id, start_time, end_time, booking_state, service_list) values( 2, 2, 9, 1656183600000, 1656615599000, 'CONFIRMED', '[ { "type": "SWIMMING_POOL", "cost": 50 }, { "type": "CONTINENTAL_BREAKFAST", "cost": 50 }]');
insert into reservation( transaction_id, user_id, room_id, start_time, end_time, booking_state, service_list) values( 2, 2, 5, 1656183600000, 1656615599000, 'CONFIRMED', '[ { "type": "SWIMMING_POOL", "cost": 50 }, { "type": "CONTINENTAL_BREAKFAST", "cost": 50 }]');


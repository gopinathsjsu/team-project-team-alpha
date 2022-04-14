/* room_id : 1*/ insert into room(hotel_id, type) values( 1, 'DOUBLE');
/* room_id : 2*/insert into room(hotel_id, type) values( 1, 'DOUBLE');
/* room_id : 3*/insert into room(hotel_id, type) values( 1, 'SINGLE');
/* room_id : 4*/insert into room(hotel_id, type) values( 1, 'SINGLE');
/* room_id : 5*/insert into room(hotel_id, type) values( 1, 'SUITE');
/* room_id : 6*/insert into room(hotel_id, type) values( 1, 'SUITE');

/* room_id : 7*/insert into room(hotel_id, type) values( 2, 'DOUBLE');
/* room_id : 8*/insert into room(hotel_id, type) values( 2, 'DOUBLE');
/* room_id : 9*/insert into room(hotel_id, type) values( 2, 'SINGLE');
/* room_id : 10*/insert into room(hotel_id, type) values( 2, 'SINGLE');
/* room_id : 11*/insert into room(hotel_id, type) values( 2, 'SUITE');
/* room_id : 12*/insert into room(hotel_id, type) values( 2, 'SUITE');

insert into reservation(user_id, room_id, start_time, end_time) values( 1, 7, 1649876400000, 1650135599000);
insert into reservation(user_id, room_id, start_time, end_time) values( 1, 9, 1649876400000, 1650135599000);
insert into reservation(user_id, room_id, start_time, end_time) values( 1, 5, 1649876400000, 1650135599000);



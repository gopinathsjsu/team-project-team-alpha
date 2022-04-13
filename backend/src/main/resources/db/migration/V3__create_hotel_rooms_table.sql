create table room (
    id bigint primary key auto_increment,
    hotel_id bigint,
    type varchar(64),
    foreign key (hotel_id) references hotel(id)
);

create index hotel_id_type on room(hotel_id, type);
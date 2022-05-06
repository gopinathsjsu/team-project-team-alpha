create table room (
    id bigint primary key auto_increment,
    hotel_id bigint,
    type varchar(64),
    cost bigint,
    name varchar(128),
    description varchar(128),
    max_occupants bigint,
    adults bigint,
    children bigint,
    foreign key (hotel_id) references hotel(id)
);

create index hotel_id_type on room(hotel_id, type);
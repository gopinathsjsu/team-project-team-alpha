create table reservation (
    id bigint primary key auto_increment,
    user_id bigint,
    room_id bigint,
    start_time bigint,
    end_time bigint,
    booking_state varchar(64),
    service_list json not null,
    constraint foreign key (user_id) references user(id),
    constraint foreign key (room_id) references room(id)
);

create index room_id_start_end on reservation( room_id, start_time, end_time);
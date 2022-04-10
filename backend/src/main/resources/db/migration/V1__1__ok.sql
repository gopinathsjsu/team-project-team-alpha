create table user(
    id bigint primary key auto_increment,
    name varchar(64) not null,
    email_id varchar(128) unique not null,
    password varchar(256) not null,
    image_url varchar(256),
    reward_points bigint not null default 0
)engine=InnoDB;
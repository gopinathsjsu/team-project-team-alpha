create table user(
    id bigint primary key auto_increment,
    name varchar(64) not null,
    email_id varchar(128) unique not null,
    reward_points bigint not null default 0
)engine=InnoDB;
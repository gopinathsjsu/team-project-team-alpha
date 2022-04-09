create table user(
    id bigint primary key auto_increment,
    name varchar(64) not null,
    email_id varchar(128) unique not null,
    reward_points bigint not null default 0
)engine=InnoDB;

insert into user( name, email_id, reward_points)
    values
        ( 'Mayank', 'mayank.verma@sjsu.edu', 0),
        ( 'Vivek', 'vivek.joshi@sjsu.edu', 0),
        ( 'Suharsh', 'suharsh.cherukunnonarippa@sjsu.edu', 0),
        ( 'Akshay', 'akshaykumar.bhimsenraokulkarni@sjsu.edu', 0);

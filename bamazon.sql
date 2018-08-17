use bamazon;
create table products(
	item_id integer not null auto_increment,
    product_name varchar(50),
    department_name varchar(50),
    price double,
    stock_quantity integer,
    primary key(item_id)
);

insert into bamazon.products(item_id, product_name, department_name, price, stock_quantity)
values (1, "gilden tee", "clothing", 5, 100);

insert into bamazon.products(product_name, department_name, price, stock_quantity)
values ("beats headphone", "electronic", 15, 50);

insert into bamazon.products(product_name, department_name, price, stock_quantity)
values ("cell phone", "electronic", 500, 30);

insert into bamazon.products(product_name, department_name, price, stock_quantity)
values ("sewing machine", "electronic", 300, 20);

insert into bamazon.products(product_name, department_name, price, stock_quantity)
values ("denim", "clothing", 50, 80);

insert into bamazon.products(product_name, department_name, price, stock_quantity)
values ("watches", "accessory", 70, 75);

insert into bamazon.products(product_name, department_name, price, stock_quantity)
values ("work chair", "furniture", 150, 100);

insert into bamazon.products(product_name, department_name, price, stock_quantity)
values ("laptop", "electronic", 1000, 50);

insert into bamazon.products(product_name, department_name, price, stock_quantity)
values ("phone case", "accessory", 20, 150);

insert into bamazon.products(product_name, department_name, price, stock_quantity)
values ("shoes", "clothing", 65, 120);


create table bamazon.departments(
	department_id integer not null auto_increment,
	department_name varchar(50) not null unique,
    over_head_costs double not null,
    primary key(department_id)
);

insert into bamazon.departments(department_name, over_head_costs)
values("clothing", 500);

insert into bamazon.departments(department_name, over_head_costs)
values("electronic", 10000);

insert into bamazon.departments(department_name, over_head_costs)
values("accessory", 1000);

insert into bamazon.departments(department_name, over_head_costs)
values("furniture", 5000);

insert into bamazon.departments(department_name, over_head_costs)
values("cards", 3000);

alter table bamazon.products add product_sales double;










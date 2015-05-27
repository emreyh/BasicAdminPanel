## Technologies used in Project ##
1. 	Spring Framework
2.	Spring MVC
3.	Spring AOP
4.	MongoDB
5.	Bootstrap CSS Framework
6.	Apache Tiles 3 
7.	Jquery
8.	Ajax
9.	Form Validation Plugin
10.	Notification Plugin
11.	FooTable Plugin
12.	Google Captcha API
13.	JUnit



## Overview ##
When the page is first opened, it is attracted 10 records from
database and table is filled according to them. Every records beside
has an update and delete button. Update and delete processes are done
by Ajax. When update and delete process is done, table is updated
automatically. When Ajax process is done, it is informed with "Notification Plugin".

In order to add a new user, for "captcha" it is used Google's
"reCaptcha API". By Public and Private keys, security control is done.

Pagination structure is used on table. To attract more record from database, must click the "Load More" button. When all records are attracted from database, button becomes "disabled". "Pagination" is updated automatically and dinamically when datas attracted.

Web page has "Responsive" structure. On "View" layer, to design page as "Composite Pattern", it was made use of "Apache Tiles 3" library.

Logging process is not in Business Logic, it is done by using "Spring AOP".
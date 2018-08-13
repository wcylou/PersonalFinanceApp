### Group Members

Joseph DiBiasi, Wilson Lou, Alex Murphy

### Application Purpose

We started this project with the goal of allowing users to input, track, and quantify their income and expenses over time. These expenditures are further able to be compared to a budgeting system, which can be adjusted on a month-to-month basis in order to better organize spending.

Our main goal when designing this application was to make the information contained within quickly and easily visible. To achieve this goal, we organized the front end around as few pages as possible. For example, the "Expenses" page enables the user to both enter data and view the resulting changes as they occur, saving them from the casual annoyance of waiting for page loads and jumping from one link to another. For these behaviors, we have Angular to thank.

What this accomplishes for the end user is the ability to view their financial data in virtually any combination of categories, over any period of time, with an immediacy that could not be accomplished outside of a JavaScript-based environment. The ability to process and filter this data on the front end after loading the data initially - rather than by calling to the database on the back end for each data request - is key to this speed and apparently seamless behavior.


## Project Methodologies
#### Group Project
The most serious challenge we faced during this project was not as much the technical hurdles as it was the issues that crop up when three people are working on one set of code. We solved this in a fairly expected way: solid planning from the beginning. Early on, we planned on having several controllers and services (in this case, for expenses, future expenses, budgets, incomes, and future income streams) as well as similarly-themed components and models on the front. This allowed us to work on separate sections as the back-end was being built up and tested and then, once we had the basic structure set, further allowed for a division of labor between the front and back-ends, minimizing merge conflicts along the way. The sole issue that cropped up was in our app module, in which we would occasionally overlap and add pieces to that page at the same time. Fortunately, GitHub allows for straightforward error correction for such oversights, and fires could be put out before turning into major merge conflagrations.

#### Agile Work Environment
Greatly helping our group dynamic was our implementation of a more agile work environment. The more workplace-oriented practice of having two week sprints was quite untenable for single two-week project, so we modified these practices to have both morning and afternoon stand-up meetings in place of a traditional sprint. This allowed us to keep close tabs on where the project stood, where any issues were cropping up, and whether or not we needed to sit down for some pair programming to figure out an intractable problem. Using these practices, we were able to not only avoid code conflicts but the conflicts that arise when communication has broken down and team members find themselves at loggerheads.

#### Pair Programming
At last, pair programming. Your friendly readme writer happens to be a huge proponent of this practice, as it solidifies techniques and information that may have been glossed over previously. As a group, we found that talking out problems with each other provided a solution much more quickly than hacking it out solo, and most importantly, all contributors were able to walk away with a more thorough understanding of the solved problem. This also came into play when a single incredibly tied-in section of the program needed to be modified, and in the interest of avoid merge issues, two would work together to finish up with that given section in order to open up the playing field to all downstream sections.

## Technologies

### Angular
Angular, in a compound word, was a god-send for this project. Being able to separate out sections of the website into individual components not only reduced the incidence of merge conflicts; more importantly, it allowed for massively complicated pages to be parsed out into more digestible, easily edited sections. However, all of these components would have been useless without the ability to route said components together onto one page. Had we been stitching this project together using, say, Spring MVC, we would have needed twice the time to mock up and develop the front end.
### CRUD
Creating, reading, updating, and deleting (or more gently, deactivating) data was the main purpose of this project. From the back-end to the front, all data that needed to persist and be readily changeable was easily accessed and modified quite early on in the program.
### SQL
SQL was a large part of this project since we were working with a database. Our project had a small but tightly connected database; this meant we had a lot of foreign key relationships between tables, though the separation between the income and expense sections in the database headed off a number of issues seen in the last group project. This created an interesting dynamic when working with the database on the Java side and allowed us to gain experience writing unique SQL queries.
### JAVA
This project allowed our group to fully grasp the versatility of the Java language for full-stack applications. Our previous lessons in Object-Oriented programming paid huge dividends on this project, whether it was lining up entities in the framework to match database tables or - quite crucially for a web application - providing the framework to allow our Tomcat server to communicate with the back-end and the various languages used throughout.
### AWS
"Moonlight Personal Finance" is accessible through an Amazon Web Services server, conveniently free for usage below a certain bandwidth. We kept copies of the SQL database at the root level of our server, then accessed it with our WAR file from the top. For testing purposes, this was incredibly helpful because we could run multiple users at once, rather than hosting the application locally and hoping that everything would work once published.


### Issues Seen, Issues Solved
#### HTML/CSS/Angular
HTML/CSS: This one was a beast. None of us had much experience in the front end design aspect, so it really was a case of learn-on-the-fly. We had issues with Google caching the .css file, and not knowing why new elements were not being properly selected. It was really rewarding to see our final product though, all things considered. I feel like we all learned a great deal about front-end design as a whole, and are a lot more comfortable mucking around in the front end of web applications.
#### Git Issues
One of the learning experiences with this project was using Git with multiple members. Generally speaking, we kept the Git merges clean; however, one area where we tripped over each other was in the app module. There were times when we would be working in different areas and found that we needed to add a module or provider, without thinking that somebody else might have the same needs. Fortunately, this was a simple fix, as Git will show where the merge conflict was occurring and the overlaps could then be edited and pushed.

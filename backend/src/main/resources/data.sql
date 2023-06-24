INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Alex', 'alex@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/47.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Maria', 'maria@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://i.pinimg.com/originals/76/ef/b7/76efb7c94755748d695d3d46cf11d08d.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Bob', 'bob@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/62.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('John Doe', 'john.doe@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/55.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Jane Smith', 'jane.smith@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/female/2.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Michael Johnson', 'michael.johnson@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/29.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Emily Davis', 'emily.davis@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/female/18.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Robert Wilson', 'robert.wilson@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/21.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Olivia Martinez', 'olivia.martinez@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/female/55.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('William Anderson', 'william.anderson@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/38.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Sophia Thomas', 'sophia.thomas@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/female/44.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('David Jackson', 'david.jackson@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/45.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Emma White', 'emma.white@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/female/65.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Daniel Harris', 'daniel.harris@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/73.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Mia Clark', 'mia.clark@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/female/9.jpg');
INSERT INTO tb_user (name, email, password, img_url) VALUES ('Frank Joe', 'frank.joe@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://xsgames.co/randomusers/assets/avatars/male/53.jpg');


INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (3, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (4, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (5, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (6, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (7, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (8, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (9, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (10, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (11, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (12, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (13, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (14, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (15, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (16, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (16, 2);

INSERT INTO tb_group (name) VALUES ('Development');
INSERT INTO tb_group (name) VALUES ('Testing');
INSERT INTO tb_group (name) VALUES ('Design');

INSERT INTO tb_group_user (group_id, user_id) VALUES (1,2);
INSERT INTO tb_group_user (group_id, user_id) VALUES (1,3);
INSERT INTO tb_group_user (group_id, user_id) VALUES (1,4);
INSERT INTO tb_group_user (group_id, user_id) VALUES (1,5);
INSERT INTO tb_group_user (group_id, user_id) VALUES (1,6);
INSERT INTO tb_group_user (group_id, user_id) VALUES (1,13);
INSERT INTO tb_group_user (group_id, user_id) VALUES (1,14);
INSERT INTO tb_group_user (group_id, user_id) VALUES (2,1);
INSERT INTO tb_group_user (group_id, user_id) VALUES (2,7);
INSERT INTO tb_group_user (group_id, user_id) VALUES (2,15);
INSERT INTO tb_group_user (group_id, user_id) VALUES (2,16);
INSERT INTO tb_group_user (group_id, user_id) VALUES (3,8);
INSERT INTO tb_group_user (group_id, user_id) VALUES (3,9);
INSERT INTO tb_group_user (group_id, user_id) VALUES (3,10);
INSERT INTO tb_group_user (group_id, user_id) VALUES (3,11);
INSERT INTO tb_group_user (group_id, user_id) VALUES (3,12);

INSERT INTO tb_task (title, description, start_Date, status, creator_id) VALUES ('Home page development', 'Develop the programming of home page', TIMESTAMP WITHOUT TIME ZONE '2023-06-12T22:09:00', 1, 2);
INSERT INTO tb_task (title, description, start_Date, status, creator_id) VALUES ('CRUD page development', 'Develop the programming of CRUD page', TIMESTAMP WITHOUT TIME ZONE '2023-06-13T15:30:00', 1, 4);
INSERT INTO tb_task (title, description, start_Date, status, creator_id) VALUES ('Create Database', 'Create the database in SQL', TIMESTAMP WITHOUT TIME ZONE '2023-06-13T17:12:45', 2, 5);
INSERT INTO tb_task (title, description, start_Date, status, creator_id) VALUES ('Send final project to client', 'After all done, send the project to client', TIMESTAMP WITHOUT TIME ZONE '2023-06-12T22:30:12', 0, 2);
INSERT INTO tb_task (title, description, start_Date, status, creator_id) VALUES ('Create the documentation', 'Create the documentation of the project', TIMESTAMP WITHOUT TIME ZONE '2023-06-14T09:10:22', 0, 3);
INSERT INTO tb_task (title, description, start_Date, status, creator_id) VALUES ('Debug home page code', 'Test and debug home page code', TIMESTAMP WITHOUT TIME ZONE '2023-06-12T12:20:00', 0, 1);
INSERT INTO tb_task (title, description, start_Date, status, creator_id) VALUES ('Home page Design', 'Create the home page design and layout', TIMESTAMP WITHOUT TIME ZONE '2023-06-11T21:20:00', 1, 8);
INSERT INTO tb_task (title, description, start_Date, status, creator_id) VALUES ('CRUD page Design', 'Create the CRUD page design and layout', TIMESTAMP WITHOUT TIME ZONE '2023-06-11T21:09:00', 1, 9);

INSERT INTO tb_comment (text, date_Time, author_id, task_id) VALUES ('I will create the HTML for this page', TIMESTAMP WITHOUT TIME ZONE '2023-06-12T22:11:00', 3, 1);
INSERT INTO tb_comment (text, date_Time, author_id, task_id) VALUES ('Ok, so I will do the CSS styling', TIMESTAMP WITHOUT TIME ZONE '2023-06-12T22:22:00', 2, 1);
INSERT INTO tb_comment (text, date_Time, author_id, task_id) VALUES ('When you finish your steps, I will take a look', TIMESTAMP WITHOUT TIME ZONE '2023-06-12T23:01:12', 4, 1);
INSERT INTO tb_comment (text, date_Time, author_id, task_id) VALUES ('We have 3 days to finish this task', TIMESTAMP WITHOUT TIME ZONE '2023-06-12T23:12:10', 5, 1);
INSERT INTO tb_comment (text, date_Time, author_id, task_id) VALUES ('This is the first comment in the second task', TIMESTAMP WITHOUT TIME ZONE '2023-06-12T22:11:00', 3, 2);

INSERT INTO tb_work (employee_id, task_id, date_Time_Start, date_Time_End) VALUES (2, 1, TIMESTAMP WITHOUT TIME ZONE '2023-06-14T09:12:44', TIMESTAMP WITHOUT TIME ZONE '2023-06-14T10:29:56');
INSERT INTO tb_work (employee_id, task_id, date_Time_Start, date_Time_End) VALUES (2, 1, TIMESTAMP WITHOUT TIME ZONE '2023-06-14T12:02:01', TIMESTAMP WITHOUT TIME ZONE '2023-06-14T15:13:20');
INSERT INTO tb_work (employee_id, task_id, date_Time_Start, date_Time_End) VALUES (2, 1, TIMESTAMP WITHOUT TIME ZONE '2023-06-14T16:10:01', TIMESTAMP WITHOUT TIME ZONE '2023-06-14T18:05:10');
INSERT INTO tb_work (employee_id, task_id, date_Time_Start, date_Time_End) VALUES (2, 2, TIMESTAMP WITHOUT TIME ZONE '2023-06-16T12:11:21', TIMESTAMP WITHOUT TIME ZONE '2023-06-16T13:05:10');
INSERT INTO tb_work (employee_id, task_id, date_Time_Start, date_Time_End) VALUES (3, 1, TIMESTAMP WITHOUT TIME ZONE '2023-06-14T10:01:12', TIMESTAMP WITHOUT TIME ZONE '2023-06-14T11:29:09');
INSERT INTO tb_work (employee_id, task_id, date_Time_Start, date_Time_End) VALUES (3, 1, TIMESTAMP WITHOUT TIME ZONE '2023-06-14T12:09:25', TIMESTAMP WITHOUT TIME ZONE '2023-06-14T14:12:40');
INSERT INTO tb_work (employee_id, task_id, date_Time_Start, date_Time_End) VALUES (4, 1, TIMESTAMP WITHOUT TIME ZONE '2023-06-14T11:12:11', TIMESTAMP WITHOUT TIME ZONE '2023-06-14T12:16:20');
INSERT INTO tb_work (employee_id, task_id, date_Time_Start, date_Time_End) VALUES (5, 1, TIMESTAMP WITHOUT TIME ZONE '2023-06-14T15:55:12', TIMESTAMP WITHOUT TIME ZONE '2023-06-14T16:45:10');
INSERT INTO tb_work (employee_id, task_id, date_Time_Start, date_Time_End) VALUES (1, 6, TIMESTAMP WITHOUT TIME ZONE '2023-06-14T22:09:00', TIMESTAMP WITHOUT TIME ZONE '2023-06-14T22:29:00');
INSERT INTO tb_work (employee_id, task_id, date_Time_Start, date_Time_End) VALUES (8, 7, TIMESTAMP WITHOUT TIME ZONE '2023-06-14T22:09:00', TIMESTAMP WITHOUT TIME ZONE '2023-06-14T22:29:00');
INSERT INTO tb_work (employee_id, task_id, date_Time_Start, date_Time_End) VALUES (9, 7, TIMESTAMP WITHOUT TIME ZONE '2023-06-14T22:09:00', TIMESTAMP WITHOUT TIME ZONE '2023-06-14T22:49:00');

INSERT INTO tb_task_followers (task_id, follower_id) VALUES (1,3);
INSERT INTO tb_task_followers (task_id, follower_id) VALUES (1,4);
INSERT INTO tb_task_followers (task_id, follower_id) VALUES (1,5);
INSERT INTO tb_task_followers (task_id, follower_id) VALUES (1,6);
INSERT INTO tb_task_followers (task_id, follower_id) VALUES (1,13);
INSERT INTO tb_task_followers (task_id, follower_id) VALUES (1,14);
INSERT INTO tb_task_followers (task_id, follower_id) VALUES (2,2);
INSERT INTO tb_task_followers (task_id, follower_id) VALUES (2,5);
INSERT INTO tb_task_followers (task_id, follower_id) VALUES (3,3);
INSERT INTO tb_task_followers (task_id, follower_id) VALUES (3,6);
INSERT INTO tb_task_followers (task_id, follower_id) VALUES (3,2);

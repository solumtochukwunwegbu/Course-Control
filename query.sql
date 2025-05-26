
SELECT * FROM course;


UPDATE course
SET background_img = "background_img/Coding.jpg" 
WHERE title = 'Coding';

UPDATE course
SET background_img = "background_img/Mechanics.jpg"
WHERE title = 'Mechanics';

UPDATE course
SET background_img = "background_img/Economics.jpg"
WHERE title = 'Economics';

UPDATE course
SET background_img = "background_img/Photography.webp"
WHERE title = 'Photography';

UPDATE course
SET background_img = "background_img/Public Speaking.png"
WHERE title = 'Public Speaking';

UPDATE course
SET background_img = "background_img/Entrepreneurship.avif"
WHERE title = 'Entrepreneurship';

UPDATE course
SET background_img = "background_img/History.jpg"
WHERE title = 'History';



-- UPDATE course SET  video = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' WHERE video = 'https://youtu.be/Cxilfg-M158?si=1p9ZPx9mFF93tAW7';

SELECT * FROM profile;
-- drop TABLE profile;
delete from profile;
delete from profile where userID = 1;
desc profile;

SHOW databases;
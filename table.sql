CREATE TABLE Posts (
    id SERIAL PRIMARY KEY,
    post_title VARCHAR(64) NOT NULL,
    post_category VARCHAR(64)
);

CREATE TABLE PostsDetails(
    post_detail_id SERIAL PRIMARY KEY,
    post_text VARCHAR(1000) NOT NULL,
    id INTEGER NOT NULL,
    FOREIGN KEY (id) REFERENCES posts(id)
);
CREATE TABLE PostsDetails(
    post_detail_id SERIAL PRIMARY KEY,
    post_text VARCHAR(1000) NOT NULL,
    id INTEGER NOT NULL,
    FOREIGN KEY (id) REFERENCES posts(id)
);
 
 INSERT INTO posts (post_title, post_category) VALUES ('First Blog Post', 'tutorial');
 INSERT INTO postsdetails (post_text, id) VALUES ('Paragraph of text', 1);
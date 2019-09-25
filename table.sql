CREATE TABLE Posts (
    post_id SERIAL PRIMARY KEY,
    post_title VARCHAR(64) NOT NULL,
    post_category VARCHAR(64)
);

CREATE TABLE PostsDetails(
    post_detail_id SERIAL PRIMARY KEY,
    post_text VARCHAR(1000) NOT NULL,
    post_id INTEGER NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);
CREATE TABLE PostsDetails(
    post_detail_id SERIAL PRIMARY KEY,
    post_text VARCHAR(1000) NOT NULL,
    post_id INTEGER NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);
 
 INSERT INTO posts (post_title, post_category) VALUES ('First Blog Post', 'tutorial');
 INSERT INTO postsdetails (post_text, post_id) VALUES ('Paragraph of text', 1);
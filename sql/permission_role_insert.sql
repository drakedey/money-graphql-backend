INSERT INTO role (id, name) VALUES ('ADMIN', 'Admin');
INSERT INTO role (id, name) VALUES ('USER', 'User');

INSERT INTO permission (id, type, description) VALUES ('ALL', 'EXECUTE', 'Can do anything on the system');

INSERT INTO permission_role (permission_id, role_id) VALUES ('ALL', 'ADMIN');

ALTER TABLE jhi_persistent_audit_event RENAME TO AUDIT_EVENT;
ALTER TABLE jhi_persistent_audit_evt_data RENAME TO AUDIT_EVENT_DATA;
ALTER TABLE jhi_user RENAME TO GYM_USER;
ALTER TABLE jhi_authority RENAME TO AUTHORITY;
ALTER TABLE jhi_user_authority RENAME TO USER_AUTHORITY;
DROP TABLE article;

ALTER TABLE tool ADD created_by VARCHAR(50) default null;
ALTER TABLE tool ADD created_date TIMESTAMP default null;
ALTER TABLE tool ADD last_modified_by VARCHAR(50) default null;
ALTER TABLE tool ADD last_modified_date TIMESTAMP default null;

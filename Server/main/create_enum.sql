CREATE TYPE o_status AS ENUM
(
    'Ongoing', 
    'Completed'
);

CREATE TYPE d_status AS ENUM
(
    'Rider is departing for restaurant.',
    'Rider has arrived at restaurant.',
    'Rider is departing from restaurant.',
    'Rider has delivered your order.'
);

CREATE TYPE e_category AS ENUM
(
    'Western', 
    'Chinese',
    'Malay',
    'Japanese',
    'Korean',
	'Indian',
	'Thai'
);

CREATE TYPE promotiontype AS ENUM
(
    'fixed',
    'percentage',
    'freedelivery'
);
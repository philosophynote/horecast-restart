CREATE USER IF NOT EXISTS 'horecast'@'172.%.%.%' IDENTIFIED BY 'change_me_right_now';
GRANT ALL ON *.* to 'horecast'@'172.%.%.%';
FLUSH HOSTS;